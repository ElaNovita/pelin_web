import React from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../../actions/post'
import PostList from '../../components/group/PostList'
import NewPostForm from '../../components/group/NewPostForm'

class Posts extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.context.groupId);
    }

    render () {
        var posts = this.props.posts.items[this.context.groupId];
        if (posts && posts.length) {
            var renderPosts = <PostList posts={posts} />
        } else if (posts && !posts.length) {
            var renderPosts = <span>No posts</span>
        } else {
            var renderPosts = <span>Loading...</span>
        }
        return (
            <div>
                <NewPostForm />
                {renderPosts}
            </div>
        )
    }
}

Posts.contextTypes = {
    groupId: React.PropTypes.string
}

const mapStateToProps = state => ({
    posts: state.posts
})

const mapDispathToProps = dispatch => ({
    fetchPost: (groupId) => {
        dispatch(fetchPost(groupId))
    }
})

export default connect(mapStateToProps,
    mapDispathToProps)(Posts)
