import { getProfile } from '@/lib/profileGetter';

import s from './style.module.scss'
import LanguageIcon from '@/components/@icons/languageIcon';

export default function Page() {
    const profile = getProfile('kinoshita_ryosuke');
    return (<>
        <main className={s.main}>
            <article className={s.article}>
                <div className={s.profile}>
                    <section className={s.top}>

                        <img src={profile.img} className={s.img}></img>
                        <p className={s.name}>{`${profile.firstname}, ${profile.lastname}`}</p>

                    </section>
                    <hr />
                    <section className={s.detail}>
                        <div className={s.usual}>
                            <p>使えるPL言語</p>

                            <ul className={s.ul}>
                                {profile.usual.map((v, i) => {
                                    return (<><li key={i} className={s.li}><LanguageIcon name={v}/></li></>);
                                })}
                            </ul>
                        </div>
                        <div className={s.quali}>
                            <p>所持資格</p>

                            <ul className={s.ul}>
                                {profile.quali.map((v, i) => {
                                    return (<><li key={i} className={s.li}>{v}</li></>);
                                })}
                            </ul>
                        </div>
                    </section>
                </div>
            </article>
        </main>
        </>
    );
}

/* 
<div className={style.lanitem}>
    <div className={style.padding}></div>
    <p className={style.lanname}>Java</p>
</div>
*/