---
title: "Next.js 14でホームページ制作"
date: "2024-03-18"
---

こんにちは。木下亮佑です。

今回はNext.jsでホームページを制作したので、そのソースコードと簡単な説明をします。

ホームページのソースコード

> [GitHub - HomePage](https://github.com/blackneko39/HomePage)

---

## Next.jsのプロジェクト作成

プロジェクト作成については、公式ページをご参照ください。

Next.js 14.1 App Router

> [Next.js - introduction](https://nextjs.org/docs)

---

## Header（ヘッダー）

header.jsx

```jsx
import Link from 'next/link'

import './header.scss';


export default function Header() {
    return (
      <header className="hd">
        <nav>
          <ul>
            <li><Link id='hd-title' href="/"><h2>Kinoshita, Ryosuke</h2></Link></li>
            <li><Link id='hd-link' href="/projects">Projects</Link></li>
            <li><Link id='hd-link' href="/posts">Posts</Link></li>
          </ul>
        </nav>
      </header>
    );
}
```

header.scss

```scss
$res-pc: 767px;
$res-sm: 766px;

$wt: #fefefe;
$bl: #111;

.hd {
  position: fixed;
  height: 10vh;
  width: 100vw;

  top: 0;
  z-index: 999;
  display: flex;

  @media screen and (min-width: ($res-pc)) {
    background-color: $wt;
    color: $bl;
    border: #111 solid 0.1px;
  }

  @media screen and (max-width: ($res-sm)) {
    background-color: $bl;
    color: $wt;
  }

  nav {
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    ul {
      position: relative;
      width: 100%;
      text-align: center;
      top: 50%;
      transform: translateY(-50%);
      vertical-align: middle;

      margin: 0;
      padding: 0;

      li {
        position: relative;
        display: inline-flex;
        list-style: none;
        padding: 0 0.5vw;
        vertical-align: baseline;

        #hd-title {
          // navタイトルの色、デコレーションの設定
          text-decoration: none;
          @media screen and (min-width: ($res-pc)) {
            color: $bl;
          }

          @media screen and (max-width: ($res-sm)) {
            color: $wt;
          }
        }

        #hd-link {
          // navリンクの色、デコレーション、サイズの設定
          text-decoration: none;
          font-size: large;

          @media screen and (min-width: ($res-pc)) {
            color: $bl;
          }
          @media screen and (max-width: ($res-sm)) {
            color: $wt;
          }
        }
      }
    }

  }
}
```

---

## Footer（フッター）

footer.jsx

```jsx
import './footer.scss';

export default function Footer() {
    return (
      <footer className="ft">
        <p id='copyright'>© 2024 Kinoshita, Ryosuke</p>
      </footer>
    );
}
```

footer.scss

```scss
$wt: #fefefe;
$bl: #111;

.ft {
  position: relative;
  width: 100vw;
  height: 10vh;
  color: ($wt);
  background-color: ($bl);

  #copyright {
    width: 100vw;
    text-align: center;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

---

## layout.jsx（共通レイアウト）

ヘッダー、フッターを「layout.jsx」に配置することで、全ページの共通レイアウトとしています。

```jsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlackNeko - Kinoshita, Ryosuke',
  description: '🐈‍⬛Welcome to my homepage...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <!-- 共通コンポーネント -->
        <Header />
          {children}
        <Footer />
        <!-- -->
      </body>
    </html>
  )
}
```

---

## global.scss（共通スタイル）

全体に適応させるスタイルは「global.scss」で設定しています。

```scss
$blk: #252525;

html {
  overflow-x: hidden;
  overflow-y: scroll; -webkit-overflow-scrolling: touch
}

body {
  margin: 0;
  background-color: hsl(0, 0%, 100%);
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

main {
  margin-top: 10vh;
}
```
