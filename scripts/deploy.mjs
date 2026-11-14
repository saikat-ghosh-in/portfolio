import { cp, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../',import.meta.url));
const args = process.argv.slice(2);
if (args.length && !(args.length === 2 && args[0] === '--remote' && args[1] && !args[1].startsWith('-'))) {
  console.error('Usage: npm run deploy [-- --remote <Git URL or local path>]');
  process.exit(1);
}
const git = (cwd,...values) => execFileSync('git',values,{cwd,encoding:'utf8'}).trim();
let temp;
const tempParent = resolve(tmpdir());
try {
  execFileSync(process.execPath,[join(root,'scripts','build.mjs')],{stdio:'inherit'});
  const supplied = args[1] || git(root,'remote','get-url','origin');
  if (!supplied || supplied.startsWith('-')) throw new Error('A valid origin remote is required');
  const networkRemote = /^[a-z][a-z0-9+.-]*:\/\//i.test(supplied) || /^[^/\\:]+(?:@[^/\\:]+)?:/.test(supplied);
  const remote = isAbsolute(supplied) || !networkRemote ? resolve(root,supplied) : supplied;
  const existing = git(root,'ls-remote','--heads',remote,'refs/heads/gh-pages');
  temp = await mkdtemp(join(tempParent,'portfolio-pages-'));
  const checkout = join(temp,'checkout');
  git(temp,'init','-b','gh-pages',checkout);
  git(checkout,'remote','add','origin',remote);
  if (existing) {
    git(checkout,'fetch','origin','gh-pages');
    git(checkout,'reset','--hard','FETCH_HEAD');
  }
  for (const name of ['user.name','user.email']) {
    const setting = spawnSync('git',['config','--get',name],{cwd:root,encoding:'utf8'});
    if (setting.status === 0) git(checkout,'config',name,setting.stdout.trim());
  }
  for (const entry of await readdir(checkout)) {
    if (entry === '.git') continue;
    const target = resolve(checkout,entry);
    if (dirname(target) !== checkout) throw new Error('Unsafe deployment cleanup path');
    await rm(target,{recursive:true,force:true});
  }
  await cp(join(root,'build'),checkout,{recursive:true});
  git(checkout,'add','--all');
  if (existing && !git(checkout,'status','--porcelain')) {
    console.log('gh-pages is already up to date.');
  } else {
    git(checkout,'commit','-m','Deploy portfolio to GitHub Pages');
    git(checkout,'push','origin','HEAD:refs/heads/gh-pages');
    console.log('Published build to gh-pages. GitHub Pages will deploy it shortly.');
  }
} catch (error) {
  console.error(`Deployment failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (temp) {
    if (dirname(temp) !== tempParent || !basename(temp).startsWith('portfolio-pages-')) throw new Error('Unsafe temporary cleanup path');
    await rm(temp,{recursive:true,force:true});
  }
}
