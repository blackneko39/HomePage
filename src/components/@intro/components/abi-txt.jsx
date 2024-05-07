import makeUrl from './makeUrl';
import s from './txt.module.scss';

const url_itpassport = makeUrl("https://www3.jitec.ipa.go.jp/JitesCbt/html/about/about.html", 'ITパスポート');
const url_fe = makeUrl("https://www.ipa.go.jp/shiken/kubun/fe.html", "基本情報技術者");
const url_pcn = makeUrl('https://pcn.club/contest/', "PCNこどもプログラミングコンテスト");
const url_meriken = makeUrl("https://meriken.jp/", "meriken gallery & cafe");
const mitoujr = makeUrl("https://www.mitou.org/assets/press_release_20170112.pdf", "未踏ジュニアキャンプ2017");
const pcn2017s = makeUrl("https://pcn.club/contest/contest07.html", "2017夏");
const pcn2017w = makeUrl("https://pcn.club/contest/contest08.html", "2017冬");;

function bold(str) {
	return (<span className={s.b}>{str}</span>)
}

export default function AbiTxt() {
		return (<div className={s.comp}>
			<h1 className={s.title}>Ability</h1>
			<section className={s.section}>
				<h2>Technical</h2>
				
				<div className={s.item}>
					<h3>資格</h3>
					<ul>
						<li>2023年1月 {url_itpassport} 取得</li>
						<li>2023年11月 {url_fe} 取得</li>
					</ul>
				</div>

				<div className={s.item}>
					<h3>実績</h3>
					<h4>{url_pcn}受賞歴</h4>
					<ul>
						<li>{pcn2017s} 『特別賞』 受賞</li>
						<li>{pcn2017w}『優秀賞』『ボストンクラブ賞』 受賞</li>
					</ul>
					<h4>{mitoujr}選抜経験</h4>
				</div>

				<div className={s.item}>
					<h3>ウェブ開発</h3>
					<ul>
						<li>HTML, CSS, JavaScript, フレームワークはReact, Next.js</li>
						<li>このサイトはNext.jsを利用し制作した。</li>
					</ul>
				</div>

				<div className={s.item}>
				<h3>アプリ開発</h3>
					<ul>
						<li>Java言語による『Androidアプリ』開発</li>
						<li>Flutter, Dart言語による『Android/iOSアプリ』開発</li>
						<li>『Minecraft Spigot』プラグイン共同開発</li>
					</ul>
				</div>

			</section>

			<section className={s.section}>
        
				<h2>Creative</h2>
				<div className={s.item}>
				<h3>音楽</h3>
				<ul>
					<li>作曲をしている。ギターとドラムを演奏</li>
					<li>主にロックやポップを制作している</li>
				</ul>
				</div>
			
				<div className={s.item}>
				<h3>撮影</h3>
				<ul>
					<li>父が写真家だったため、子どもの頃から写真撮影が好きだった</li>
					<li>{url_meriken} にて、自身が撮影した写真が展示された実績を持つ</li>
				</ul>
				</div>

			</section>
		</div>);
}