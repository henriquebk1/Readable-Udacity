import React from 'react';
import * as PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from "@material-ui/core/Hidden";
import {styles} from '../styles';
import PostSort from "./PostSort";
import PostFilter from "./PostFilter";
import {connect} from "react-redux";
import {searchChanged} from "../actions/options";


class HomeAppBar extends React.Component {
    searchChanged = event => this.props.searchChanged(event.target.value);

    render() {
        const {classes, search} = this.props;

        return (
            <div className={classes.appBarRoot}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.appBarSection}>
                            <PostSort/>
                            <PostFilter/>
                        </div>
                        <Hidden xsDown>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                Readable
                            </Typography>
                        </Hidden>
                        <div className={classes.grow}/>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                value={search}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onChange={this.searchChanged}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

HomeAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({search}) {
    return {
        search: search,
    }
}

export default connect(mapStateToProps, {searchChanged})(withStyles(styles)(HomeAppBar))

