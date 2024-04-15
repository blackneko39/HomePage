import Link from 'next/link';
import './footer.scss';

export default function Footer() {
    return (
      <footer className="ft">
        <ul className='txt-list'>
          <li><p className='txt'>Source code is <Link className='txt-link' href='https://github.com/blackneko39/HomePage'>here</Link> on GitHub</p></li>
          <li><p className='txt'>© 2024 Kinoshita, Ryosuke</p></li>
        </ul>
      </footer>
    );
}