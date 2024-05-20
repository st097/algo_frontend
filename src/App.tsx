import { useState } from 'react';
import words from './assets/wordList.json';
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';


function App() {

  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  
  const [guessedLetters, setGessedLetters] = useState<string[]>([]);  

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
        Lose Win
      </div>

      {/* hangman components */}
      <HangmanDrawing/>
      <HangmanWord/>
      <Keyboard/>



  </div>
}

export default App
