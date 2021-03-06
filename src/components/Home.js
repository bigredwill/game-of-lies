import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';


class Home extends Component {

	getNewGameButton() {
		if (this.props.newGameLoading) {
			return (
				<strong>Loading New Game</strong>
			)
		} else {
			return (
				<button onClick={this.props.createNewGame}>Create New Game</button>
			)
		}
	}

	getGameLink() {
		let url = `http://10.38.5.78:8080/games/${this.props.gameId}`;
		return (
			<div>
				<p>Share this link with the 9 other players in your party:</p>
				<strong><a href={url}>{url}</a></strong>
			</div>
		)
	}

	render() {
		console.log(this.props)
		return (
			<div className="Home">
				{this.props.error &&
					<h1>
						{this.props.error}
					</h1>
				}
				<h1>Welcome to Avalon</h1>
				<p>To start a new game, share the link that is generated by clicking the button below.</p>
				<p>
					When a player opens the link, they will join the game and be dealt a card unique to them.
					This card is stored in user's browser, so they can close the link if needed.
				</p>
				<p>
					Currently, there is no way to redeal a card.  This means that if a player backs out,
					you must start a new game.
				</p>
				<p>Let's start the game!</p>
				{this.props.gameId ? this.getGameLink() : this.getNewGameButton() }

			</div>
		);
	}
}

export default connect(reduce, bindActions(actions))(Home)
