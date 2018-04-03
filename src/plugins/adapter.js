const xhr = require('xhr')

module.exports = function (state, emit, source, cb) {
	xhr({
	    method: "post",
	    body: {url: source.href},
	    uri: state.ridder.config.adapter,
	    json: true
	}, function (err, res, body) {
		cb(body, source)
	})
}
