import {useCallback, useEffect, useRef} from 'react';

const defaultOption = {volume: 0.5, loop: false, autoPlay: false};

export const useAudio = (url, option = {}) => {
  const audio = useRef(null);
  const {volume, loop, autoPlay} = {...defaultOption, ...option};

  useEffect(() => {
    if (!audio.current) {
      audio.current = new Audio(url);
      return;
    }

    audio.current.volume = volume;

    if (loop) {
      audio.current.loop = true;
    }

    if (autoPlay) {
      audio.current.play();
    }
  }, [autoPlay, loop, url, volume]);

  const play = useCallback(() => {
    stop();
    audio.current.play();
  }, [stop]);

  const stop = useCallback(() => {
    audio.current.pause();
    audio.current.currentTime = 0;
  }, []);

  return [play, stop];
};
