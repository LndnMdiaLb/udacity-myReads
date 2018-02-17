import React from 'react' ;
import PropTypes from 'prop-types' ;
import './Book.css' ;

const Book = ({book, children} )=>{
    return (
        <div className='book'>
            <div className='thumb'>
                <img
                    src={ book.imageLinks? book.imageLinks.smallThumbnail : '' }
                    alt = 'thumbnail'
                />
            </div>
            <div>
                <h3>{book.title}</h3>
                <h5>{book.authors}</h5>
            </div>
            {
                children
            }
        </div>
    ) ;
}

Book.propTypes = {
    book: PropTypes.object
}

export default Book ;