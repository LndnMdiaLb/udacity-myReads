import React  from 'react' ;
import Book from './Book' ;
import './Shelf.css' ;

const Shelf = (props) => {
    return (
        <section>
            {props.title && <h1>{props.title}</h1>}
            <div className='shelf'>
                { props.books.map(book => (
                    <Book key={book.id} info={book} />
                    )) }
            </div>
        </section>
    ) ;
}

export default Shelf ;