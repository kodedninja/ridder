const html = require('nanohtml')

module.exports = function(view) {
	return function (state, emit) {
		if (!state.loaded) return html`<main class="db 1"><div class="loading"></div></main>`

		return html`
			<main class="db 1 ba bw2 fl">
				${sidebar()}
				<div class="fl dib" style="margin-left: 80px; width: calc(100% - 80px);">
					${view(state, emit)}
				</div>
			</main>
		`

		function sidebar() {
			return html`
				<div class="fl dib pf t0" style="width: 80px; height: 100vh;">
					<a class="${state.route != '/' ? 'br' : ''} bb db bw2 nbb nav-button pr" href="/">
						<span>
							Feed
						</span>
					</a>
					<a class="${state.route != '/sources' ? 'br' : ''} bb db bw2 nbb nav-button pr" href="/sources">
						<span>
							Sources
						</span>
					</a>
					<a class="${state.route != '/settings' ? 'br' : ''} bb db bw2 nbb nav-button pr" href="/settings">
						<span>
							Settings
						</span>
					</a>
				</div>
			`
		}
		/*function home(e) {
		state.page = 0
		emit('page:move', 0)
	}*/
	}
}
