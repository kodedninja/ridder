# Ridder Pre-Alpha
An RSS reader that you own

## About
See [ridder-kodedninja.hashbase.io](https://ridder-kodedninja.hashbase.io) for details.

This "About" is more about the technical stuff.

### Adapter
Making a frontend only RSS reader has a drawback: you can't load content from ```http``` sources or where there's no ```Access-Control-Allow-Origin``` header set. To enable these connection I've built a small server on Glitch that serves as a forwarder.

My adapter is at [lively-adapter.glitch.me](https://lively-adapter.glitch.me) but you can [remix it](https://glitch.com/edit/#!/lively-adapter) and set that to be yours.

## Pre-Alpha TODO
- [x] adapter
- [x] manage sources
- [x] new design
- [x] forkup (add a blinking update button)
- [ ] cleanup code
- [x] boarding page
- [x] check if source was already added
- [x] css bugfixes
- [x] settings

## Others
- [ ] show if there are sources that aren't loaded yet
- [ ] read
- [ ] save items && grab out content (similar to Dropout)
- [ ] cache
- [ ] multimedia items
- [ ] search
