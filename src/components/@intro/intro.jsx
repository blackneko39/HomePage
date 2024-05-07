import s from './intro.module.scss';

import HisTxt from './components/his-txt';
import AbiTxt from './components/abi-txt'

export default function Intro() {
    return (
      <div className={s.intro}>
        <article className={s.content}>
          <HisTxt />
        </article>

        <article className={s.content}>
          <AbiTxt />
        </article>
      </div>
    );
}