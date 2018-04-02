const xhr = require('xhr')
const parse_url = require('parse-dat-url')
const FeedMe = require('feedme')

module.exports = ridder

function ridder() {
	return function (state, emitter) {
		try {
			var archive = new DatArchive(window.location.origin + '/')
			state.p2p = true
		} catch (e) {
			state.p2p = false
		}

		state.ridder = {
			feed: [],
			info: null,
			cache: false
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)

		async function loaded() {
			if (state.p2p) await load_dat()
			else await load_http()
		}

		async function load_dat() {
			//state.ridder.info = await archive.getInfo()

			if (state.ridder.cache) load_cache()
			get_feed()

			async function load_cache() {
				try {
					var cache = await archive.readFile('/content/cache.json')
					cache = JSON.parse(cache)

					if (cache.items) {
						add_to_feed(cache.items)
					}

					state.loaded = true
					emitter.emit('render')
				} catch (e) {
					// no cache.json
				}
			}

			async function get_feed() {
				try {
					var sources = await archive.readFile('/content/sources.json')
					sources = JSON.parse(sources)

					sources.list.forEach(async function(source, id) {
						source = parse_url(source)

						if (source.protocol == 'dat:') {
							var source_archive = new DatArchive(source.origin)

							try {
								var feed = await source_archive.readFile(source.pathname)

								var parser = new FeedMe(true)
								parser.write(feed)
								feed = parser.done()

								for (var i = 0; i < feed.items.length; i++) {
									if (feed.items[i].link.indexOf('://') == -1) feed.items[i].link = source.origin + feed.items[i].link
									feed.items[i].source = {
										title: feed.title,
										url: source.origin
									}
								}

								add_to_feed(feed.items)

								emitter.emit('render')
							} catch (e) {
								console.error(e)
							}
						} else {
							xhr(source.href, function (err, res) {
								if (err) return

								var feed = res.body

								var parser = new FeedMe(true)
								parser.write(feed)
								feed = parser.done()

								for (var i = 0; i < feed.items.length; i++) {
									if (feed.items[i].link.indexOf(source.origin)) feed.items[i].link = source.origin + feed.items[i].link
									feed.items[i].source = {
										title: feed.title,
										url: source.origin
									}
								}

								add_to_feed(feed.items)

								emitter.emit('render')
							})
						}

						if (state.ridder.cache) save_cache()
					})
				} catch (e) {
					console.log(e)
					await archive.writeFile('/content/sources.json', JSON.stringify({list: []}))
				}

				state.loaded = true
				emitter.emit('render')
			}
		}

		async function load_http() {
			emitter.emit('render')
		}

		async function save_cache() {
			var obj = {items: []}

			for (var i = 0; i < Math.min(30, state.ridder.feed.length); i++) {
				obj.items.push(state.ridder.feed[i])
			}

			await archive.writeFile('/content/cache.json', JSON.stringify(obj, null, '\t'))
		}

		function add_to_feed(items) {
			state.ridder.feed = state.ridder.feed.concat(items)

			state.ridder.feed.sort((a, b) => {
				return (new Date(b.pubdate).getTime() - new Date(a.pubdate).getTime())
			})
		}
	}
}
