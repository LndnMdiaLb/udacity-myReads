import React, { Component } from 'react' ;
import PropTypes from 'prop-types' ;
import {Route, Link} from 'react-router-dom' ;
import * as BooksAPI from './BooksAPI' ;
import Shelf from './Shelf';
import SearchForm from './SearchForm';
import './App.css' ;

class App extends Component {

  static propTypes = {
    shelves:PropTypes.array
  }


    // Component's constructor
  constructor(props){
    // Required to call original constructor
    super(props);
    // Props are now accessible from here
    // var v = props.hello_i_am_a_prop;
    this.getAll = this.getAll.bind(this);
    this.search = this.search.bind(this);
    this.update = this.update.bind(this);
  }

  state = {
    // home page
    shelves:{
      currentlyReading:[],
      wantToRead:[],
      read:[]
    },
    // search page
    searchResults:[]
  }

  /*
    Single Responsibility Principle - a component should ideally do one thing
  */

  // does not mount everytime Routing is applied
  componentDidMount() {
    this.getAll() ;
  }

  componentDidUpdate(){
    console.log('did', this.state)
  }

  /*
  returns JSON list of all books on Shelves
  */

  getAll(){
    BooksAPI.getAll()
      .then(books => {
          // construct initial shelves state in temp object
          const shelves = {} ;
          books.forEach(
            book => ( shelves[book.shelf] || (shelves[book.shelf] = []) ).push(book)
          ) ;
          console.log('getall', shelves)
          this.setState({
            shelves
          }) ;
      })
  }

  get(id){
    BooksAPI.get(id)
    .then(book => {
        console.log('get book:', book)
    })
  }

  /*
  */

  search(query){
    query ?
      // if query is not null/undefined : make api call with query
      BooksAPI.search(query)
        .then(searchResults => {
          // FIX
          Array.isArray(searchResults) ?
            this.setState({ searchResults }) :
            this.setState({ searchResults:[] })
        })
        .catch(error => {
          // state query error
          this.setState({
            searchResults:[]
          }) ;
        })
      : // if query is null/undefined : empty search results
      this.setState({
        searchResults:[]
      }) ;
  }


  update(book, shelf){
    /*
    returns JSON list of all books.id on Shelves
        {
          currentlyReading:[<stringOfID>,<stringOfID>],
          wantToRead:[<stringOfID>,<stringOfID>,<stringOfID>],
          read:[<stringOfID>]
        }
    */
    BooksAPI.update(book.id, shelf)
      .then(updates => {

        console.log('update', updates) ;
        this.setState({
          updates
        }) ;
      })
  }

  render() {
    const shelfNames = Object.keys(this.state.shelves) ;
    console.log(Object.keys(this.state.shelves)[1])
    return (
      <article>
        <h1>My Reads</h1>

        <section className='shelves'>

          <Route exact path='/' render={() =>
          <div>{
            shelfNames.map( shelf => (
              <Shelf
                key={ shelf }
                name={shelf}
                books={this.state.shelves[shelf]}
                {...this.state}
                update={this.update}>
                  <h1>{shelf}</h1>
              </Shelf>
              ) )}
                <Link to="/search">About</Link>
                <button onClick={_=>this.update(this.state.searchResults[7], Object.keys(this.state.shelves)[1])}>update</button>
                <button onClick={_=>this.getAll()}>get</button>
                <button onClick={_=>this.get(this.state.searchResults[7].id)}>get book</button>
                <button onClick={_=>this.search('An')}>search</button>
                </div>

            } />

          <Route exact path='/search' render={() => (
              <Shelf
                  name='search'
                  books={this.state.searchResults}
                  {...this.state}
                  update={this.update}>
                  <SearchForm
                    search={ this.search }
                    />
              </Shelf>
            )} />

          </section>
      </article>
    )
  }
}

export default App ;
