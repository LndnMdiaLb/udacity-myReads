import React, { Component } from 'react' ;
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI' ;
import Shelf from './Shelf';
import './App.css' ;

class App extends Component {

  static propTypes = {
    shelves:PropTypes.array
  }

  // constructor(props){
  //   super(props);
  //   this.props.shelves = [ 'currentlyReading', 'wantToRead', 'read' ]; // error
  // }

  state = {
    shelves:{
      currentlyReading:[],
      wantToRead:[],
      read:[]
    },
    searchResults:[]
  }

  /*
    Single Responsibility Principle - a component should ideally do one thing
  */

  componentDidMount() {
    this.getAll() ;
  }


// BooksAPI.update({id:"H8tNBKmPO5UC"},'currentlyReading').then(function(books){
//   console.log(books);
// })

  getAll(){
    BooksAPI.getAll()
      .then(books => {

          // construct initial shelves state in temp object
          const shelves = {} ;
          books.forEach(
            book => ( shelves[book.shelf] || (shelves[book.shelf] = []) ).push(book)
          ) ;

          this.setState({
            shelves
          }) ;
      })
  }

  search(query){
    query ?
    // if query is not null/undefined : make api call with query
    BooksAPI.search(query)
      .then(searchResults => {
        this.setState({
          searchResults
        }) ;
      }) :
    // if query is null/undefined : empty search results
    this.setState({
      searchResults:[]
    }) ;
  }

  update(book, shelf){
    BooksAPI.update(book.id, shelf)
      .then(searchResults => {
        this.setState({
          searchResults
        }) ;
      })
  }


  render() {
    const shelfNames = Object.keys(this.state.shelves) ;

    return (

      <article>

        <h1>My Reads</h1>

        <Route exact path='/' render={()=>
            shelfNames.map( shelf => (
                  <Shelf key={shelf} title={shelf} books={this.state.shelves[shelf]}/>
                )
          )} />

         <Route exact path='/search' render={()=> (
            <div>
              <input className='search' type='text' />
              <Shelf books={ this.state.searchResults}/>
            </div>
          )} />

      </article>
    )
  }

}

export default App ;
