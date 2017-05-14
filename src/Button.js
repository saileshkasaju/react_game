/**
 * Created by Edge on 5/13/2017.
 */
import React from 'react';

const Button = (props) => {
    return (
        <div className="col-2">
            <button className="btm"
                    disabled={props.selectedNumbers.length === 0}
            >
                =
            </button>
        </div>
    );
};

export default Button;