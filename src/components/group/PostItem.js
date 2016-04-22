import React from 'react'
import { connect } from 'react-redux'
import { fetchComment } from '../../actions/post'
import CommentList from '../../components/group/CommentList'
import NewCommentForm from '../../components/group/NewCommentForm'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            showComment: false
        }
    }
    
    handleChange(e) {
        this.setState({ commentText: e.target.value })
    }

    toggleComment() {
        this.setState({ showComment: !this.state.showComment });
        if (!this.state.showComment) {
            this.props.fetchComment(this.context.groupId,
                this.props.post.id);
        }
    }

    render() {
        const post = this.props.post;
        var renderComments = ''
        if (this.state.showComment) {
            const comments = this.props.comments.items[post.id];
            renderCommentList = '';
            if (comments && comments.length) {
                var renderCommentList = (
                    <div><CommentList comments={comments} /></div>
                )
            }

            var renderComments = (
                <div>
                {renderCommentList}
                <NewCommentForm postId={post.id} />
                </div>
            )
        }

        return (
            <div>
                <div>
                    <b>{post.user.name}</b>
                    <span>:{post.text}</span>
                    {/*<div><CommentList comments={comments} /></div>*/}
                </div>
                <div>{renderComments}</div>
                <FlatButton label="comment" secondary={true}
                    onClick={this.toggleComment.bind(this)} />
            </div>
        )
    }
}

PostItem.contextTypes = {
    groupId: React.PropTypes.string
}

const stateProps = state => ({
    comments: state.comments
})

const dispatchProps = dispatch => ({
    fetchComment: (groupId, postId) => {
        dispatch(fetchComment(groupId, postId))
    }
})

export default connect(stateProps, dispatchProps)(PostItem)
