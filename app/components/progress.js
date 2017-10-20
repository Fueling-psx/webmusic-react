import React from 'react'
import './progress.less'

class Progress extends React.Component{
	constructor(props) {
		super(props);
		this.changeProgress = this.changeProgress.bind(this);
	}
	changeProgress(e) {
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange(progress);
	}
	render() {
		let progressStyle = {
			width: `${this.props.progress}%`,
			background: this.props.barColor
		}

		return ( 
			<div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
				<div className="progress" style={progressStyle} ></div>
			</div>
		)

	}

}

export default Progress;