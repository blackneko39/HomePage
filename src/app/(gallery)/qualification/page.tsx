import s from './style.module.scss'

export default function Page() {
    const quali = [
        {
            id: 'ipa_ipass',
            name: 'ITパスポート',
            pass: '/ipa_ipass.jpeg'
        },
        {
            id: 'ipa_fe',
            name: '基本情報技術者',
            pass: '/ipa_fe.jpeg'
        }
    ]

    return (
        <main className={s.main}>
            <div className={s.space}></div>
            <article className={s.article}>
                {quali.map((v) => {
                    return(
                        <section key={v.id} className={s.section}>
                            <div className={s.title}>{v.name}</div>
                            <hr className={s.hr} />
                            <img className={s.img} src={v.pass} alt={v.name}  />
                        </section>
                    );
                })}
            </article>
            <div className={s.space}></div>
        </main>
    )
}