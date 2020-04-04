# Subtitle Parsing Tool

Parses subtitle files and generates a collection of timed objects.

## Supported subtitle files

- SRT
- WebVTT

## Installation

`npm install --save subtitle-parsing-tool`

## Usage

### Import

#### node.js

`const spt = require('subtitle-parsing-tool');`

#### ES6

`import LoomSE from 'subtitle-parsing-tool'`

### Parser function

_spt_.parser(_subtitleFormat_, _subtitleString_);

#### Parameters

**_subtitleFormat_** - A string value, which denotes the format of the subtitles to be parsed. Accepts to values:
    
    - SRT
    - WEBVTT
    
**_subtitleString_** - A string value. The raw data for the subtitles to parse.

### Formats

An exported object of strings which correspond to the supported formats.

_spt_.Formats

    - Srt.Formats.Srt
    - Srt.Formats.WebVtt

## Output

Result is an array of Cue objects

```
[
    Cue {
        sequence: number;
        startTime: number;
        endTime: number;
        text: string[];
    }
]
```
