# Subtitle Parsing Tool

Parses subtitle files and generates a collection of timed objects.

Now includes typings!

## Supported subtitle files

- SRT
- WebVTT

## Installation

`npm i subtitle-parsing-tool`

## Importing

Import the main parser tool as a default export. Import types as named imports.

##### ES6

`import spt from 'subtitle-parsing-tool'`

With types

`import spt, { Cue, Formats } from 'subtitle-parsing-tool';`

##### CommonJS

`const spt = require('subtitle-parsing-tool');`

## Usage

_spt_.parser(_format_, _string_);

##### Parameters

**_format_** - A string value, which denotes the format of the subtitles to be parsed. Accepts 2 values:
    
    - SRT
    - WEBVTT
    
**_string_** - A string value. The raw data for the subtitles to parse.

## Exported Types

The following types are available:

##### Formats

An exported object of strings which correspond to the supported formats.

__enum Formats__

```
Formats.Srt
Formats.WebVtt
```

__interface Cue__

An object of the following shape:
```
{
    sequence: number;
    startTime: number;
    endTime: number;
    text: string[];
}
```

## Output

Result is an array of Cue objects

```
[ Cue ]
```
