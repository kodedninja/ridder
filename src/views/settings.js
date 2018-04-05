const html = require('nanohtml')
const wrapper = require('../components/wrapper')


module.exports = wrapper(view)

function view(state, emit) {
	return html`
		<div class="p2 fl db 1">
			<div class="1 fl mb1">
				<div class="f1 fl dib 1/2">Settings</div>
				<div class="f3 fl dib 1/2">
					<span class="fr"><span class="mark">Ridder</span> <span class="fwn">Pre-Alpha v1.0.0</span></span>
				</div>
			</div>

			<div class="fl db">More coming soon.</div>
		</div>
	`
}
