import React  from 'react' ;
import Book from './Book' ;
import ShelfSelect from './ShelfSelect' ;
import './Shelf.css' ;

const Shelf = (props) => {
    const books = props.books;
    return (
        <section>
            {
                props.children && props.children
            }
            <div className='books'>
                { books.map(book => (
                    <Book
                        key={book.id}
                        bookData={book}
                        updateShelf={props.updateShelf}>

                    </Book>
                    )) }
            </div>
        </section>
    ) ;
}

export default Shelf ;