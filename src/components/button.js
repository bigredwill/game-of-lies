import { h, Component } from 'preact';

export default class Page1 extends Component {


	render() {
		return (
			<div>
				<h1>Page1</h1>
				<button onclick={nextPage} />
			</div>
		);
	}
}
