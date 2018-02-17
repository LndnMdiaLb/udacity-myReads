import React, { Component } from 'react' ;
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI' ;
import Shelf from './Shelf';


export default class SearchForm extends Component {

  static propTypes = {
    shelves:PropTypes.object,
    locateBook:PropTypes.func
  }

  state={
    search:[],
    query:''
  }

  submit(ev){
    ev.preventDefault() ;
    let {value:query} = ev.target ;
    this.setState(
      { query },
        _=>this.search(query)) ;
     ;
  }

  search(query){
    query ?
      // if query is not null/undefined : make api call with query
      BooksAPI.search(query)
        .then(search => {
          const {locateBook} = this.props ;
          let mybook;
          search = search.map(book =>
            (mybook = locateBook(book.id)) ? mybook : book )
          // console.log(search)
          // FIX
          Array.isArray(search) ?
            this.setState({ search }) :
            this.setState({ search:[] })
        })
        .catch(error => {
          // state query error
          this.setState({ search:[] }) ;
        })
      : // if query is null/undefined : empty search results
      this.setState({ search:[] }) ;
  }

  render() {
    const { search, query } = this.state,
            controlTools = this.props ;
    return (

      <React.Fragment>
        <input type="text"
          onChange={this.submit.bind(this)}
          value={ query }/>

        <Shelf
            books={ search }
            {...controlTools} // obfuscates
            shelves={Object.keys(this.props.shelves)} // overwrites
            >
        </Shelf>
      </React.Fragment>

    ) ;
  }

};