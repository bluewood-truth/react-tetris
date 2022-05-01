![readme_logo](https://user-images.githubusercontent.com/55024033/166143771-e3cd2084-96aa-4f91-9b72-74bacabd84d0.png)

<h2 align="middle">React로 구현한 테트리스 게임</h2>

<p align="middle">View: <a href="http://ec2-3-230-151-39.compute-1.amazonaws.com/">React Tetris</a></p>

# 🎮 React Tetris

이 프로젝트는 React의 built-in Hooks의 연습을 위해 진행한 토이 프로젝트입니다. 밑바닥에서부터 시작하여 React로 테트리스 게임을 완성하는 것을 목표로 합니다.

## ⚙️ Built With

- React.js
- Webpack

## 📄 Details

- 최초 TItle에서 두 가지 게임 모드를 선택할 수 있습니다.
  - 40-LINES SPRINT: 최단 시간 내에 40줄을 지우는 것을 목표로 하는 게임 모드입니다. 블럭의 낙하 속도는 1/48G로 고정되어 있습니다.
  - 100-LINES MARATHON: 100줄을 지울 때까지 살아남는 것을 목표로 하는 게임 모드입니다. 지운 줄 수에 따라 블럭의 낙하 속도는 1/3G까지 점차 증가합니다.
  - FREE: 조건 없이 게임 오버할 때까지 자유롭게 플레이하는 게임 모드입니다.

- 플레이필드 크기는 너비 10, 높이 20입니다.

  - 블럭이 고정된 시점에서 이 범위를 벗어난 셀이 있다면 게임 오버입니다.

- 게임이 시작되면 게임이 끝날 때까지 매번 새로운 블럭이 선택되어 일정 프레임 주기로 낙하합니다.

- 블럭은 7-bag randomizer 방식으로 선택됩니다.

- 블럭은 낙하를 시작하고 고정되기 전까지 조작에 의해 다음과 같은 동작이 가능합니다.

  - 이동: 좌, 우, 아래 방향으로 블럭을 이동시킵니다.
  - 회전: 블럭을 시계 방향으로 90도 회전시킵니다.
    - 회전 방식과 월 킥은 [SRS](https://tetris.fandom.com/wiki/SRS)를 따릅니다.
  - 하드 드롭: 블럭을 바닥으로 이동시키고 바로 고정합니다.

- 매 프레임마다 락 딜레이 타이머를 증가시킵니다. 타이머가 락 딜레이(1/48G 기준 60프레임)에 도달하면 블럭을 고정시킵니다. 타이머는 다음과 같은 경우에 초기화됩니다.

  - 블럭이 낙하했을 때
  - 블럭이 아래로 이동했을 때
  - 블럭이 고정됐을 때

- 블럭을 고정할 때마다 다음과 같은 과정을 수행합니다.

  - 채워진 줄이 있는지 확인하고 지웁니다.
  - 지운 줄 수에 따라 점수를 계산합니다.
  - 게임 오버 조건을 체크합니다.
  - 낙하시킬 새로운 블럭을 선택합니다.

- 게임 종료 조건은 상태와 `useEffect` 훅을 통해 체크합니다.

  ```javascript
  export const GAME_MODE = {
    SPRINT: 'SPRINT',
    FREE: 'FREE',
  };
  
  const FINISH_CONDITION = {
    [GAME_MODE.SPRINT]: ({lines}) => lines >= 40,
    [GAME_MODE.FREE]: () => false,
  };
  
  // ...
  
  export const useGameState = (gameMode) => {
    // ...
  
    useEffect(() => {
      if (FINISH_CONDITION[gameMode]({lines, score})) {
        setGameState(GAME_STATE.FINISH);
      }
    }, [gameMode, lines, score]);
  
    // ...
  };
  ```

## 🎵 Sound Source

#### BGM

- [JRPG Pack 1 Exploration](https://opengameart.org/content/jrpg-pack-1-exploration), [Juhani Junkala](https://juhanijunkala.com/)  / [CC0](https://creativecommons.org/publicdomain/zero/1.0/)

#### SE

- [512 Sound Effects (8-bit style)](https://opengameart.org/content/512-sound-effects-8-bit-style), [Juhani Junkala](https://juhanijunkala.com/) / [CC0](https://creativecommons.org/publicdomain/zero/1.0/)

## 📝 License

[MIT licenced](https://github.com/bluewood-truth/react-tetris/blob/main/LICENSE).

