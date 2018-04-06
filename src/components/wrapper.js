const html = require('nanohtml')

module.exports = function(view) {
	return function (state, emit) {
		if (!state.loaded) return html`<main class="db 1"><div class="loading"></div></main>`

		return html`
			<main class="db 1 fl bl br bw2">
				${sidebar()}
				<div class="fl dib bt bb bw2" style="margin-left: 80px; width: calc(100% - 80px); min-height: 100vh;">
					${view(state, emit)}
				</div>
			</main>
		`

		function sidebar() {
			return html`
				<div class="fl dib pf t0" style="width: 80px; height: 100vh;">
					<a class="${state.route != '/' ? 'br' : ''} bt bb db bw2 nbb nav-button pr" href="/" onclick="${home}">
						<span>
							Feed
						</span>
					</a>
					<a class="${state.route != 'sources' ? 'br' : ''} bb db bw2 nbb nav-button pr" href="/sources">
						<span>
							Sources
						</span>
					</a>
					<a class="${state.route != 'settings' ? 'br' : ''} bb db bw2 nbb nav-button pr" href="/settings">
						<span>
							Settings
						</span>
					</a>
				</div>
			`
			function home(e) {
				state.page = 0
				emit('page:move', 0)
			}
		}
	}
}
