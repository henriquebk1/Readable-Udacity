import React, {Component} from 'react';
import {empty} from "../../utils/helpers";
import {styles} from "../../styles";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import PageAppBar from "../PageAppBar";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import {addPost, editPost, fetchPosts} from "../../actions/posts";
import {setNewUserName} from "../../actions/user";
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/es/Typography/Typography";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import {Link} from "react-router-dom";
import CommentList from "../CommenList";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import NewComment from "../NewComment";

class PostScreen extends Component {
    state = {
        showNewCommentDialog: false,
    };

    componentWillMount() {
        const {post} = this.props;
        if (empty(post.title) && empty(post.body) && empty(post.author) && empty(post.category)) {//the post has is empty
            this.props.fetchPosts()//reloads the post from the api
        }
    }

    render() {
        const {classes, post} = this.props;
        return (
            <React.Fragment>
                {empty()}
                <PageAppBar/>
                {!empty(post) &&
                <Card className={classes.margin} elevation={1}>
                    <CardHeader
                        className={classes.card}
                        title={post.title.toUpperCase()}
                        subheader={`${post.category.toUpperCase()} - ${post.author} (${moment(post.timestamp).fromNow()})`}
                        titleTypographyProps={{variant: "h5", align: "center", className: classes.margin}}
                        action={<IconButton>
                            <Link to={`/edit/${post.id}`}>
                                <EditIcon/>
                            </Link>
                        </IconButton>}
                    />
                    <CardContent>
                        <Typography align="justify">
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => {
                            this.setState({showNewCommentDialog: true})
                        }}
                                color="primary" variant="contained" className={classes.margin}>
                            Add Comment
                        </Button>
                    </CardActions>
                </Card>}
                <CommentList postId={post.id}/>
                {this.state.showNewCommentDialog &&
                <NewComment postId={post.id}
                            open={true}
                            onCloseDialog={() => {
                                this.setState({showNewCommentDialog: false})
                            }}/>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({posts, options, user}, ownProps) => {
    let post = {
        title: '',
        body: '',
        category: '',
        author: '',
    };//post with default values
    const {match} = ownProps;
    if (match && match.params && match.params.post_id) {//if received the a post id will edit the post, else create a new
        const {post_id} = match.params;
        if (!empty(post_id)) {
            try {
                post = posts.all.filter((p) => p.id === post_id)[0];
            } catch (e) {//can't read the posts array
                post.id = post_id
            }
        }
    }
    return {
        post: post,
        categories: options.categories,
    }
};

PostScreen.propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object,
    fetchPosts: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    setNewUserName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {fetchPosts, addPost, editPost, setNewUserName})(withStyles(styles)(PostScreen))