import { getProfile } from '@/lib/profileGetter';

import style from './style.module.scss'
import LanguageIcon from '@/components/@icons/languageIcon';
import Intro from '@/components/@intro/intro';

export default function Page() {
    const profile = getProfile('kinoshita_ryosuke');
    return (<>
        <main className={style.main}>
            <article className={style.article}>
                <div className={style.profile}>
                    <section className={style.top}>

                        <img src={profile.img} className={style.img}></img>
                        <p className={style.name}>{`${profile.firstname}, ${profile.lastname}`}</p>

                    </section>
                    <hr />
                    <section className={style.detail}>

                        <p>使えるPL言語</p>

                        <ul className={style.ul}>
                            {profile.usual.map((v, i) => {
                                return (<><li key={i} className={style.li}><LanguageIcon name={v}/></li></>);
                            })}
                        </ul>

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