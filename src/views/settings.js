const html = require('nanohtml')
const wrapper = require('../components/wrapper')

const Updatebutton = require('../components/updatebutton')
const up_button = new Updatebutton()

const Input = require('../components/input')

module.exports = wrapper(view)

var checked = false

function view(state, emit) {
	if (!checked) {
		emit('updater:check')
		checked = true
	}

	const adapter = new Input('Adapter URL', state.ridder.config.adapter)
	const entries_per_page = new Input('Entries per Page', state.ridder.config.itemsPerPage)

	return html`
		<div class="p2 fl db 1">
			<div class="1 fl mb1">
				<div class="f1 fl dib 1/2">Settings</div>
				<div class="f3 fl dib 1/2">
					<span class="fr"><span class="mark">Ridder</span> <span class="fwn">Pre-Alpha v0.1.3</span></span>
					<a class="fr mr1 nbb">${state.update ? up_button.render(emit) : ''}</a>
				</div>
			</div>

			<div class="fl db">
				<div class="1 db">
					<div class="my1">${adapter.render(state, emit, 3)}</div>
					<div class="my1">${entries_per_page.render(state, emit, 3)}</div>
				</div>
				<div class="1 db">
					<a href="#" class="nbb f3" onclick="${save}">Save</a>
				</div>
				<p><a href="https://github.com/kodedninja/ridder">Source</a></p>

				<div class="f4">Thanks to <a href="https://choo.io">choo</a>, <a href="http://lunchtype.com/">Lunchtype</a> and <a href="https://beakerbrowser.com">Beaker</a>.</div>
			</div>
		</div>
	`

	function save (e) {
		e.preventDefault()

		if (adapter.element.value.trim() != '' && entries_per_page.element.value.trim() != '') {
			state.ridder.config.adapter = adapter.value = adapter.element.value.trim()
			state.ridder.config.itemsPerPage = entries_per_page.value = Math.max(parseInt(entries_per_page.element.value), 1)

			emit('ridder:config:save')
		}
	}
}
