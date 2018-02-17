import React from 'react' ;
import PropTypes from 'prop-types' ;

import Shelf from './Shelf' ;

const MyLibrary = ({ shelves, ...controlTools }) => {
    const shelfNames = Object.keys(shelves) ;
    return (
        shelfNames.map( shelf => (
            <Shelf
                key={ shelf }
                books={ shelves[shelf] }
                shelves={ shelfNames } // value altered after passed via controlTools
                { ...controlTools }

                >
                <h1>{ shelf }</h1>
            </Shelf>
        ) )
    )
}

MyLibrary.propTypes = {
    shelves:PropTypes.object,
    arrange:PropTypes.func,
    refresh:PropTypes.func
}

export default MyLibrary ;