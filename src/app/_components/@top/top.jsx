import './top.scss';

export default function Top() {
  const me = '/me.jpg'
		return (
			<div className='top'>
        <div className='top-comp01'>
          <div className='top-img'>
            <img id='img' src={me} alt='Kinoshita, Ryosuke'/>
          </div>
        </div>
        <div className='top-comp02'>
          <div className='top-greeting'>
            <p id='greeting'>I<br/>want<br/>to<br/>be<br/>the<br/>wizard.</p>
          </div>
        </div>
			</div>
		);
}