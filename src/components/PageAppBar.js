import React from 'react';
import * as PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Hidden from "@material-ui/core/Hidden";
import {styles} from '../styles';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import {withRouter} from "react-router-dom";

class PageAppBar extends React.Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.appBarRoot}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" className={classes.appBarSection} onClick={this.goBack}>
                            <BackIcon/>
                        </IconButton>
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
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

PageAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PageAppBar))

