import makeUrl from './makeUrl';
import './txt.scss';

const mitoujr = makeUrl("https://www.mitou.org/assets/press_release_20170112.pdf", "「未踏ジュニアキャンプ2017」");
const pcn2017s = makeUrl("https://pcn.club/contest/contest07.html", "2017夏");
const pcn2017w = makeUrl("https://pcn.club/contest/contest08.html", "2017冬");;
const meriken2022 = makeUrl("https://meriken.jp/photofes202203/", "meriken gallery & cafe");

export default function HisTxt() {
    return (
      <>
      <h1 className='intro-title'>History</h1>

      <section className='intro-section'>
        <div className='intro-item'>
          <h3>2003年8月18日</h3>
          <p>兵庫県神戸市に生まれる。</p>
        </div>

        <br/>

        <div className='intro-item'>
          <h3>小学6年生</h3>
          <p>
            プログラミングにハマる。<br />
            朝昼晩、パソコンを触り続ける。
          </p>
        </div>

        <br/>

        <div className='intro-item'>
          <h3>中学1年生・冬</h3>
          <p>
            一般社団法人未踏が運営する{mitoujr}に選抜。<br/>
            自分よりレベルが高い学生が多数いることを知り、<br/>
            人生で初めての挫折をする。
          </p>
        </div>

        <br/>

        <div className='intro-item'>
          <h3>中学2年生</h3>
          <p>
            「PCNこどもプログラミングコンテスト」に応募。<br />
            {pcn2017s}には『特別賞』を受賞。<br />
            {pcn2017w}には『ボストンクラブ賞』に加え『優秀賞』を受賞。
          </p>
        </div>

        <br/>

        <div className='intro-item'>
          <h3>高校1年生</h3>
          <p>
            高校に入ると、一度プログラミングとは距離を置き、音楽に没頭する。<br />
            軽音楽部ではギター、ドラムをしていた。<br />
          </p>
        </div>

        <br/>

        <div className='intro-item'>
          <h3>高校2年生</h3>
          <p>
            コロナショックで通っていた高校の対応に不満を抱き、通信高校に転校。<br />
            それと同時に、DTMを使った作曲を始める。<br />
          </p>
        </div>

        <br/>

        <div className='intro-item'>
          <h3>高校卒業後</h3>
          <p>
            {meriken2022}にて、自身が撮影した写真作品を展示。<br />
            就労移行支援所に通いながら、資格やプログラミングの勉強をしている。<br />
            2023年10月に『IPA 基本情報技術者試験(FE)』に合格。

          </p>
        </div>
      </section>
      </>
    );
}