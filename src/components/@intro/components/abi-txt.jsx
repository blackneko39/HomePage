import makeUrl from './makeUrl';
import './txt.scss';

const url_meriken = makeUrl("https://meriken.jp/", "meriken gallery & cafe");

export default function AbiTxt() {
		return (<>
			<h1 className='intro-title'>Ability</h1>
			<section className='intro-section'>
				<h2>Technical</h2>

				<div className='intro-item'>
					<h3>実績</h3>
					<ul>
						<li>PCNこどもプログラミングコンテストでの受賞歴あり</li>
						<li>全国有数のスーパークリエイタが集った『未踏ジュニアキャンプ2017』メンバーに選抜された経験あり</li>
					</ul>
				</div>

				<div className='intro-item'>
					<h3>ウェブ開発</h3>
					<ul>
						<li>このWEBサイトを独学で制作した</li>
						<li>WEBフレームワーク（Next.js）を利用し制作した</li>
					</ul>
				</div>

				<div className='intro-item'>
				<h3>アプリ開発</h3>
					<ul>
						<li>Flutter による 『Android/iOSアプリ』開発</li>
						<li>『Minecraft Spigot Plugin』共同開発</li>
					</ul>
				</div>

			</section>

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
		</>);
}