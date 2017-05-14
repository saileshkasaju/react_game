/**
 * Created by Edge on 5/13/2017.
 */
import React from 'react';

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    };
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i}
                          className={numberClassName(number)}
                          onClick={() => props.selectNumber(number)}
                    >{number}</span>
                )}
            </div>
        </div>
    )
};
Numbers.list = [...Array(9).keys()].map(x => x+1);


export default Numbers;
