import React, { Component } from 'react' ;
import PropTypes from 'prop-types';

import serialize from 'form-serialize' ;

class SearchForm extends Component {

  static propTypes = {
    search: PropTypes.func.isRequired
  }

  submit(ev){
    ev.preventDefault() ;
    // serialize form to object and retrieve query property
    const query = serialize(ev.target, { hash: true }).query ;
    // pased search function
    this.props.search(query) ;
  }

  render() {
    return (
        <form onSubmit={ this.submit.bind(this) } >
          <input type="text" name="query" />
          <button>search</button>
        </form>
    ) ;
  }

}

export default SearchForm ;