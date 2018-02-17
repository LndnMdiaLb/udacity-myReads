import React  from 'react' ;
import Book from './Book' ;
import BookControl from './BookControl' ;
import './Shelf.css' ;

const Shelf = ({ books, children, ...controlTools } ) => {
    return (
        <section>
            {
                children && children
            }
            <div className='books'>
                { books.map(book => (
                    <Book
                        key={book.id}
                        book={book}
                        >
                        <BookControl
                            bookId={book.id}
                            shelf={book.shelf}
                            {...controlTools}
                        />
                    </Book>
                    )) }
            </div>
        </section>
    ) ;
}

export default Shelf ;