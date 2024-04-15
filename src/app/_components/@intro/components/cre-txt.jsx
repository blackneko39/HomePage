import makeUrl from './makeUrl';

const url_meriken = makeUrl("https://meriken.jp/", "meriken gallery & cafe");

export default function CreTxt() {
    return (
      <section className='intro-section'>
        
        <h2>Creative</h2>
        <div className='intro-item'>
          <h3>音楽</h3>
          <ul>
            <li>作曲をしている。ギターとドラムを演奏</li>
            <li>主にロックやポップを制作している</li>
          </ul>
        </div>
      
        <div className='intro-item'>
          <h3>撮影</h3>
          <ul>
            <li>父が写真家だったため、子どもの頃から写真撮影が好きだった</li>
            <li>{url_meriken} にて、自身が撮影した写真が展示された実績を持つ</li>
          </ul>
        </div>

      </section>
    );
}