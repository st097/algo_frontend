import { useCallback, useEffect, useState } from 'react';
import words from './assets/wordList.json';
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';

function getWord(){
  return words[Math.floor(Math.random() * words.length)];
}

function App() {

  const [wordToGuess, setWordToGuess] = useState(getWord);
  
  const [guessedLetters, setGessedLetters] = useState<string[]>([]);  

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  //if we ran out of body parts
  const isLoser = incorrectLetters.length >=6
  // checking if user guessed the word
  const isWinner = wordToGuess
    .split("")
    .every(letter=>
      guessedLetters.includes(letter)
    )

  const addGuessedLetter = useCallback(
  (letter:string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) 
      return

    setGessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isLoser, isWinner]);

  useEffect(() => {
    const handler = (e:KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  //if enter is pressed the word guessing starts again ()
  useEffect(()=> {
    const handler = (e: KeyboardEvent) =>{
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault
      setGessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  })

  return <div style={{
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    alignItems: 'center',
    }}>
      <div style={{
        fontSize: '2rem',
        textAlign:'center'
      }}>

        {isWinner && "Winner! - Pres enter to play again"}
        {isLoser && "Nice try, but you lost! - Press enter to play again"}
        
      </div>

      {/* hangman components */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord  reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{alignSelf:"stretch"}}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLeters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>      

  </div>
}

export default App
