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
        randomNumberOfStars: 1+ Math.floor(Math.random()*9)
    };
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }))
    };
    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.randomNumberOfStars} />
                    <Button />
                    <Answer selectedNumbers={this.state.selectedNumbers} />
                </div>
                <br />
                <Numbers selectedNumbers={this.state.selectedNumbers}
                         selectNumber={this.selectNumber}
                />
            </div>
        );
    }
}

export default Game;