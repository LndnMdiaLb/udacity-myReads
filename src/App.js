import React, { Component } from 'react' ;
import PropTypes from 'prop-types' ;
import {Route, Link} from 'react-router-dom' ;
import * as BooksAPI from './BooksAPI' ;
import MyLibrary from './MyLibrary';
import SearchForm from './SearchForm';
import './App.css' ;

export default class App extends Component {

  static propTypes = {
    shelves:PropTypes.object
  }

  state = {
    shelves:{
      currentlyReading:[],
      wantToRead:[],
      read:[]
    }
  }

  /*
    Single Responsibility Principle - a component should ideally do one thing
  */

  // does not mount everytime Routing is applied
  componentDidMount() {
    this.getAll() ;
  }

  /*
    retrieves JSON list of all books on Shelves and adds to state
  */

  getAll(){
    BooksAPI.getAll()
      .then(books => {
          // construct initial shelves in temp object
          const shelves = {} ;
          books.forEach(
            book => ( shelves[book.shelf] || (shelves[book.shelf] = []) ).push(book)
          ) ;
          this.setState({
            shelves
          }) ;
      })
      .catch(error=>{
        // ???
      })
  }

  //////////////////////////////////////////////////////////////////////
  // Shelf Manipulation
  //////////////////////////////////////////////////////////////////////

  /*
    checks if book id (from raw BookAPI.search) exists in
    MyLibrary and returns Library book object
  */

  locateBook(id){
    let {shelves} = this.state ;
    for (let shelf in shelves){
        let book = shelves[shelf].find(book=>book.id===id)
        if(book) return book
    }
    return null
  }

  /*
    rearranges a book in state.shelves
  */

  sortto(book, shelf){
    const { shelves } = this.state ,
          prvshelf = book.shelf
          ;
    book.shelf = shelf ;
    shelves[prvshelf].splice(shelves[prvshelf].indexOf(book), 1) ;
    if(shelf !== 'none') shelves[shelf].push(book) ;
    return Promise.resolve(shelves);
  }

  /*
    add a book in state.shelves
  */

  addto(book, shelf=null){
    const { shelves } = this.state ;
    shelves[ shelf ? shelf : book.shelf ].push(book) ;
    if(shelf) book.shelf = shelf ;
    return Promise.resolve(shelves) ;
  }

  //////////////////////////////////////////////////////////////////////
  // Shelf Manipulation
  //////////////////////////////////////////////////////////////////////

  arrange(id, shelf){
    let book;
    ((book =  this.locateBook(id)) ?
        this.sortto(book, shelf)
        :
        // if book not in MyLibrary retrieve it
        BooksAPI.get(id).then(book => this.addto(book, shelf)))

    .then(shelves =>  this.setState({ shelves }) ) ;

    // update remote
    BooksAPI.update({id}, shelf)
  }



  render() {
    const controlTools = {
      shelves:Object.assign({}, this.state.shelves) ,
      arrange:this.arrange.bind(this)
    }

    return (
      <article>
        <h1>My Reads</h1>

          <Route exact path='/' render={() =>
              <React.Fragment>
                <MyLibrary {...controlTools} />
                <Link to="/search">Search</Link>
              </React.Fragment>
            } />

          <Route exact path='/search' render={() =>
              <React.Fragment>
                <SearchForm {...controlTools}
                            locateBook={this.locateBook.bind(this)} />
                <Link to="/">My Library</Link>
              </React.Fragment>
            } />

      </article>
    )
  }
}