import Link from 'next/link';
import s from './footer.module.scss';

export default function Footer() {
    return (
      <footer className={s.ft}>
        <ul className={s.ul}>
          <li key='0'><p className={s.txt}>Source code is <Link className={s.link} href='https://github.com/blackneko39/HomePage'>here</Link> on GitHub</p></li>
          <li key='1'><p className={s.txt}>© 2024 Kinoshita, Ryosuke</p></li>
        </ul>
      </footer>
    );
}