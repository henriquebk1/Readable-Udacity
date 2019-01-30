import React, {Component} from 'react';
import {empty} from "../../utils/helpers";
import {styles} from "../../styles";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import PageAppBar from "../PageAppBar";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import {addPost, deletePost, downVotePost, editPost, fetchPosts, upVotePost} from "../../actions/posts";
import {setNewUserName} from "../../actions/user";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/es/Typography/Typography";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import {Link, Redirect} from "react-router-dom";
import CommentList from "../CommenList";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import NewComment from "../NewComment";
import Grid from "@material-ui/core/Grid";
import Vote from "../Vote";
import CommentCount from "../CommentCount";

class PostScreen extends Component {
    state = {
        showNewCommentDialog: false,
    };

    componentWillMount() {
        if (this.props.needsToLoad) {
            this.props.fetchPosts();
        }
    }

    downVote = (id) => {
        this.props.downVotePost(id)
    };

    upVote = (id) => {
        this.props.upVotePost(id);
    };

    delete = (id) => {
        this.props.deletePost(id);
    };

    render() {
        const {classes, post, needsToLoad, commentsCount} = this.props;
        return (
            <React.Fragment>
                {empty(post) && !needsToLoad && <Redirect to='/notFound'/>}
                <PageAppBar/>
                {!empty(post) &&
                <Card className={classes.margin} elevation={1}>
                    <CardHeader
                        className={classes.card}
                        title={post.title.toUpperCase()}
                        subheader={`${post.category.toUpperCase()} - ${post.author} (${moment(post.timestamp).fromNow()})`}
                        titleTypographyProps={{variant: "h5", align: "center", className: classes.margin}}
                        action={<div>
                            <IconButton>
                                <Link to={`/edit/${post.id}`}>
                                    <EditIcon/>
                                </Link>
                            </IconButton>
                            <IconButton onClick={() => this.delete(post.id)}>
                                <Link to={`/`}>
                                    <DeleteIcon/>
                                </Link>
                            </IconButton>
                        </div>}
                    />
                    <CardContent>
                        <Typography align="justify">
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Button onClick={() => {
                                    this.setState({showNewCommentDialog: true})
                                }}
                                        color="primary" variant="contained" className={classes.margin}>
                                    Add Comment
                                </Button>
                                <Vote
                                    upVoteAction={() => this.upVote(post.id)}
                                    downVoteAction={() => this.downVote(post.id)}
                                    voteScore={post.voteScore}
                                />
                            </Grid>
                            <Grid item>
                                <CommentCount count={commentsCount}/>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>}
                {
                    !empty(post) && post.id &&
                    <React.Fragment>
                        <CommentList postId={post.id}/>
                        {this.state.showNewCommentDialog &&
                        <NewComment postId={post.id}
                                    open={true}
                                    onCloseDialog={() => {
                                        this.setState({showNewCommentDialog: false})
                                    }}/>
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({posts, options, user, comments}, ownProps) => {
    let post = {};
    if (empty(posts)) {//need to load the posts
        return {
            needsToLoad: true,
            categories: options.categories,
        }
    }
    const {match} = ownProps;
    if (match && match.params && match.params.post_id) {
        const {post_id} = match.params;
        if (!empty(post_id)) {
            try {
                post = posts.all.filter((p) => p.id === post_id)[0];
            } catch (e) {//can't read the posts array, ignored
            }
        }
    }
    return {
        post: post,
        categories: options.categories,
        commentsCount: empty(comments.all)? 0 : comments.all.length
    }
};

PostScreen.propTypes = {
    classes: PropTypes.object.isRequired,
    needsToLoad: PropTypes.bool,
    post: PropTypes.object,
    categories: PropTypes.array,
    commentsCount: PropTypes.number.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    setNewUserName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {fetchPosts, addPost, editPost, setNewUserName,upVotePost, downVotePost, deletePost})(withStyles(styles)(PostScreen))