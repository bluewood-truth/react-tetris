import {useCallback, useEffect, useRef} from 'react';

const defaultOption = {volume: 0.5, loop: false, autoPlay: false};

export const useAudio = (url, option = {}) => {
  const audioRef = useRef(null);
  const {volume, loop, autoPlay} = {...defaultOption, ...option};

  useEffect(() => {
    const audio = new Audio(url);

    audio.volume = volume;

    if (loop) {
      audio.loop = true;
    }

    if (autoPlay) {
      audio.play();
    }

    audioRef.current = audio;
  }, [autoPlay, loop, url, volume]);

  const play = useCallback(
    (stopPrevPlay) => {
      if (stopPrevPlay) stop();
      audioRef.current.play();
    },
    [stop]
  );

  const stop = useCallback(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  return [play, stop];
};
