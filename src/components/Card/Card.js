import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../util';
import reduce from '../../reducers';
import * as actions from '../../actions';

import photo from './av.jpg';

class Card extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowingCard: false
		}
	}

	flipCard = () => {
		this.setState({
			isShowingCard: !this.state.isShowingCard
		});
	}

	componentDidMount() {
		this.props.requestJoinGame(window.location.pathname.split('/').pop());

	}

	render(props) {
		const imgSrc = photo;
		return (
			<div className="Card-Container">
				{this.props.error &&
					<h1>
						{this.props.error}
					</h1>
				}
				<div className={`Card ${this.state.isShowingCard ? 'Card-Showing' : 'Card-Hidden'}`} onClick={this.flipCard}>

					<div className="Card-Back">
					</div>

					<div className="Card-Front">
						<img src={imgSrc}/>
						<p>{this.props.character}</p>
					</div>

				</div>
			</div>
		);
	}
}

export default connect(reduce, bindActions(actions))(Card)
