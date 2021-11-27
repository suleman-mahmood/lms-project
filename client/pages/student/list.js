import React from 'react';



const BookCard = (props) => {
    const  book  = props.book;
    let send

    
    {

send = <div>
        <div fluid="sm" className="bgp d-flex-inline p-3 border border-light"> 
            <div  className="text-light">name</div>
            
            <div md={5} className="text-light">{book}</div>
    </div>
    </div>

    }

    

    return(
        <div>{send}</div>
    )
};

export default BookCard;