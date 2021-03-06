import React from 'react'
import ReactDOM from 'react-dom'
import AssignmentService from '../../../api/assignment'
import { submitAddAction } from '../../../actions/assignment'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'

class AssignmentSubmitForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
    }
    onSubmit(e) {
        e.preventDefault()

        const text = this.refs.text.getValue()
        const file = this.state.file
        if (file) {
            const data = new FormData()

            if (text) {
                data.append('text', text)
            }
            data.append('file', file)

            AssignmentService(this.context.groupId)
                .submit(this.context.assignmentId, data)
                .then(r => {
                    this.context.store.dispatch(
                        submitAddAction(this.context.assignmentId, r.data)
                        )
                    this.goBack()
                    this.context.showSnackbar('Berhasil mengumpulkan tugas')
                    this.context.fetchAssignmentCount()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    goBack() {
        this.context.router.replace(`/groups/${this.context.groupId}/assignments`)
    }
    _openFileDialog() {
        var fileInput = ReactDOM.findDOMNode(this.refs.file)
        fileInput.click()
    }
    _handleFileChange(e) {
        console.log(e.target.files[0])
        this.setState({ file: e.target.files[0] })
    }
    render() {
        if (this.state.file) {
            var btnLabel = this.state.file.name
        } else {
            var btnLabel = 'Pilih File'
        }
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div>
                    <TextField
                        ref='text'
                        hintText='Keterangan tambahan'
                        fullWidth={true}
                        multiLine={true}
                        rows={3}
                        style={{ fontSize: 14}} />
                </div>

                <div>
                    <FlatButton label={btnLabel} onClick={this._openFileDialog.bind(this)} />
                    <input
                        onChange={this._handleFileChange.bind(this)}
                        ref='file' type='file' accept='.doc, .docx, .xls, .xlsx, .ppt, pptx, .pdf, image/*, .zip, .rar, .txt'
                        style={{display: 'none'}} />
                </div>

                <div style={{marginTop: 15}}>
                    <RaisedButton onClick={this.goBack.bind(this)} label='Batal' />
                    <RaisedButton
                        style={{float: 'right'}}
                        type='submit' primary={true} label='Kumpulkan' />
                </div>
            </form>
        )
    }
}

AssignmentSubmitForm.contextTypes = {
    assignmentId: React.PropTypes.string,
    groupId: React.PropTypes.string,
    router: React.PropTypes.object,
    showSnackbar: React.PropTypes.func,
    store: React.PropTypes.object,
    fetchAssignmentCount: React.PropTypes.func
}

export default AssignmentSubmitForm
