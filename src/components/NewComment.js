import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {styles} from '../styles';
import Button from "@material-ui/core/Button";
import {empty} from "../utils/helpers";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {addComment, editComment} from "../actions/comments";
import {setNewUserName} from "../actions/user";

class NewComment extends Component {
    state = {
        author: empty(this.props.id)? this.props.defaultAuthor : this.props.author,
        body: this.props.body,
        open: this.props.open,
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            author: empty(this.props.id)? this.props.defaultAuthor : this.props.author,
            body: nextProps.body,
            open: nextProps.open,
        });
    }

    saveComment = () => {
        if(empty(this.props.id)){//new Post
            const comment = {
                body: this.state.body,
                author: this.state.author,
                parentId: this.props.postId,
            };
            this.props.addComment(comment);
            this.props.setNewUserName(comment.author);//update the userName for future actions
        }
        else{//edit post
            const comment = {
                body: this.state.body,
                id: this.props.id,
            };
            this.props.editComment(comment)
        }
        this.props.onCloseDialog();
    };

    closeDialog = () => {
        this.props.onCloseDialog();
    };

    render() {
        const {author, body, open} = this.state;
        const newComment = empty(this.props.id);
        const {classes} = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{newComment ? "Add a Comment" : "Edit a Comment"}</DialogTitle>
                <DialogContent className={classes.noOverflow}>
                    <TextField
                        value={author}
                        autoFocus={newComment}
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
                            readOnly: !newComment,
                        }}
                    />
                    <TextField
                        value={body}
                        autoFocus={!newComment}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.saveComment} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = ({user}) => {
    return {
        defaultAuthor: empty(user)? '' : user.name,
    }
};


NewComment.propTypes = {
    author: PropTypes.string,
    defaultAuthor: PropTypes.string,
    id: PropTypes.string,
    body: PropTypes.string,
    postId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    setNewUserName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {addComment, editComment, setNewUserName})(withStyles(styles)(NewComment))