import React from 'react';
import '../Styles/home.css';

import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component {

    render() {
        const { quicksearches } = this.props;
        return (
            <div>

                <div className="quicksearch">
                    <p className="quicksearchHeading">
                        Quick Searches
                </p>
                    <p className="quicksearchSubHeading">
                        Discover restaurants by type of meal
                </p>

                    <div className="container-fluid">

                        <div className="row">
                            { quicksearches.length !== 0 ?
                                quicksearches.map((item) => {
                                    return <QuickSearchItem item={item} />
                                }) 
                            
                    
                            : null }
                       </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default QuickSearch;