import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const __filename = path.basename(new URL(import.meta.url).pathname);
const __current_file = path.join(__dirname, __filename);
const JS_EXT = '.js';

const file_list = [];
await parse_file(__dirname);

export default async function(app) {
    for (const file of file_list) {
        if (__current_file === file) {
            continue;
        }
        const api = file.substring(__dirname.length, file.length - JS_EXT.length);
        console.log(api.replace(/\\/g, '/'));
        const module = await import(url.pathToFileURL(file));
        app.use(api.replace(/\\/g, '/'), module.default);
    }
}

async function parse_file(directory) {
    const dir_list = fs.readdirSync(directory);
    for (const dir of dir_list) {
        const dir_path = path.join(directory, dir);
        const dir_stats = fs.statSync(dir_path);
        if (dir_stats.isDirectory()) {
            await parse_file(dir_path);
        }
        else {
            if (JS_EXT === path.extname(dir)) {
                file_list.push(dir_path);
            }
        }
    }
    return file_list;
}