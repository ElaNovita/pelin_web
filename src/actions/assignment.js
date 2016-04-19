import createAsyncAction from './createAsyncAction'
import AssignmentService from '../api/assignment'

export var fetchAssignmentAction = createAsyncAction("FETCH_ASSIGNMENT");

export var fetchAllAssignment = groupId => {
    return (dispatch, getState) => {
        const assignments = getState().assignments.items[groupId];
        if (assignments && assignments.length) {
            console.log("no need to load assignments in this group");
            return Promise.resolve();
        }

        dispatch({ type: fetchAssignmentAction.start });
        
        return AssignmentService(groupId).fetchAll()
            .then(r => {
                console.log(r);
                dispatch({
                    type: fetchAssignmentAction.success,
                    items: r.data,
                    groupId
                })
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: fetchAssignmentAction.fail,
                    error
                })
            })
    }
}