/**
 * Created by Edge on 5/13/2017.
 */
import React from 'react';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';

class Game extends React.Component {
    static randomNumber = () => 1+ Math.floor(Math.random()*9);
    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null
    });
    static possibleCombinationSum = (arr, n) => {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return Game.possibleCombinationSum(arr, n);
        }
        let listSize = arr.length, combinationsCount = (1 << listSize)
        for (let i = 1; i < combinationsCount ; i++ ) {
            let combinationSum = 0;
            for (let j=0 ; j < listSize ; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

    state = Game.initialState();
    resetGame = () => this.setState(Game.initialState());
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
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
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber()
        }), this.updateDoneStatus)
    };
    redraw = () => {
        if (this.state.redraws === 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: [],
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    };
    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = [...Array(9).keys()].map(x => x+1).filter(number =>
          usedNumbers.indexOf(number) === -1
        );
        return Game.possibleCombinationSum(possibleNumbers, randomNumberOfStars)
    };
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done Nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' };
            }
        });
    };

    render() {
        const {
            randomNumberOfStars,
            selectedNumbers,
            usedNumbers,
            answerIsCorrect,
            redraws,
            doneStatus
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
                { doneStatus ?
                    <DoneFrame doneStatus={doneStatus}
                               resetGame={this.resetGame}
                    /> :
                    <Numbers selectedNumbers={selectedNumbers}
                             usedNumbers={usedNumbers}
                             selectNumber={this.selectNumber}
                    />
                }
            </div>
        );
    }
}

export default Game;