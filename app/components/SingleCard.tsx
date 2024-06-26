import Image from "next/image";
import styles from "./SingleCard.module.css";
import useSound from "use-sound";

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
  const [flip] = useSound("_flip.mp3");
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
          src="/images/purpleCover.jpg"
          width={85}
          height={85}
          alt=""
          className={styles.back}
          onClick={() => {
            if (!disabled) {
              flip();
              handleChoice(card);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SingleCard;
