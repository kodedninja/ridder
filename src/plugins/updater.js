const update = require('forkup/update')
const check = require('forkup/check')

module.exports = function (state, emitter) {
	state.update = null
	state.update_archives = false

	emitter.on('updater:check', async function () {
		if (state.update == null) state.update_archives = await check()
		state.update = state.update_archives !== false
		emitter.emit('render')
	})

	emitter.on('updater:update', function() {
		if (state.update_archives.length > 0) {
			update(state.update_archives)
			state.update = false
			emitter.emit('render')
		}
	})
}
