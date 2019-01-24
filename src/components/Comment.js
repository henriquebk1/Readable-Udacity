import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography"
import moment from "moment"
import {withStyles} from "@material-ui/core";
import {styles} from "../styles";
import * as PropTypes from "prop-types";
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpVoteIcon from "@material-ui/icons/ThumbUp";
import DownVoteIcon from "@material-ui/icons/ThumbDown";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Badge from "@material-ui/core/es/Badge/Badge";
import Divider from "@material-ui/core/Divider";
import {valueInRange} from "../utils/helpers";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {deleteComment, downVoteComment, upVoteComment} from "../actions/comments";
import {connect} from "react-redux";
import NewComment from "./NewComment";

class Post extends Component {
    state = {
        showDialog: false,
    };

    downVote = (id) => {
        this.props.downVoteComment(id)
    };

    upVote = (id) => {
        this.props.upVoteComment(id);
    };

    delete = (id) => {
        this.props.deleteComment(id);
    };

    render() {
        const {comment, classes} = this.props;
        return (
            <Card className={classes.margin} elevation={1}>
                <CardHeader
                    subheader={`${comment.author} (${moment(comment.timestamp).fromNow()})`}
                />
                <CardContent>
                    <Typography variant="body1" align="justify">
                        {comment.body}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Grid container justify="space-between">
                        <Grid item>
                            <IconButton aria-label="UP Vote" onClick={() => this.upVote(comment.id)}>
                                <UpVoteIcon/>
                            </IconButton>
                            <Badge className={classes.margin} color="secondary"
                                   badgeContent={valueInRange(comment.voteScore)}>
                                <div/>
                            </Badge>
                            <IconButton aria-label="DOWN Vote" onClick={() => this.downVote(comment.id)}>
                                <DownVoteIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="Delete" onClick={() => this.delete(comment.id)}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton aria-label="Edit" onClick={() => this.setState({showDialog: true})}>
                                <EditIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
                {this.state.showDialog &&
                <NewComment id={comment.id}
                            author={comment.author}
                            body={comment.body}
                            postId={comment.parentId}
                            open={true}
                            onCloseDialog={() => {
                                this.setState({showDialog: false})
                            }}/>}
            </Card>
        )
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
};

export default withRouter(connect(null, {upVoteComment, downVoteComment, deleteComment})(withStyles(styles)(Post)))