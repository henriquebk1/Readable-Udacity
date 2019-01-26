import React, {Component} from 'react';
import HomeAppBar from "../HomeAppBar";
import PostList from "../PostList";
import {empty} from "../../utils/helpers";
import {Redirect} from "react-router-dom";
import {filterChanged} from "../../actions/options";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";

class Home extends Component {
    componentWillMount() {
        const {category} = this.props;
        const routeCategory = this.getCurrentCategoryRoute();
        this.setState({validCategory: this.validateCategory(category, routeCategory)})
    }

    getCurrentCategoryRoute() {
        const {match} = this.props;
        if (match && match.params && match.params.category) {
            return match.params.category;
        }
        return undefined;
    }

    validateCategory(currentCategory, routeCategory) {
        let currentCategoryPath = undefined;
        if (!empty(currentCategory)) {
            currentCategoryPath = currentCategory.path
        }
        if (currentCategoryPath === routeCategory)
            return true;
        else if (currentCategoryPath !== routeCategory &&
            (routeCategory === undefined || this.props.categories === undefined ||
                this.props.categories.map(category => category.path)
                    .includes(routeCategory))) {
            this.props.filterChanged(routeCategory);
            return true;
        } else
            return false;
    }

    render() {
        const {validCategory} = this.state;
        return (
            <div>
                {!validCategory && <Redirect push to='/notFound'/>}
                <HomeAppBar/>
                <PostList/>
            </div>
        )
    }
}

const mapStateToProps = ({options}) => (
    {
        category: options.category,
        categories: options.categories,
    });

Home.propTypes = {
    filterChanged: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    categories: PropTypes.array,
    category: PropTypes.string,
};

export default connect(mapStateToProps, {filterChanged})(Home)