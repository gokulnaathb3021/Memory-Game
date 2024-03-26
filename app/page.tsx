"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import SingleCard from "./components/SingleCard";
import useSound from "use-sound";
import AboutGameModal from "./components/AboutGameModal";
import GameOverModal from "./components/GameOverModal";

type cardObj = {
  src: string;
  id: number;
  matched: boolean;
};
const cardImages = [
  { src: "/images/helmet-1.png", id: 0, matched: false },
  { src: "/images/potion-1.png", id: 0, matched: false },
  { src: "/images/ring-1.png", id: 0, matched: false },
  { src: "/images/scroll-1.png", id: 0, matched: false },
  { src: "/images/shield-1.png", id: 0, matched: false },
  { src: "/images/sword-1.png", id: 0, matched: false },
];

export default function Home() {
  const [cards, setCards] = useState<cardObj[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<cardObj | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<cardObj | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [match] = useSound("matching.mp3");
  const [completed] = useSound("completed.mp3");
  const [matchCount, setMatchCount] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // shuffle cards
  const shuffleCards = () => {
    let shuffledCards = [...cardImages, ...cardImages];
    for (let i = shuffledCards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    shuffledCards = shuffledCards.map((card) => ({
      ...card,
      id: Math.random(),
    }));

    setMatchCount(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card: cardObj) => {
    // choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  // compare the 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setMatchCount((prevCount) => prevCount + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);

  // reset choices and increase the turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // starting a game on first visit.
  useEffect(() => {
    shuffleCards();
  }, []);

  // sound effect
  useEffect(() => {
    if (matchCount === 0) return;
    if (matchCount < 6)
      setTimeout(() => {
        match();
      }, 500);
    if (matchCount === 6) {
      setTimeout(() => {
        completed();
        setTimeout(() => {
          dialogRef.current!.showModal();
        }, 500);
      }, 500);
    }
  }, [matchCount]);

  // close modal
  const toggleModel = () => {
    setPlay((prevState) => !prevState);
  };

  // close gameOver modal and play again
  const playAgain = () => {
    shuffleCards();
    dialogRef.current!.close();
  };

  return (
    <>
      {!play && <AboutGameModal toggleModal={toggleModel} />}
      <GameOverModal ref={dialogRef} turns={turns} playAgain={playAgain} />
      <div className={styles.app}>
        <h2>Magic Match</h2>
        <div className={styles.buttons}>
          <button onClick={toggleModel}>?</button>
          <button onClick={shuffleCards}>New Game</button>
        </div>

        <div className={styles.cardGrid}>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={
                card.id === choiceOne?.id ||
                card.id === choiceTwo?.id ||
                card.matched
              }
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </>
  );
}
