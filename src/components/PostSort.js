import React, {Component} from 'react'
import Icon from '@material-ui/icons/Sort'
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import MenuList from "@material-ui/core/MenuList"
import {withStyles} from "@material-ui/core";
import {styles} from "../styles";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {sortOrderChanged} from "../actions/options";
import {sortOptions} from "../utils/constants";

class PostSort extends Component {
    state = {
        anchorEl: false,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };


    handleMenuItemClick = (event, option) => {
        this.setState({anchorEl: null});
        this.props.sortOrderChanged(option)
    };

    render() {
        const {anchorEl} = this.state;
        const {sortBy, isMobile} = this.props;
        const renderMenuOptions = (
            <div>
                <MenuItem value=""
                          selected={sortBy === undefined}
                          onClick={(event) => this.handleMenuItemClick(event, undefined)}>
                    <em>No sort order</em>
                </MenuItem>
                {sortOptions.map(option => (
                    <MenuItem
                        key={option}
                        selected={option === sortBy}
                        onClick={(event) => this.handleMenuItemClick(event, option)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </div>
        );

        const renderDesktop = (
            <div>
                {Boolean(anchorEl) &&
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
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={Boolean(anchorEl)}>
                <DialogTitle id="simple-dialog-title">Sort posts by</DialogTitle>
                <MenuList>
                    {renderMenuOptions}
                </MenuList>
            </Dialog>
        );

        return (
            <div>
                <IconButton color="inherit" onClick={this.handleClick}>
                    <Icon/>
                </IconButton>
                {isMobile && renderMobile}
                {!isMobile && renderDesktop}
            </div>
        )
    }
}

const mapStateToProps = ({options}) => ({sortBy: options.sortBy, isMobile: options.isMobile === true});

PostSort.propTypes = {
    sortBy: PropTypes.string,
    sortOrderChanged: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
};


export default connect(mapStateToProps, {sortOrderChanged})(withStyles(styles)(PostSort))