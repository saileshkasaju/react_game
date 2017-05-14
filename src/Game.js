/**
 * Created by Edge on 5/13/2017.
 */
import React from 'react';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';

class Game extends React.Component {
    state = {
        selectedNumbers: [],
        randomNumberOfStars: 1+ Math.floor(Math.random()*9),
        answerIsCorrect: null
    };
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }))
    };
    deselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
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
    render() {
        const {
            randomNumberOfStars,
            selectedNumbers,
            answerIsCorrect
        } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            answerIsCorrect={answerIsCorrect}
                    />
                    <Answer selectedNumbers={selectedNumbers}
                            unselectNumber={this.deselectNumber}
                    />
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers}
                         selectNumber={this.selectNumber}
                />
            </div>
        );
    }
}

export default Game;