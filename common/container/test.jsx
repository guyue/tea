import React, {
    Component,
    PropTypes,
} from 'react';
import {
    connect,
} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TestHeader from '../component/TestHeader.jsx';
import TestQuestion from '../component/TestQuestion.jsx';

import {
    setTestAnswer,
    updateTest,
    fetchQuestions,
} from '../action/frontend.jsx';


class Test extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchQuestions(this.props.params.date, this.props.params.phone));
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <TestHeader questions={this.props.questions} onSubmit={() => {
                        this.props.dispatch(updateTest());
                    }} />
                    <Paper style={{
                        width: '960px',
                        paddingTop: '68px',
                        margin: 'auto auto  68px',
                    }}>
                        <TestQuestion questions={this.props.questions}
                            onSetAnswer={(questionId, answer) => {
                                this.props.dispatch(setTestAnswer(questionId, answer));
                            }}
                        />
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }

}

Test.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
};


function select(state) {
    return {
        questions: state.test.questions,
    };
}


export default connect(select)(Test);
