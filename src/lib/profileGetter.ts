import fs from 'fs';
import path from "path";
import Profile from './class/Profile';

const directory = path.join(process.cwd(), '/src/data/profile');

function extractJSONFile(files :string[]) {
    return files.filter(v => v.indexOf('.json') != -1);
}

export function getProfile(slug: string) {
    const fullPath = path.join(directory, `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(fileContents);
    
    return new Profile(json['firstname'], json['lastname'], json['img'], json['usual'], json['quali']);
}