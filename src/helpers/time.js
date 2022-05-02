export const secondToMMSS = (sec) => {
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

export const milliSecondToMMSSFF = (milliSec) => {
  const mmss = secondToMMSS(Math.floor(milliSec / 1000));
  const ff = String(Math.floor((milliSec % 1000) / 10)).padStart(2, '0');
  return `${mmss}.${ff}`;
};
