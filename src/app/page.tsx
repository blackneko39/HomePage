import Top from '../components/@top/top';
import Intro from '../components/@intro/intro';

export default function Page() {
    return (<>
      <main className='bg-white dark:bg-slate-800'>
        <Top/>
        <Intro/>
      </main>
    </>);
}