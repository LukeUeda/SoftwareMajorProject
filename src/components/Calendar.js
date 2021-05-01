import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";

class Calendar extends Component {

    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    };

    componentDidMount() {

        // this.setState({isLoading:true});
        //
        // let url = `${API_URL}/${API_CATEGORIES_PATH}`;
        // console.info(`Fetching from ${url}...`);
        //
        // // API_GET_CONFIG.headers.username = localStorage.getItem('username');
        //
        // let apiConfig = getGetOptions();
        //
        // console.log("Username is :", apiConfig.headers.username);
        //
        // fetch(url, apiConfig)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ data: data, isLoading: false })
        //     })
        //     .catch(
        //         error => {
        //             console.error(error);
        //             // throw error;
        //             this.setState({ error, isLoading: false })
        //         }
        //     );
    }

    render() {

        // const { data, isLoading, error } = this.state;
        //
        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // } else if (isLoading || data == null) {
        //     return <Loader />
        // } else {
        //
        //     // console.log(JSON.stringify(data));

            return (
                <>

                    <button type="button" className="btn btn-lg btn-danger" data-toggle="popover" title="Popover title"
                            data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle
                        popover
                    </button>

                    <div className="alert alert-primary" role="alert">
                        A simple primary alert—check it out!
                    </div>
                    <div className="alert alert-secondary" role="alert">
                        A simple secondary alert—check it out!
                    </div>
                    <div className="alert alert-success" role="alert">
                        A simple success alert—check it out!
                    </div>
                    <div className="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                    </div>
                    <div className="alert alert-warning" role="alert">
                        A simple warning alert—check it out!
                    </div>
                    <div className="alert alert-info" role="alert">
                        A simple info alert—check it out!
                    </div>
                    <div className="alert alert-light" role="alert">
                        A simple light alert—check it out!
                    </div>
                    <div className="alert alert-dark" role="alert">
                        A simple dark alert—check it out!
                    </div>

                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>

                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </>
            );
        // }
    }
    //
    // createCategories(data) {
    //
    //     let categories = [];
    //     for (let i = 0; i < data.length; i++) {
    //         let category = data[i];
    //         categories.push(
    //             <li className="list-group-item list-group-item-action" key={category.id}>
    //                 <div className="d-flex justify-content-between">
    //                     <div>
    //                         {category.name}
    //                     </div>
    //                     <div>
    //                         <span className="align-middle">
    //
    //                             <span className="pl-2"/>
    //                             <a href={PATH_CATEGORIES + "/" + category.id + "/tests/P"} className="alert alert-warning pt-1 pb-1 pr-2 pl-2" data-toggle="tooltip" data-placement="left" title={category.pendingTests + " pending tests"}>{category.pendingTests}</a>
    //
    //                             <span className="pl-2"/>
    //                             <a href={PATH_CATEGORIES + "/" + category.id + "/tests/C"} className="alert alert-primary pt-1 pb-1 pr-2 pl-2" data-toggle="tooltip" data-placement="left" title={category.completedTests + " completed tests"}>{category.completedTests}</a>
    //
    //                             <span className="pl-2"/>
    //                             <a href={PATH_CATEGORIES + "/" + category.id + "/templates"}>
    //                                 <i className="fa fa-layer-group fa-lg" data-toggle="tooltip" data-placement="left" title="Templates"/>
    //                             </a>
    //
    //                             <span className="pl-2"/>
    //                             <a href={PATH_CATEGORIES + "/" + category.id + "/stats"}>
    //                                 <i className="fas fa-chart-line fa-lg" data-toggle="tooltip" data-placement="left" title="Stats"/>
    //                             </a>
    //
    //                             {!auth.isActing() && (<span>
    //                                 <span className="pl-2"/>
    //                                 <Link to={PATH_TEST_GENERATION + "/" + category.id}>
    //                                     <i className={"fas fa-plus fa-lg" + (auth.isActing() ? " text-secondary" : "")} data-toggle="tooltip" data-placement="left" title="Create a new test"/>
    //                                 </Link>
    //                             </span>)}
    //                         </span>
    //                     </div>
    //                 </div>
    //             </li>);
    //     }
    //
    //     return categories;
    // }
}

export default Calendar;