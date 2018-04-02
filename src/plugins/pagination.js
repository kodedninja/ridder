module.exports = function (state, emitter) {
	state.page = 0
	state.pages = 0

	emitter.on('page:move', function(d) {
		state.page += d
		document.body.scrollTop = 0
		emitter.emit('render')
	})
}
