import Top from './_components/@top/top';
import Intro from './_components/@intro/intro';

export default function Page() {
    return (<>
      <main className='bg-white dark:bg-slate-800'>
        <Top/>
        <Intro/>
      </main>
    </>);
}