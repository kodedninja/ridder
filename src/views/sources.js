const html = require('nanohtml')
const wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view (state, emit) {
	return html`
		<div class="1 db">
			<div class="db tac mb1">Manage Sources</div>
			<div>
				${state.ridder.sources.map(source)}
			</div>
		</div>
	`

	function source(state) {
		return html`
			<div class="1 ofh mb0-5 bb p0-5">
				<div class="1/2 dib fl">
					<a href="${state}" class="nbb wwbw f4" target="_blank">${state}</a>
				</div>
				<div class="1/2 dib fl">
					<a href="#" class="fr" onclick="${remove}">Remove</a>
				</div>
			</div>
		`

		function remove(e) {
			e.preventDefault()

			emit('ridder:source:remove', state)
		}
	}
}
