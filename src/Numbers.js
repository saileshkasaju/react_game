/**
 * Created by Edge on 5/13/2017.
 */
import React from 'react';

const Numbers = (props) => {
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i}>{number}</span>
                )}
            </div>
        </div>
    )
};
Numbers.list = [...Array(9).keys()].map(x => x+1);


export default Numbers;
