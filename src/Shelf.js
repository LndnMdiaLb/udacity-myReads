import React  from 'react' ;
import PropTypes from 'prop-types' ;

import Book from './Book' ;
import BookControl from './BookControl' ;

const Shelf = ({ className, books, children, ...controlTools } ) => {
    return (
        <section className={['shelf', className].join(' ')}>
            <div className='head'>
                { children && children /* header children */ }
            </div>
            <div className='books'>
                { books.map(book =>
                    <Book
                        key={book.id}
                        book={book}
                        >
                        <BookControl
                            id={book.id}
                            shelf={book.shelf}
                            {...controlTools}
                        />
                    </Book>
                    ) }
            </div>
        </section>
    ) ;
}

Shelf.propTypes = {
    books:PropTypes.array,
}

export default Shelf ;