import { forwardRef } from "react";
import styles from "./GameOverModal.module.css";

type ChildProps = {
  turns: number;
  playAgain: () => void;
};

const GameOverModal = forwardRef<HTMLDialogElement, ChildProps>(
  ({ turns, playAgain }, ref) => {
    return (
      <dialog ref={ref} className={styles.gameOverDialog}>
        <p>You solved it in {turns} turns.</p>
        <form method="dialog">
          <button type="submit">Close</button>
        </form>
        <button onClick={playAgain} className={styles.playAgain}>
          Play Again
        </button>
      </dialog>
    );
  }
);

export default GameOverModal;
