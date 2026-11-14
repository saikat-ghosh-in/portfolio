import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync(process.execPath,[join(root,'check.mjs')],{stdio:'inherit'});
const output = resolve(root,'build');
if (output !== join(root,'build')) throw new Error('Unexpected build output path');
await rm(output,{recursive:true,force:true});
await mkdir(output);
await cp(join(root,'dist'),output,{recursive:true});
await writeFile(join(output,'.nojekyll'),'');
console.log('Build ready in build/');
