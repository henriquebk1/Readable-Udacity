import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {styles} from '../styles';
import * as PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import {filterChanged, loadCategories} from "../actions/options";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuList from "@material-ui/core/MenuList";
import FilterIcon from "@material-ui/icons/List";
import Menu from "@material-ui/core/Menu";
import {empty} from "../utils/helpers";
import IconButton from "@material-ui/core/IconButton";
import {withRouter} from "react-router-dom";

class PostFilter extends Component {
    state = {
        anchorEl: false,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    handleMenuItemClick = (event, path) => {
        this.props.filterChanged(path);
        this.setState({anchorEl: null});
        this.props.history.push('/'+path)
    };

    render() {
        const {anchorEl} = this.state;
        const {categories, filter, isMobile} = this.props;
        const renderMenuOptions = (
            <div>
                <MenuItem value="" selected={undefined === filter}
                          onClick={event => this.handleMenuItemClick(event, '')}>
                    <em>All Categories</em>
                </MenuItem>
                {!empty(categories) && categories.map((categorie) => (
                    <MenuItem
                        key={categorie.path}
                        selected={categorie.path === filter}
                        onClick={event => this.handleMenuItemClick(event, categorie.path)}
                    >
                        {categorie.name}
                    </MenuItem>
                ))}
            </div>

        );

        const renderDesktop = (
            <div>
                {
                    Boolean(anchorEl) &&
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        {renderMenuOptions}
                    </Menu>
                }
            </div>
        );

        const renderMobile = (
            <Dialog onClose={this.handleClose} aria-labelledby="filter-dialog-title" open={Boolean(anchorEl)}>
                <DialogTitle id="filter-dialog-title">Filter Posts by</DialogTitle>
                <MenuList>
                    {renderMenuOptions}
                </MenuList>
            </Dialog>
        );

        return (
            <div>
                <IconButton aria-label="Add an alarm" color="inherit" onClick={this.handleClick}>
                    <FilterIcon/>
                </IconButton>
                {isMobile && renderMobile}
                {!isMobile && renderDesktop}
            </div>
        )
    }
}

PostFilter.propTypes = {
    loadCategories: PropTypes.func.isRequired,
    filterChanged: PropTypes.func.isRequired,
    filter: PropTypes.string,
    categories: PropTypes.array,
    isMobile: PropTypes.bool,
};


function mapStateToProps({options}) {
    return {
        isMobile: options.isMobile === true,
        filter: options.filter,
        categories: options.categories,
    }
}

export default withRouter(connect(mapStateToProps, {loadCategories, filterChanged})(withStyles(styles)(PostFilter)))