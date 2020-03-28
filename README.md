# Subtitle Parsing Tool

Parses subtitle files and generates a collection of timed objects.

### Supported subtitle files

- SRT
- WebVTT

### Installation

`npm install --save subtitle-parsing-tool`

### Usage

node.js

`const spt = require('subtitle-parsing-tool');`

ES6

`import LoomSE from 'subtitle-parsing-tool'`

### Output

Result is an array of Cue objects

```
Cue {
	sequence: number;
	startTime: number;
	endTime: number;
	text: string[];
}
```
