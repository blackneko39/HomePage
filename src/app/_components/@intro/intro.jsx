import './intro.scss';

import HisTxt from './components/his-txt.jsx';
import CreTxt from './components/cre-txt.jsx';
import TecTxt from './components/tec-txt.jsx';

export default function Intro() {
    return (
      <main className='intro'>
        <article className='intro-content'>
          <h1 className='intro-title'>History</h1>
          <HisTxt />
        </article>

        <article className='intro-content'>
          <h1 className='intro-title'>Ability</h1>
          <TecTxt />
          <CreTxt />
        </article>
      </main>
    );
}