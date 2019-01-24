import React, {Component} from 'react';
import {empty} from "../../utils/helpers";
import {styles} from "../../styles";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import EditAppBar from "../PageAppBar";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import {addPost, editPost, fetchPosts} from "../../actions/posts";
import Button from "@material-ui/core/es/Button/Button";
import classNames from 'classnames';
import {setNewUserName} from "../../actions/user";

class NewEdit extends Component {constructor(props) {
        super(props);
        this.state = {post: this.props.post};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { post } = this.props;
        if(!empty(this.props.post.id)){//editing a post
            if(empty(post.title) && empty(post.body) && empty(post.author)){//the post has a id and is empty
                this.props.fetchPosts()//reloads the post from the api
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            post: nextProps.post,
        })
    }

    handleChange (event) {
        const post = {
            [event.target.name]: event.target.value
        };
        this.setState(prevState => ({//update the state with the new post
            post: {
                ...prevState.post,
                ...post
            }
        }))
    }

    handleSubmit(event) {
        const {post} = this.state;
        if(empty(post.id)){//create post
            this.props.setNewUserName(post.author);//update the userName for future actions
            this.props.addPost(post);
        }else{//edit post
            this.props.editPost(post);
        }
        this.props.history.push('/');//navigate to the home screen
        event.preventDefault();
    }

    render() {
        const {classes, categories} = this.props;
        const {post} = this.state;
        const editPost = !empty(post.id);
        return (
            <React.Fragment>
                <EditAppBar/>
                <Card className={classes.newEditFormCard}>
                    <CardContent>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <TextField
                                value={post.author}
                                required
                                id="author"
                                name="author"
                                label="Author"
                                className={classes.margin}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: editPost,
                                }}
                            />
                            <TextField
                                value={post.title}
                                required
                                name="title"
                                id="title"
                                label="Title"
                                className={classes.margin}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                onChange={this.handleChange}
                            />
                            <TextField
                                value={post.body}
                                required
                                name="body"
                                id="body"
                                label="Body"
                                className={classes.margin}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                multiline
                                onChange={this.handleChange}
                            />
                            {categories &&
                            <TextField
                                value={post.category}
                                id="category"
                                name="category"
                                select
                                label="Category"
                                className={classes.margin}
                                margin="normal"
                                variant="outlined"
                                required
                                fullWidth
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: editPost,
                                }}
                            >
                                {categories.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            }
                            <Button color="primary" variant="contained" component="span"
                                    type='submit'
                                    onClick={this.handleSubmit}
                                    className={classNames(classes.margin,classes.floatRight)}>
                                SAVE
                            </Button>
                        </form>

                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({posts, options, user}, ownProps) => {
    let post = {
        title: '',
        body: '',
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
    if (empty(post.category)) {//needs a default category
        if (empty(options.categories)) {
            post.category = ''
        } else {
            post.category = options.categories[0].name
        }
    }
    if(empty(post.author)){
        post.author = empty(user)? '' : user.name//set a default authorName
    }
    return {
        post: post,
        categories: options.categories,
    }
};

NewEdit.propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object,
    fetchPosts: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    setNewUserName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {fetchPosts, addPost, editPost, setNewUserName})(withStyles(styles)(NewEdit))