import styles from './SingleCard.module.scss';

export const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)
    }
  }

  return <div className={styles.card}>
    <div className={flipped ? styles.flipped : ""}>
      <img className={styles.front}
           src={card.src}
           alt='card front'/>
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <img className={styles.back}
           src='/img/cover.png'
           alt='card back'
           onClick={handleClick} />
    </div>  
  </div>
}