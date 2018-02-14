import React, {Component} from 'react' ;
import './Book.css' ;

class Book extends Component{

    render(){
        let info = this.props.info ;
        return (
            <div className='book'>
                <div className='thumb'>
                    <img
                        src={ info.imageLinks.smallThumbnail }
                        alt = 'thumbnail'
                        />
                </div>
                <div>
                    <h3>{info.title}</h3>
                    <h5>{info.authors}</h5>
                </div>
            </div>
        ) ;
    }

}

export default Book ;