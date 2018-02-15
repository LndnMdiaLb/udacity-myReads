import React, {Component} from 'react' ;
import PropTypes from 'prop-types' ;
import './Book.css' ;

class Book extends Component{

    static propTypes = {
        bookData: PropTypes.object ,
        updateShelf: PropTypes.func
    }

    // componentDidMount(){

    // }

    render(){
        let {bookData} = this.props ;
        // console.log(bookData.id)
        return (
            <div className='book'>
                <div className='thumb'>
                    <img
                        src={ bookData.imageLinks? bookData.imageLinks.smallThumbnail : '' }
                        alt = 'thumbnail'
                        />
                </div>
                <div>
                    <h3>{bookData.title}</h3>
                    <h5>{bookData.authors}</h5>
                </div>
                {
                    this.props.children
                }
            </div>
        ) ;
    }
}

export default Book ;