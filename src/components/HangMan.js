import React ,{useState}from 'react';
import './HangMan.css';
import step0 from '../images/0.jpg'
import step1 from '../images/1.jpg'
import step2 from '../images/2.jpg'
import step3 from '../images/3.jpg'
import step4 from '../images/4.jpg'
import step5 from '../images/5.jpg'
import step6 from '../images/6.jpg'
import { randomWord } from './RandomWord';


HangMan.defaultProps={
    maxWrong:6,
    images:[step0,step1,step2,step3,step4,step5,step6]
}
function HangMan(props) {
    const [state, setstate] = useState({            
        mistake:0,
        guessed:new Set([]),
        answer:randomWord(),})

        const gameOver = state.mistake>= props.maxWrong;
        let gameStat = generateButtons();
        let isWinner = guessedWord().join('')=== state.answer;
        if(isWinner) {
            gameStat="You Won!"
        }else if(gameOver){gameStat="You Lost"}

        const handleGuess = e =>{
            let letter = e.target.value;
            setstate(state => ({ ...state, guessed: state.guessed.add(letter) }))
            setstate(state => ({ ...state, mistake:(state.answer.includes(letter) ? 0 : 1)+state.mistake }))
          
        }
        console.log(state)
        function guessedWord(){
           
            return state.answer.split("").map(letter=>(state.guessed.has(letter) ? letter : " _ "))
        }
        function generateButtons(){
            return "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>(
                <button className='btn btn-lg btn-primary m-2'
                    key={letter}
                    value={letter}
                    onClick={(e)=>{handleGuess(e)}}
                    disabled={state.guessed.has(letter)}
                >
                    {letter}
                </button>
            ))
        }
        
        function resetButton(){
            setstate({
                mistake:0,
                guessed:new Set([]),
                answer:randomWord(),
            })
        }

        return (
            <div className="">
                <h1>Hangman</h1>
                <h2 className='float-right'>Wrong Guesses: {state.mistake} of {props.maxWrong}</h2>
                <div className="text-center">
                    <img src={props.images[state.mistake]} alt=""/>
                </div>
                <div className="text-center">
                    <p>Guess the programming language:</p>
                    <p>{!gameOver ? guessedWord(): state.answer}</p>
                <p>{gameStat}</p>
                <button className='btn btn-info' onClick={resetButton}>Reset Game</button>
                </div>
            </div>
        )
}

export default HangMan
