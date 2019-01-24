import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography"
import moment from "moment"
import {withStyles} from "@material-ui/core";
import {styles} from "../styles";
import * as PropTypes from "prop-types";
import Card from "@material-ui/core/es/Card/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import OpenIcon from "@material-ui/icons/OpenInNew";
import UpVoteIcon from "@material-ui/icons/ThumbUp";
import DownVoteIcon from "@material-ui/icons/ThumbDown";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Badge from "@material-ui/core/es/Badge/Badge";
import Divider from "@material-ui/core/Divider";
import {valueInRange} from "../utils/helpers";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link,withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {deletePost, downVotePost, upVotePost} from "../actions/posts";
import {connect} from "react-redux";

class Post extends Component {
    state = {
        anchorEl: undefined,
    };

    downVote = (id) => {
        this.props.downVotePost(id)
    };

    upVote = (id) => {
        this.props.upVotePost(id);
    };

    delete = (id) => {
        this.props.deletePost(id);
    };


    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    render() {
        const { post,classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <Card className={classes.margin} elevation={1}>
                <CardHeader
                    className={classes.card}
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {post.category.charAt(0).toUpperCase() + post.category.substring(1, 3)}
                        </Avatar>
                    }
                    title={post.title}
                    subheader={`${post.author} (${moment(post.timestamp).fromNow()})`}
                    titleTypographyProps={{variant: "h5",className: classes.oneLineeText}}
                    action={
                        <IconButton onClick={this.handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography className={classes.threeLinesText} variant="body1" align="justify">
                        {post.body}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Grid container justify="space-between">
                        <Grid item>
                            <IconButton aria-label="UP Vote" onClick={() => this.upVote(post.id)}>
                                <UpVoteIcon/>
                            </IconButton>
                            <Badge className={classes.margin} color="secondary" badgeContent={valueInRange(post.voteScore)}>
                                <div/>
                            </Badge>
                            <IconButton aria-label="DOWN Vote" onClick={() => this.downVote(post.id)}>
                                <DownVoteIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Link to={post.category+'/'+post.id} >
                                <IconButton aria-label="Comments">
                                    <Badge color="secondary" badgeContent={post.commentCount}>
                                        <CommentIcon/>
                                    </Badge>
                                </IconButton>
                            </Link>

                            <Link to={post.category+'/'+post.id} >
                                <IconButton aria-label="Open">
                                    <OpenIcon/>
                                </IconButton>
                            </Link>
                        </Grid>
                    </Grid>
                </CardActions>
                {
                    Boolean(anchorEl) &&
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem>
                            <Link to={`/edit/${post.id}`}>Edit</Link>
                        </MenuItem>
                        <MenuItem onClick={() => this.delete(post.id)}>Delete</MenuItem>
                    </Menu>
                }
            </Card>
        )
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};

export default withRouter(connect(null,{upVotePost, downVotePost, deletePost})(withStyles(styles)(Post)))