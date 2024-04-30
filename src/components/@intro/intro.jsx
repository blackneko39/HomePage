import './intro.scss';

import HisTxt from './components/his-txt';
import AbiTxt from './components/abi-txt'

export default function Intro() {
    return (
      <div className='intro'>
        <article className='intro-content'>
          <HisTxt />
        </article>

        <article className='intro-content'>
          <AbiTxt />
        </article>
      </div>
    );
}