import styled from "styled-components";

export const ContainerPraise = styled.div`
  overflow-x: hidden;
  //height: 100vh;
  //background: var(--color-light-gray);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  .praise-container {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    background: var(--color-background-white);
    width: 100%;
    //display: none;
  }

  .praise-main {
    width: fit-content;
    padding: 7rem 0 4rem 0;
  }

  .praise-title,
  .praise-title-not-splitted {
    color: var(--color-black);
    font-size: 1.5rem;
  }

  .praise-title-portuguese,
  .praise-title-portuguese-not-splitted {
    font-size: 1rem;
    font-weight: 200;
    color: var(--color-dark-gray);
  }

  .praise-lines-container {
    display: flex;
    gap: 3rem;
  }

  .praise-lines-1,
  .praise-lines-not-splitted-1 {
    margin-top: 1.5rem;
    font-family: monospace;
    font-weight: normal;
  }

  .praise-lines-2,
  .praise-lines-not-splitted-2 {
    font-family: monospace;
    font-weight: normal;
  }

  .praise-lines-lyrics {
    margin-top: 2.5rem;
  }

  .space-blanck-chords {
    width: 100%;
    height: 3rem;
  }

  .repetitions-number,
  .repetitions-number-not-splitted,
  .repetitions-number-chords,
  .repetitions-number-chords-not-splitted {
    position: absolute;
    right: -30px;
    color: black;
    font-size: 1rem;
  }

  .chord-key-container {
    display: flex;
    margin: 10px 0;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-light-gray);
    width: fit-content;
    padding: 5px;
    border-radius: 10px;
    left: 4%;
    top: 9%;
    position: absolute;
  }

  .chord-key-container > p {
    width: 30px;
  }

  .button-change-key {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background: var(--color-background-white);
    border: 1px solid var(--color-light-gray);
    font-size: 1rem;
  }

  .button-to-service-list {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    right: 2%;
    bottom: 2%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-light-gray);
    cursor: pointer;
    background-color: var(--color-background-white);
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;

    &:hover {
      border: 1px solid var(--color-dark-gray);
      background: var(--color-light-gray-2);
    }
  }

  .button-to-split {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    right: 2%;
    top: 10%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-light-gray);
    cursor: pointer;
    background-color: var(--color-background-white);
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;

    &:hover {
      border: 1px solid var(--color-dark-gray);
      background: var(--color-light-gray-2);
    }
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  .file-container {
    display: flex;
    justify-content: center;
    //margin-top: 15px;
    // background: pink;
    //height: 90%;
    overflow-x: auto;
    background: var(--color-light-gray);
    padding-bottom: 0;
  }

  .file-content {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 0 15px;
    margin-top: 4.2rem;
    //display: none;
  }

  .file {
    width: 100%;
    background: var(--color-background-white);
    border: 0;
  }

  .progress-container {
    display: flex;
    padding-top: 20%;
    justify-content: center;
    width: 100%;
    background: var(--color-background-white);
  }

  // .file-fullscreen {
  //   overflow-x: auto;
  //   background: #fff;
  //   width: 100%;
  //   height: auto;
  //   text-align: center;

  //   img {
  //     width: 100%;
  //   }
  // }

  @media (max-width: 1300px) {
    .file-content {
      width: 99%;
    }
    .progress-container {
      padding-top: 40%;
    }

    .file-container {
      margin-top: 5px;
    }

    .praise-title {
      font-size: 1.2rem;
    }

    .praise-main {
      padding: 5rem 0 4rem 0;
    }

    .praise-title-portuguese {
      font-size: 1rem;
    }
    .praise-lines-1,
    .praise-lines-2 {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 1024px) {
    .chord-key-container {
      position: absolute;
      top: 7%;
      padding: 1px;
      border-radius: 20px;
    }

    .chord-key-container > p {
      font-size: 1rem;
    }

    .praise-title {
      font-size: 1.5rem;
    }
    .praise-title-portuguese {
      font-size: 1.1rem;
    }

    .praise-main {
      padding: 11rem 0 4rem 0;
    }

    .praise-lines-1,
    .praise-lines-2 {
      font-size: 1.1rem;
      margin-top: 2rem;
    }

    .button-to-split {
      width: 40px;
      height: 40px;
      right: 4%;
      top: 8%;
      padding: 10px;
    }
  }

  @media (max-width: 820px) {
    .praise-main {
      padding: 9rem 0 4rem 0;
    }

    .praise-title {
      font-size: 1.2rem;
    }
    .praise-title-portuguese {
      font-size: 1rem;
    }
    .praise-lines-1,
    .praise-lines-2 {
      font-size: 0.9rem;
    }
  }
  @media (max-width: 768px) {
    .chord-key-container {
      top: 8%;
    }
    .praise-main {
      padding: 9rem 0 4rem 0;
    }

    .button-change-key {
      width: 30px;
      height: 30px;
    }

    .button-to-split {
      top: 9%;
    }

    .repetitions-number-chords {
      font-size: 0.9rem;
      right: -22px;
    }
  }

  @media (max-width: 670px) {
    .file-container {
      background: var(--color-white);
      padding-bottom: 2rem;
    }

    .file {
      border: 1px solid var(--color-light-gray-1);
    }

    .praise-main {
      max-width: 90%;
    }

    .praise-main.large-text {
      font-size: 1rem;
    }

    .praise-main.small-text {
      font-size: 0.8rem;
    }

    .praise-lines-container {
      gap: 1.8rem;
    }

    .praise-title-portuguese {
      font-size: 1rem;
    }
    .praise-title {
      font-size: 1.1rem;
    }

    .praise-title-not-splitted {
      font-size: 1.4rem;
    }

    .praise-lines-1,
    .praise-lines-2 {
      font-size: 0.5rem;
    }

    .space-blanck-chords {
      height: 2rem;
    }

    .repetitions-number,
    .repetitions-number-not-splitted {
      right: -24px;
    }

    .repetitions-number-chords {
      font-size: 0.7rem;
      right: -18px;
    }

    .button-change-key {
      width: 25px;
      height: 25px;
    }
  }

  @media (max-width: 500px) {
    .chord-key-container {
      padding: 1px;
      top: 10%;
      border-radius: 15px;
    }

    .button-to-split {
      width: 39px;
      height: 39px;
      right: 4%;
      top: 11%;
      padding: 10px;
    }
  }
  @media (max-width: 430px) {
    .praise-title {
      font-size: 0.9rem;
    }

    .praise-title-not-splitted {
      font-size: 1.1rem;
    }

    .praise-title-portuguese {
      font-size: 0.7rem;
    }

    .praise-title-portuguese-not-splitted {
      font-size: 0.9rem;
    }

    .praise-lines-1,
    .praise-lines-2 {
      font-size: 0.52rem;
    }

    .button-to-split {
      width: 39px;
      height: 39px;
      right: 4%;
      padding: 10px;
      top: 10%;
    }

    .chord-key-container {
      padding: 1px;
      border-radius: 15px;
      top: 9%;
    }

    .repetitions-number {
      right: -14px;
    }

    .repetitions-number-chords-not-splitted {
      font-size: 0.8rem;
      right: -22px;
    }

    .repetitions-number-chords {
      font-size: 0.6rem;
      right: -16px;
    }
  }

  @media (max-width: 425px) {
    .progress-container {
      padding-top: 50%;
    }
  }

  @media (max-width: 412px) {
    .praise-lines-container {
      gap: 0.9rem;
    }
  }

  @media (max-width: 395px) {
    .praise-title-not-splitted {
      font-size: 1.2rem;
    }
    .praise-title-portuguese-not-splitted {
      font-size: 0.9rem;
    }

    .praise-main {
      padding: 7.5rem 0 4rem 0;
    }

    .repetitions-number {
      right: -15px;
    }

    .praise-main.small-text {
      font-size: 0.7rem;
    }

    .praise-lines-container {
      gap: 1rem;
    }

    .chord-key-container {
      top: 8%;
    }

    .chord-key-container > p {
      width: 10px;
      font-size: 0.7rem;
    }

    .button-to-split {
      width: 38px;
      height: 38px;
      right: 4%;
      top: 9%;
      padding: 9px;
    }

    .praise-lines-1,
    .praise-lines-2 {
      font-size: 0.5rem;
    }
  }

  @media (max-width: 280px) {
    .praise-main {
      padding: 7rem 0 4rem 0;
    }

    .praise-title {
      font-size: 0.7rem;
    }

    .praise-title-portuguese {
      font-size: 0.6rem;
    }

    .praise-title-not-splitted {
      font-size: 1rem;
    }
    .praise-title-portuguese-not-splitted {
      font-size: 0.7rem;
    }

    .praise-lines-1,
    .praise-lines-2 {
      font-size: 0.35rem;
    }
    .praise-lines-container {
      gap: 0.8rem;
    }

    .praise-lines-not-splitted-1,
    .praise-lines-not-splitted-2 {
      font-size: 0.65rem;
    }

    .praise-lines-lyrics {
      font-size: 0.9rem;
    }

    .repetitions-number {
      right: -10px;
    }

    .repetitions-number-not-splitted {
      right: -18px;
      font-size: 0.7rem;
    }

    .repetitions-number-chords {
      font-size: 0.5rem;
      right: -13px;
    }

    .button-to-split {
      width: 32px;
      height: 32px;
      right: 4%;
      top: 12%;
      padding: 9px;
    }

    .chord-key-container {
      top: 11%;
    }

    .button-change-key {
      width: 15px;
      height: 15px;
      font-size: 0.8rem;
    }
  }
`;
