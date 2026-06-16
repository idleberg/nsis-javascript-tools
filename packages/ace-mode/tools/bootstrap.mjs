import { resolve } from 'node:path';
import shell from 'shelljs';

const cacheDir = resolve(process.cwd(), '.cache');

function main() {
    shell.rm('-rf', '.cache');
    shell.exec('npx degit ajaxorg/ace#v1.7.1 .cache');
    
    shell.exec('npm install', {
        cwd: cacheDir
    });
    shell.exec('npm install', {
        cwd: resolve(cacheDir, 'tool')
    });
}

main();