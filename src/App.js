import { useState, useEffect } from 'react';
import './App.scss';
import {SingleCard} from './components/SingleCard/SingleCard';

const cardImages = [
  {src:'/img/helmet-1.png'},
  {src:'/img/potion-1.png'},
  {src:'/img/ring-1.png'},
  {src:'/img/scroll-1.png'},
  {src:'/img/shield-1.png'},
  {src:'/img/sword-1.png'}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = cardImages.concat(cardImages).sort(() => Math.random() - 0.5).map(card => ({...card, id: Math.random(), flipped: false, matched: false}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(shuffleCards, [])

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => prevCards.map(card => {
          if(card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        }))
        resetTurn()
      }else{
        setTimeout(resetTurn, 1000)
      }
      
    }
  }, [choiceOne, choiceTwo])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button type="button"
              onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard card={card}
                      key={card.id}
                      handleChoice={handleChoice}
                      flipped={card === choiceOne || card === choiceTwo || card.matched}
                      disabled={disabled}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
