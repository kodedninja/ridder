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
					<a href="/" class="mark nbb" onclick="${home}">Ridder</a><span class="fsmall ml0-5">Pre-Alpha</span>
				</div>
			`

			function home(e) {
				e.preventDefault()
				state.page = 0
				emit('page:move', 0)
			}
		}
	}
}
