import { Cue } from "../../types";
import TimeStamps from "../../lib/TimeStamps/index";

class ParserError extends Error { }

export default abstract class Parser {
  abstract timeStampMarker: string;
  abstract parse(string: string): Cue[];

  static processStringToArray(string: string): string[] {
    return string.split("\n");
  }

  static processArrayToArrayBlocks(array: string[]): string[][] {
    return array.reduce(
      (arrayBlockAccumulator: string[][], currentLine: string) => {
        if (currentLine === "") {
          arrayBlockAccumulator.push([]);
        } else {
          arrayBlockAccumulator[arrayBlockAccumulator.length - 1].push(
            currentLine
          );
        }

        return arrayBlockAccumulator;
      },
      [[]]
    );
  }

  static dropEmptyArrayBlocks(arrayBlocks: string[][]): string[][] {
    return arrayBlocks.filter((arrayBlock) => arrayBlock.length);
  }

  static processArrayBlocksToCues(
    arrayBlocks: string[][],
    timeStampMarker: string
  ): Cue[] {
    return arrayBlocks.map((block, blockIndex) => {
      const processedCue = block.reduce(
        (cue: Cue, string: string, index: number): Cue => {
          // Ignore cue identifier
          if (index === 0 && !string.includes(timeStampMarker)) {
            return cue;
          }

          if (
            !cue.endTime.totals.inSeconds &&
            string.includes(timeStampMarker)
          ) {
            const timeStamps = TimeStamps.parseTimeStamps(
              string,
              timeStampMarker
            );

            if (timeStamps) {
              cue.startTime = timeStamps.startTime;
              cue.endTime = timeStamps.endTime;
            }

            return cue;
          }

          cue.text.push(string);

          return cue;
        },
        {
          sequence: blockIndex,
          startTime: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            ms: 0,
            totals: { inSeconds: 0 },
          },
          endTime: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            ms: 0,
            totals: { inSeconds: 0 },
          },
          text: [],
        }
      );

      if (
        processedCue.endTime.totals.inSeconds <=
        processedCue.startTime.totals.inSeconds
      ) {
        throw new ParserError(
          `Invalid cue with sequence number ${processedCue.sequence}: `
          + `start timecode `
          + `${processedCue.startTime.hours.toString().padStart(2, '0')}`
          + `:${processedCue.startTime.minutes.toString().padStart(2, '0')}`
          + `:${processedCue.startTime.seconds.toString().padStart(2, '0')}`
          + `:${processedCue.startTime.ms.toString().padStart(3, '0')} `
          + `greater or equal than ending one `
          + `${processedCue.endTime.hours.toString().padStart(2, '0')}`
          + `:${processedCue.endTime.minutes.toString().padStart(2, '0')}`
          + `:${processedCue.endTime.seconds.toString().padStart(2, '0')}`
          + `:${processedCue.endTime.ms.toString().padStart(3, '0')} `
        );
      }

      return processedCue;
    });
  }
}
