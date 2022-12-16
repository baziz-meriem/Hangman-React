import React, { Component } from 'react';
import './HangMan.css';
import step0 from '../images/0.jpg'
import step1 from '../images/1.jpg'
import step2 from '../images/2.jpg'
import step3 from '../images/3.jpg'
import step4 from '../images/4.jpg'
import step5 from '../images/5.jpg'
import step6 from '../images/6.jpg'
import { randomWord } from './RandomWord';

class HangMan extends Component {
    static defaultProps = {
        maxWrong:6,
        images:[step0,step1,step2,step3,step4,step5,step6]
    }
    constructor(props){
        super(props);
        this.state={
            mistake:0,
            guessed:new Set([]),
            answer:randomWord(),
        }
    }
    handleGuess = e =>{
        let letter = e.target.value;
        this.setState(st=>({
            guessed: st.guessed.add(letter),
            mistake:st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }))
    }
    guessedWord(){
        return this.state.answer.split("").map(letter=>(this.state.guessed.has(letter) ? letter : " _ "))
    }
    generateButtons(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>(
            <button className='btn btn-lg btn-primary m-2'
                key={letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}
            >
                {letter}
            </button>
        ))
    }
    resetButton(){
        this.setState({
            mistake:0,
            guessed:new Set([]),
            answer:randomWord(),
        })
    }
    render() {
        const gameOver = this.state.mistake>= this.props.maxWrong;
        let gameStat = this.generateButtons();
        let isWinner = this.guessedWord().join('')=== this.state.answer;
        if(isWinner) {
            gameStat="You Won!"
        }else if(gameOver){gameStat="You Lost"}
        return (
            <div className="">
                <h1>Hangman</h1>
                <h2 className='float-right'>Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</h2>
                <div className="text-center">
                    <img src={this.props.images[this.state.mistake]} alt=""/>
                </div>
                <div className="text-center">
                    <p>Guess the programming language:</p>
                    <p>{!gameOver ? this.guessedWord(): this.state.answer}</p>
                <p>{gameStat}</p>
                <button className='btn btn-info' onClick={this.resetButton}>Reset Game</button>
                </div>
            </div>
        )
    }
}

export default HangMan
