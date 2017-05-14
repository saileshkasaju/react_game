/**
 * Created by Edge on 5/13/2017.
 */
import React from 'react';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';

class Game extends React.Component {
    static randomNumber = () => 1+ Math.floor(Math.random()*9);
    state = {
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5
    };
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }))
    };
    deselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers
                .filter(number => number !== clickedNumber)
        }));
    };
    checkAnswer = () => {
      this.setState(prevState => ({
          answerIsCorrect: prevState.randomNumberOfStars ===
              prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
      }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            randomNumberOfStars: Game.randomNumber()
        }))
    };
    redraw = () => {
        if (this.state.redraws === 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: [],
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            redraws: prevState.redraws - 1
        }));
    };
    render() {
        const {
            randomNumberOfStars,
            selectedNumbers,
            usedNumbers,
            answerIsCorrect,
            redraws
        } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            answerIsCorrect={answerIsCorrect}
                            redraws={redraws}
                    />
                    <Answer selectedNumbers={selectedNumbers}
                            unselectNumber={this.deselectNumber}
                    />
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers}
                         usedNumbers={usedNumbers}
                         selectNumber={this.selectNumber}
                />
            </div>
        );
    }
}

export default Game;