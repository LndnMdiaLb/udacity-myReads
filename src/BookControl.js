import React, { Component } from 'react';
import PropTypes from 'prop-types' ;

export default class BookControl extends Component {

    static propTypes = {
        id:PropTypes.string,
        shelf:PropTypes.string,
        shelves:PropTypes.array,
        arrange:PropTypes.func
    }

    constructor(props){
        super(props) ;
        const {shelf} = this.props ;
        this.state={
            shelf: shelf ? shelf: 'none',
            exists: !!shelf
        }
    }

    addToShelf({target:{value}}){
        const  {arrange, id} = this.props ,
                shelf = value ;
                arrange(id, shelf) ;
                this.setState({shelf}) ;
    }

    render(){
        const {shelves} = this.props ;
        return (
            <div className='book-shelf-changer'>
                <select name="text"
                        value={ this.state.shelf }
                        onChange={ this.addToShelf.bind(this) }>
                    {shelves.map(
                        shelf =>
                            <option
                                key={shelf}
                                value={shelf}
                            >{shelf}</option>
                        )}
                    <option value='none'>none</option>
                </select>
            </div>
        );
    }
}