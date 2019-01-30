import React from 'react';
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import * as PropTypes from "prop-types";
import CommentIcon from "@material-ui/icons/Comment";

const CommentCount = ({count}) => (
    <IconButton aria-label="Comments">
        <Badge color="secondary" badgeContent={count}>
            <CommentIcon/>
        </Badge>
    </IconButton>
);

CommentCount.propTypes = {
    count: PropTypes.number.isRequired,
};

export default CommentCount;