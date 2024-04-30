import { getPreset } from '@/lib/presetGetter';
import s from './style.module.scss'

export default function LanguageIcon({name}) {
    return(
        <div className={s.wrapper}>
            <div className={s.item} style={{backgroundColor: getPreset(name).color}}>
                <div className={s.padding}></div>
                <div className={s.foldline}></div>
                <p className={s.name}>{name}</p>
            </div>
        </div>
    );
}