/**
 * Created by Edge on 5/13/2017.
 */
import React from 'react';

const Stars = (props) => {
    // const numberOfStars = 1+ Math.floor(Math.random()*9);

    return (
        <div className="col-5">
            {[...Array(props.numberOfStars).keys()].map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    );
};

export default Stars;