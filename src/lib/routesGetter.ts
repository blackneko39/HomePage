import fs from 'fs';
import path from "path";

const directory = path.join(process.cwd(), '/src/data/routes');

export function getRoutes() {
    const fullPath = path.join(directory, `routes.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(fileContents);
    const data = json['routes'];
    return data;
}