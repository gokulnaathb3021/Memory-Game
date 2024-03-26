import styles from "./AboutGameModal.module.css";

type AboutGameModalProps = {
  closeModal: () => void;
};

const AboutGameModal: React.FC<AboutGameModalProps> = ({ closeModal }) => {
  return (
    <div className={styles.aboutGame}>
      <h1>Magic Match</h1>
      <p>
        Welcome to the Memory Match Game! Challenge yourself by flipping cards
        to find matching pairs of images. If a pair of chosen images don't
        match, they will flip back over. The game ends when you uncover all the
        matching pairs of images.
      </p>
      <button onClick={closeModal}>PLAY</button>
    </div>
  );
};

export default AboutGameModal;
