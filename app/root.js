import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'
import Player from './player/player'
import MusicList from './player/musiclist'
import { MUSIC_LIST } from './config/musiclist'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import Pubsub from 'pubsub-js'

class Root extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			musicList: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0],
			playType: 'order'
		}
	}
	findMusicIndex(musicItem) {
		return Math.max(0, this.state.musicList.indexOf(musicItem));
	}
	getRandIndex(index, musicList){
		let rand = Math.round(Math.random() * (musicList.length - 1));
		while(rand == index) {
			rand = Math.round(Math.random() * (musicList.length - 1));
		}

		return rand;
	}
	playNext(type = 'next', index = this.findMusicIndex(this.state.currentMusicItem)) {
		let newIndex = null;
		let playType = this.state.playType;
		let musicListLength = this.state.musicList.length;

		if(type === 'next') {
			if(playType == 'random') {
				newIndex = this.getRandIndex(index, this.state.musicList);
			} else if(playType == 'singleCycle') {
				newIndex = index;
			} else{
				newIndex = (index + 1) % musicListLength;	
			}
		} else {
			newIndex = (index - 1 + musicListLength) % musicListLength;			
		}

		this.playMusic(this.state.musicList[newIndex]);
	}
	playMusic(musicItem) {
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.file
		}).jPlayer('play');

		this.setState({
			currentMusicItem: musicItem
		});
	}
	componentDidMount() {
		$('#player').jPlayer({
			supplied: 'mp3',
			wmode: 'window'
		});

		this.playMusic(this.state.currentMusicItem);
		
		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		});
		
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter(item => item !== musicItem)
			});
			this.playNext();
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});	
		Pubsub.subscribe('PLAY_PREV', (msg) => {
			this.playNext('prev');
		});	
		Pubsub.subscribe('PLAY_NEXT', (msg) => {
			this.playNext();
		});	

		let typeList = ['order', 'singleCycle', 'random'];
		Pubsub.subscribe('PLAY_CYCLE', (msg) => {
			let index = typeList.indexOf(this.state.playType);
			index = (index + 1) % typeList.length;

			this.setState({
				playType: typeList[index]
			});
		});

	}
	componentWillUnmount() {

  		Pubsub.unsubscribe('DELETE_MUSIC');
  		Pubsub.unsubscribe('PLAY_MUSIC');
  		Pubsub.unsubscribe('PLAY_PREV');
  		Pubsub.unsubscribe('PLAY_NEXT');

  		$('#player').unbind($.jPlayer.event.ended);
	}
	
	render() {
		const Home = () => (
			<Player 
				playType = {this.state.playType}
				currentMusicItem={this.state.currentMusicItem}
			/>	
		)
		const List = () => (
			<MusicList 
				currentMusicItem={this.state.currentMusicItem} 
				musicList={this.state.musicList}
			/>
		)
		return (
			<Router>
				<div>
					<Header />
					
					<Route exact path="/" component={Home} />
					<Route path="/list" component={List} />	
				</div>
			</Router>	
		)
	}
}

export default Root;