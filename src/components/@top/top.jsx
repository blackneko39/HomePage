import s from './top.module.scss';

export default function Top() {
  const me = '/me.jpg'
		return (
			<div className={s.top}>
        <div className={s.comp1}>
          <div className={s.img}>
            <img id={s.ryosuke} src={me} alt='Kinoshita, Ryosuke'/>
          </div>
        </div>
        <div className={s.comp2}>
          <div className={s.greeting}>
            <p className={s.txt}>I<br/>want<br/>to<br/>be<br/>the<br/>wizard.</p>
          </div>
        </div>
			</div>
		);
}