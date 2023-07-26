interface TimeValues {
  hours?: number;
  minutes?: number;
  seconds?: number;
  ms?: number;
}

export const timeValuesToSeconds = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  ms = 0,
}: TimeValues): number => {
  const minutesInHours = 60;
  const secondsInMinutes = 60;

  const minutesToSeconds = minutes * secondsInMinutes;
  const hoursToSeconds = hours * minutesInHours * secondsInMinutes;

  return hoursToSeconds + minutesToSeconds + seconds + ms / 1000;
};
