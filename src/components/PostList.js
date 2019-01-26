import React, {Component} from 'react'
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchPosts} from '../actions/posts';
import {empty, searchInPosts, sortPosts} from "../utils/helpers";
import Post from "./Post"
import {Link, withRouter} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/core";
import {styles} from "../styles";
import Typography from "@material-ui/core/Typography";

class PostList extends Component {
    componentWillMount() {
        this.props.fetchPosts()
    }

    render() {
        const {sortBy, search, classes} = this.props;
        let {posts} = this.props;
        posts = searchInPosts(posts, search);//search in posts
        posts = sortPosts(posts, sortBy);//sort posts
        return (<div style={{padding: 5, width: '100%'}}>
                <Grid container spacing={0}>
                    {!empty(posts) && posts.map((post) =>
                        <Grid item xs={12} sm={6} key={post.id}>
                            <Post post={post}/>
                        </Grid>
                    )}
                </Grid>
                <Fab variant="extended" color="secondary" aria-label="New" className={classes.fabRight}
                     component={Link} to="/newPost">
                    <AddIcon/>
                    New
                </Fab>
                {empty(posts) && <Typography>Sorry, no posts matched your criteria.</Typography>}
            </div>
        )
    }
}

const mapStateToProps = ({options, posts}) => (
    {
        posts: posts.all,
        sortBy: options.sortBy,
        search: options.search,
    });

PostList.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    classes: PropTypes.object,
    posts: PropTypes.array,
    sortBy: PropTypes.string,
    search: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, {fetchPosts})(withStyles(styles)(PostList)))