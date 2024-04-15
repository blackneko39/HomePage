---
title: "Next.js 14(App router)でMarkdownブログ制作"
date: "2023-03-19"
---

# Next.js 14でMarkdownブログ制作

こんにちは。木下亮佑です。この度はホームページにブログ機能をつけたので、そのソースコードと軽い説明をします。

今回のパッケージ依存関係は以下の通りです。

```json
"dependencies": {
    "gray-matter": "^4.0.3",
    "rehype-pretty-code": "^0.13.0",
    "rehype-stringify": "^10.0.0",
    "remark": "^15.0.1",
    "remark-rehype": "^11.1.0",
}
```

TypeScriptで書きました。まずはクラスの説明からしていきます。

---

## PostDetail.ts

```ts
export default class PostDetail {
    slug: string
    title: string
    date: string

    constructor(slug: string, matterResult: any) {
      this.slug = slug;
      this.title = matterResult.title;
      this.date = matterResult.date;
    }
  }
```

slugはURLにあたる文字列です。idやkeyと同義の使い方をしています。

matterResultには、Markdownファイルに書かれたパラメータの値が格納されています。

変数に代入することで、アクセスしやすくしています。

## Post.ts

```ts
import PostDetail from "./PostDetail";

export default class Post extends PostDetail {
    contentHtml : string

    constructor(slug: string, matterResult: any, contentHtml: string) {
      super(slug, matterResult)
      this.contentHtml = contentHtml;
    }
}
```

PostクラスはPostDetailクラスを継承(extends)しています。

これによりPostクラスは、PostDetailクラスの代わりとして使うことができます。

contentHtmlには、Markdownファイルを変換したHTMLデータが入っています。

（クラス定義ファイルの名前は、先頭を大文字にしています。）

---

## postsGetter.ts

```ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

import PostDetail from './class/postDetail';
import Post from './class/post';

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

export function getAllPostSlugs(directoryName: string) {
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
      theme: "andromeeda"
    })
    .use(rehypeStringify).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return new Post(
    slug,
    matterResult.data,
    contentHtml
  );
}
```

---

大きく分けて三つの関数があります。

一つ目は**getSortedPostsData**です。

## getSortedPostsData

```typescript
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
```

ディレクトリへのパスを作成し、**fs**を使って、ディレクトリに入っているデータをすべて読み取ります。

さらにそこから、**extractMdFile**関数で、Markdownファイルのみを抽出します。

```typescript
function extractMdFile(fileNames: string[]) {
    return fileNames.filter(fn => fn.indexOf(".md") != -1);
}
```

extractMdFile関数の仕組みは簡単です。

filter関数を使って、Markdown拡張子がついているファイルを返却しています。

ディレクトリにMarkdownファイルしか入っていない場合、このような処理は必要ないのですが、**ビルドした際に生成された「隠しファイル」までも読み込んでしまい、予期しないバグが起きた**ため、このような処理を加えました。

そして、allPostsDataにMarkdownのデータを入れます。

```typescript
const allPostsData = mdFileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');

    const fullPath = path.join(directoryPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return new PostDetail(slug, matterResult.data);
});
```

**スラグ(slug)** は拡張子を省いたファイル名とします。（スラグはURLです）

gray-matterパッケージを使い、Markdownファイルに含まれるパラメータを抽出。
パラメータには **タイトル(title)** と **日付(date)** を入れています。

そしてそれらを元に作成した、**PostDetail**クラスのインスタンスを返却します。

あとはこれを日付順にソートし、返却処理は終了です。

```typescript
return allPostsData.sort((a, b) => {
    if (Date.parse(a.date) < Date.parse(b.date)) {
      return 1;
    } else {
      return -1;
    }
});
```

---

## getAllPostsSlug

```typescript
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
```

次に**getAllPostsSlug**です。

こちらも同じように**fs**を使ってデータを取得。

取得したファイルからMarkdownファイルのみ抽出して、それらのファイル名を **スラグ(slug)** として返却しています。

**[SSG（Server Side Generation）](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)** でポストページを自動生成する際に使います。

---

## getPostData

```typescript
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
```

最後に**getPostData**です。引数に **スラグ(slug)** を指定。

スラグをもとに**fs**を使ってMarkdownファイルのデータを取得。今回は単一ファイル取得のため、extractMdFile関数は必要ありません。

取得したコンテンツデータを 

- remark

- remark-rehype

- rehype-pretty-code

- rehype-stringify

といった4つのパッケージで加工し、HTMLに変換していきます。

特に肝となるのが **rehype-pretty-code** というパッケージで、コードをおしゃれに表示することができます。

```typescript
const str =  "こんな感じに";
```

テーマも変更できます。今回は "rose-pine-dawn" を使用。

[こちらから](https://shiki.style/themes#themes) 選べます。種類も豊富。

加工したデータをcontentHtml変数に入れ、最終的にはPostクラスのインスタンスを生成し返却しています。

---

さて、最後は実際に加工したHTMLを表示させる過程ですが、文章が長くなってきたので、次のポストで説明いたします。よろしくお願いします。


