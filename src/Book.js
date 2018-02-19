import React from 'react' ;
import PropTypes from 'prop-types' ;

const Book = ({book, children} )=>{
    return (
        <div className='book'>
            <div className='thumb'
                style={{
                    background: book.imageLinks ?
                            `url(${book.imageLinks.smallThumbnail}) center no-repeat` :
                            '#2f2f2f' ,
                    backgroundSize:'cover'
                }}
            >
            </div>
            <div className='info'>
                <h3>{book.title}</h3>
                <h5>{book.authors}</h5>
                {
                    children
                }
            </div>
        </div>
    ) ;
}

Book.propTypes = {
    book: PropTypes.object
}

export default Book ;