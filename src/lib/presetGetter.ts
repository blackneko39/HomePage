import fs from 'fs';
import path from "path";
import Preset from './class/Preset';

const directory = path.join(process.cwd(), '/src/data/icons');

export function getPreset(name: string) {
    const fullPath = path.join(directory, `preset.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(fileContents);
    const data = json[name.toLowerCase()];
    let color = "#FFFFFF";
    if (data != undefined) color = data["color"];
    return new Preset(color);
}