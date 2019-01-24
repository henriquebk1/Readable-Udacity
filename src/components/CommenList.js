import React, {Component} from 'react'
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {empty} from "../utils/helpers";
import {withRouter} from "react-router-dom";
import {fetchComments} from "../actions/comments";
import Comment from "./Comment";

class CommentList extends Component {
    componentWillMount() {
        this.props.fetchComments(this.props.postId)
    }

    render() {
        const {comments} = this.props;
        return (<div style={{marginTop:20, width: '100%'}}>
                    {!empty(comments) && comments.map((comment) =>
                        <Comment key={comment.id} comment={comment}/>
                    )}
            </div>
        )
    }
}

const mapStateToProps = ({comments}) => (
    {
        comments: comments.all,
    });

CommentList.propTypes = {
    fetchComments: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array,
};

export default withRouter(connect(mapStateToProps, {fetchComments})(CommentList))