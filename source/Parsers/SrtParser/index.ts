import { Cue } from "../../types";
import Parser from "../Parser/index";

export default class SrtParser extends Parser {
  public timeStampMarker = "-->";

  parse(string: string): Cue[] {
    const multiline = Parser.processStringToArray(string);
    const allRawCueData = Parser.processArrayToArrayBlocks(multiline);
    const rawCueData = Parser.dropEmptyArrayBlocks(allRawCueData);

    return Parser.processArrayBlocksToCues(rawCueData, this.timeStampMarker);
  }
}
