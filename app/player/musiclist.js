import React from 'react'
import MusicListItem from '../components/musiclistitem.js'

class MusicList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {

		let listElements =  this.props.musicList.map((item) => {
			return (
				<MusicListItem focus={item === this.props.currentMusicItem} key={item.id} musicItem={item}>
					{item.title}
				</MusicListItem>
			)
		});

		return (
			<ul>{ listElements }</ul>
		)
	}
}

export default MusicList;