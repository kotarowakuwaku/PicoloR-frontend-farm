export default interface UseCountdownResult {
  count: number;
  isCounting: boolean;
  startCountdown: (count: number) => void;
}
