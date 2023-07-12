interface TimeValues {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export const timeValuesToMilliseconds = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: TimeValues): number => {
  const minutesInHours = 60;
  const secondsInMinutes = 60;
  const millisecondsInSeconds = 1000;

  const secondsToMilliseconds = seconds * millisecondsInSeconds;
  const minutesToMilliseconds =
    minutes * secondsInMinutes * millisecondsInSeconds;
  const hoursToMilliseconds =
    hours * minutesInHours * secondsInMinutes * millisecondsInSeconds;

  return (
    hoursToMilliseconds +
    minutesToMilliseconds +
    secondsToMilliseconds +
    milliseconds
  );
};
