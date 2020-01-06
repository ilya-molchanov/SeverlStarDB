import React from 'react';


const Row = ({left, right}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {/* {itemList} */}
                {left}
            </div>
            <div className="col-md-6">
                {/* {personDetails} */}
                {right}
            </div>
           
        </div>
    );
};

export default Row;