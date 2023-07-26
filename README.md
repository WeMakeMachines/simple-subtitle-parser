# Simple Subtitle Parser

_(previously, subtitle-parsing-tool)_

Zero-dependency, subtitle parser written in TypeScript. Parses subtitle files and generates a collection of timed objects.

Now includes typings!

## Supported subtitle files

- SRT
- WebVTT

## Installation

`npm i simple-subtitle-parser`

## Importing the parser

##### ES6

`import { parser } from 'simple-subtitle-parser`

With types

`import { parser, Cue, Format } from 'simple-subtitle-parser';`

##### CommonJS

`const parser = require('simple-subtitle-parser');`

## Usage

```
parser(format: Format, rawText: string)
```

##### Arguments

**_format_**

Denotes the format of the subtitles to be parsed. Accepts 2 values:
    
- SRT
- WEBVTT
    
**_rawText_**

The raw data for the subtitles to parse.

##### Return value

A `Promise` that resolves to an array of `Cue` type objects

## Exported Helpers

```
extractFormatFromFileName(fileName: string);
```

##### Arguments

**_fileName_**

The filename

##### Return value

An object of the following shape:

```
{
    extension: string;
    format: Format
}
```

## Exported Types

The following types are available:

##### Formats

An exported object of strings which correspond to the supported formats

__enum Format__

```
Format.Srt
Format.WebVtt
Format.Unsupported
```

__interface Cue__

A subtitle time encoded object of the following shape:
```ts
{
    sequence: number;
    startTime: Time;
    endTime: Time;
    text: string[];
}
```

__interface Time__

Each time formatted object is encoded in the following way:
```ts
{
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  totals: {
    inSeconds: number;
  };
}
```