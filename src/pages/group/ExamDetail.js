import React from 'react'
import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'
import Time from '../../components/Time'
import Text from '../../components/Text'
import ExamStudentScores from '../../components/group/group/ExamStudentScores'


class ExamDetail extends React.Component {
    render() {
        const description = this.context.exam.description ? (
            <Text text={this.context.exam.description} />
        ) : null

        const actionBtn = (this.context.exam.score == null && !this.context.group.is_owner) ? (
            <RaisedButton
                label={`Ujian sekarang (${this.context.exam.duration} menit)`}
                primary={true}
                fullWidth={true}
                onTouchTap={() => {
                    if (confirm('Jika anda keluar dari halaman soal, akan dianggap mengumpulkan, ujian sekarang?')) {
                        this.context.router.push(`/groups/${this.context.groupId}/exams/${this.context.examId}/answer`)
                    }
                }} />
        ) : null

        const score = this.context.exam.score != null ? (
            <Paper style={{padding: 16, color: '#fff', backgroundColor: '#2196F3'}}>
                <span>Score</span>
                <span style={{float: 'right', fontSize: 22}}>{this.context.exam.score*100}</span>
            </Paper>
        ) : null

        var studentScores
        var questionPage
        if (this.context.group.is_owner) {
            studentScores = (
                <ExamStudentScores />
            )
            questionPage = (
                <RaisedButton
                    onTouchTap={() => {
                        this.context.router.push(
                            `/groups/${this.context.groupId}/exams/${this.context.examId}/questions`
                        )
                    }}
                    label='Halaman soal >' />
            )
        }

        return (
            <div>
                <div className='col-md-6 col-md-offset-3'>
                    {score}
                    {questionPage}
                    <Paper style={{padding: 16, marginTop: 8}}>
                        <p className='assignment-info__title'>{this.context.exam.title}</p>
                        <Time isoDate={this.context.exam.created_at} />
                        {description}
                    </Paper>
                    {actionBtn}
                    {studentScores}
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

ExamDetail.contextTypes = {
    exam: React.PropTypes.object,
    examId: React.PropTypes.string,
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    router: React.PropTypes.object
}

export default ExamDetail
