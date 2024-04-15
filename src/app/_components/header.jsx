import Link from 'next/link'

import './header.scss';

export default function Header() {
  const hamburger = '/bars_24.png';
    return (
      <header className="hd">
        <nav>
          <ul>
            <li><Link id='hd-title' href="/"><h2>Kinoshita, Ryosuke</h2></Link></li>
            <li>
              <div id='hd-link'>
                <Link href="/projects">Projects</Link>
                <Link href="/posts">Posts</Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
}