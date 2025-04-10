# hex2
A simple cli tool to convert hex to rgb, hsl and oklch, for transparency just add the alpha channel to the hex code e.g. `hex2 #EFEFEF` will return values without alpha and `hex2 #EFEFEF45` will return formats with the alpha channel.

## Install
- Clone this repo somewhere local.
- ```bash cd path_to_repo/hex2```
- ```bash pnpm run use```

**Note:** Windows and Linux haven't been tested at all, let me know how it goes.

## Usage
```bash
	hex2 #FF45A255
```

Gives you:
```bash
	RGBA: rgba(255, 69, 162, 0.33)
	HSLA: hsla(330, 100%, 63.53%, 0.33)
	OKLCH: oklch(0.6859950264253828 0.23337085627113 354.72484887104514 / 0.3333333333333333)
```
