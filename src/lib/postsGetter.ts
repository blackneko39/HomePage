import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

import PostDetail from './class/PostDetail';
import Post from './class/Post';

const componentsDirectory = path.join(process.cwd(), '/src/components');

function extractMdFile(fileNames: string[]) {
  return fileNames.filter(fn => fn.indexOf(".md") != -1);
}

export function getSortedPostsData(directoryName: string) {
  const directoryPath = path.join(componentsDirectory, `/${directoryName}`)
  const fileNames = fs.readdirSync( directoryPath );
  const mdFileNames = extractMdFile(fileNames);
  const allPostsData = mdFileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');

    const fullPath = path.join(directoryPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return new PostDetail(slug, matterResult.data);
  });

  return allPostsData.sort((a, b) => {
    if (Date.parse(a.date) < Date.parse(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostsSlugs(directoryName: string) {
  const directoryPath = path.join(componentsDirectory, `/${directoryName}`)
  const fileNames = fs.readdirSync( directoryPath );
  const mdFileNames = extractMdFile(fileNames);

  return mdFileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getPostData(directoryName: string, slug: string) {
  const directoryPath = path.join(componentsDirectory, `/${directoryName}`)
  const fullPath = path.join(directoryPath, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "rose-pine-dawn"
    })
    .use(rehypeStringify).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return new Post(
    slug,
    matterResult.data,
    contentHtml
  );
}

export function getPostTitle(directoryName: string, slug: string): string {
  const directoryPath = path.join(componentsDirectory, `/${directoryName}`)
  const fullPath = path.join(directoryPath, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  
  return matterResult.data.title;
}