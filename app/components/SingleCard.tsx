import Image from "next/image";
import styles from "./SingleCard.module.css";

type cardProp = {
  card: {
    src: string;
    id: number;
    matched: boolean;
  };
  handleChoice: Function;
  flipped: boolean;
  disabled: boolean;
};

const SingleCard: React.FC<cardProp> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : ""}>
        <Image
          src={card.src}
          width={85}
          height={85}
          alt=""
          className={styles.front}
        />
        <Image
          src="/Images/cover.png"
          width={85}
          height={85}
          alt=""
          className={styles.back}
          onClick={() => {
            if (!disabled) handleChoice(card);
          }}
        />
      </div>
    </div>
  );
};

export default SingleCard;
