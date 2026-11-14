import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, mkdir, writeFile, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const source = fileURLToPath(new URL('../', import.meta.url));
const env = { ...process.env, GIT_AUTHOR_NAME:'Deploy test', GIT_AUTHOR_EMAIL:'test@example.com', GIT_COMMITTER_NAME:'Deploy test', GIT_COMMITTER_EMAIL:'test@example.com' };
function run(cwd, command, args) {
  const result = spawnSync(command,args,{cwd,env,encoding:'utf8'});
  assert.equal(result.status,0,result.stderr || result.stdout);
  return result.stdout.trim();
}
async function fixture(t) {
  const parent = resolve(tmpdir());
  const temp = await mkdtemp(join(parent,'portfolio-deploy-test-'));
  t.after(async()=>{
    assert.equal(dirname(temp),parent);
    assert(basename(temp).startsWith('portfolio-deploy-test-'));
    await rm(temp,{recursive:true,force:true});
  });
  const root = join(temp,'source');
  await mkdir(root);
  for (const file of ['dist','scripts','check.mjs']) {
    try { await cp(join(source,file),join(root,file),{recursive:true}); }
    catch(e) { if(e.code !== 'ENOENT') throw e; }
  }
  return {temp,root};
}

// Catches accidentally publishing source, tests, or stale output.
test('build publishes only current static assets and disables Jekyll',async t=>{
  const {root} = await fixture(t);
  await mkdir(join(root,'build'));
  await writeFile(join(root,'build','stale.txt'),'old');
  run(root,process.execPath,['scripts/build.mjs']);
  assert((await readFile(join(root,'build','index.html'),'utf8')).includes('Java Developer'));
  await access(join(root,'build','.nojekyll'));
  await assert.rejects(access(join(root,'build','stale.txt')));
  await assert.rejects(access(join(root,'build','check.mjs')));
});

// Catches source-branch mutation, stale published assets, and non-idempotent deployment.
test('deploy creates and updates gh-pages while preserving source main',async t=>{
  const {temp,root} = await fixture(t);
  const remote = join(temp,'remote.git');
  run(temp,'git',['init','--bare',remote]);
  run(root,'git',['init','-b','main']);
  run(root,'git',['add','.']);
  run(root,'git',['commit','-m','source']);
  run(root,'git',['remote','add','origin',remote]);
  run(root,'git',['push','origin','main']);
  const original = run(root,'git',['rev-parse','HEAD']);
  await writeFile(join(root,'dist','obsolete.txt'),'obsolete');
  run(root,process.execPath,['scripts/deploy.mjs','--remote','../remote.git']);
  const published = join(temp,'published');
  run(temp,'git',['clone','--branch','gh-pages',remote,published]);
  await access(join(published,'obsolete.txt'));
  await rm(join(root,'dist','obsolete.txt'));
  run(root,process.execPath,['scripts/deploy.mjs']);
  run(published,'git',['pull','--ff-only']);
  await assert.rejects(access(join(published,'obsolete.txt')));
  await access(join(published,'.nojekyll'));
  const deployed = run(published,'git',['rev-parse','HEAD']);
  run(root,process.execPath,['scripts/deploy.mjs']);
  run(published,'git',['pull','--ff-only']);
  assert.equal(run(published,'git',['rev-parse','HEAD']),deployed);
  assert.equal(run(root,'git',['rev-parse','HEAD']),original);
  assert.equal(run(root,'git',['branch','--show-current']),'main');
  assert.equal(run(root,'git',['ls-remote','origin','refs/heads/main']).split(/\s/)[0],original);
  const failed = spawnSync(process.execPath,['scripts/deploy.mjs','--remote',join(temp,'missing.git')],{cwd:root,env,encoding:'utf8'});
  assert.notEqual(failed.status,0,'An unreachable remote must not report success');
});
