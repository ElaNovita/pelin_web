import React from 'react'
import Paper from 'material-ui/lib/paper'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupList from '../../components/group/GroupList'
import { fetchMyGroups } from '../../actions/group'
import { getMyGroups } from '../../reducers/group'
import GroupService from '../../api/group'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchMyGroups()
    }
    renderAddGroupButton() {
        if (this.context.auth.user.is_teacher) {
            return (<button>add group</button>)
        }
        return;
    }
    render() {
        if (!this.props.myGroups.ids.length) {
            // TODO: render loading message
            var renderGroupList = 'Loading...'
        } else {
            const myGroups = getMyGroups(this.context.store.getState())
            var renderGroupList = <GroupList groups={myGroups} />
        }
        return (
            <div>
                <h4>Grup Yang Diikuti</h4>
                {this.renderAddGroupButton()}
                {renderGroupList}
            </div>
        )
    }
}

Home.contextTypes = {
    store: React.PropTypes.object,
    auth: React.PropTypes.object
}

const mapStateToProps = state => ({
    myGroups: state.myGroups
    // myGroups: getMyGroups(state)
})

const mapDispatchToProps = dispatch => ({
    fetchMyGroups: () => {
        dispatch(fetchMyGroups())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home
