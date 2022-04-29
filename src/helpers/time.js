export const secondToMMSS = (sec) => {
  const mm = String(Math.round(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

export const milliSecondToMMSSFF = (milliSec) => {
  const mmss = secondToMMSS(Math.round(milliSec / 1000));
  const ff = String(Math.round((milliSec % 1000) / 10)).padStart(2, '0');
  return `${mmss}.${ff}`;
};
