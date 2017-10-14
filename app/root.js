import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'
import Progress from './components/progress'

class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
		}
	}
	componentDidMount() {
		/*$('#player').jPlayer({
			ready: function() {
				$('#player').jPlayer('setMedia', {
					mp3: 'http://sc1.111ttt.com/2016/5/11/28/204282335209.mp3'
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window'
		});
		$('#player').bind($.jPlayer.event.timeUpdate, (e) => {
			this.setState({
				progress: Math.round(e.jPlayer.status.currentTime)
			});
		});*/

		
	}
	render() {
		return (
			<div>
				<Header />
				<div id="player"></div>
				<Progress progress="3" />
			</div>
		)
	}
}

export default Root;
