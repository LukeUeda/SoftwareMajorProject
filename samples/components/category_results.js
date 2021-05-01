import React, {Component} from 'react';
import CategoryResultsHistory from "./category_results_history";

class CategoryResults extends Component {

    render() {
        return <div className="pt-3 container-fluid">
            {/*<div class="row">*/}
                <CategoryResultsHistory data={this.props.data}/>

                {/*<div className="col-xs-4">*/}
                    {/*<CategoryResultsOverall data={this.props.data}/>*/}
            {/*</div>*/}
            </div>;
    }
}

export default CategoryResults;
