import React, { Fragment } from 'react';
import {valueInRange} from "../utils/helpers";
import withStyles from "@material-ui/core/styles/withStyles";
import Badge from "@material-ui/core/Badge";
import UpVoteIcon from "@material-ui/icons/ThumbUp";
import DownVoteIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import * as PropTypes from "prop-types";
import {styles} from '../styles';

const Vote = ({upVoteAction, downVoteAction, voteScore, classes}) => (
    <Fragment>
        <IconButton aria-label="UP Vote" onClick={upVoteAction}>
            <UpVoteIcon/>
        </IconButton>
        <Badge className={classes.margin} color="secondary" badgeContent={valueInRange(voteScore)}>
            <div/>
        </Badge>
        <IconButton aria-label="DOWN Vote" onClick={downVoteAction}>
            <DownVoteIcon/>
        </IconButton>
    </Fragment>
);

Vote.propTypes = {
    upVoteAction: PropTypes.func.isRequired,
    downVoteAction: PropTypes.func.isRequired,
    voteScore: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Vote);