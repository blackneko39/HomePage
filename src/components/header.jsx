import Link from 'next/link'
import Hamburger from '@/components/@hamburger/hamburger'

import s from './header.module.scss';


export default function Header() {
    return (
      <header className={s.hd}>
        <nav className={s.nav}>
          <ul className={s.ul}>
            <li key='0' className={s.li}><div className={s.item}></div></li>
            <li key='1' className={s.li}><div className={s.item}><Link className={s.title} href="/">Kinoshita, Ryosuke</Link></div></li>
            <li key='2' className={s.li}><div className={s.item}><Hamburger className={s.hamburger}/></div></li>
          </ul>
        </nav>
      </header>
    );
}