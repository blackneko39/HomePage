import s from './style.module.scss';
import Menu from '../@menu/menu'
import { useId } from 'react';

export default function Hamburger() {
    return(<>
        <div className={s.hamburger}>
            <input id='hamburger-check' type='checkbox' className={s.checkbox}/>
            <label className={s.label} htmlFor="hamburger-check">
                <div className={s.icon}>
                    <span className={s.line}></span>
                    <span className={s.line}></span>
                    <span className={s.line}></span>
                </div>
            </label>
            <div className={s.menu}>
                <Menu />
            </div>
        </div>
        </>
    )
}