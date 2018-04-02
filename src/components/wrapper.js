const html = require('nanohtml')

module.exports = function(view) {
	return function (state, emit) {
		if (!state.loaded) return html`<main class="db 1"><div class="loading"></div></main>`

		return html`
			<main class="db 1 p2">
				${header()}
				${view(state, emit)}
			</main>
		`

		function header() {
			return html`
				<div class="db 1 mb1">
					<span class="mark">Ridder</span><span class="fsmall ml0-5">Pre-Alpha</span>
				</div>
			`
		}
	}
}
