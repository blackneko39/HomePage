import Link from 'next/link';
import s from './style.module.scss'
import { getRoutes } from '@/lib/routesGetter';

export default function Menu() {
    const routes = getRoutes();
    return (
        <div className={s.menu}>
            <ul className={s.ul}>
                {routes.map(v => {
                    return (
                        <li key={v['key']} className={s.li}>
                            <Link className={s.link} href={v['path']}>
                                <div className={s.wrap}>
                                {v['displayName']}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}