import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import {
    Link,
} from 'react-router';
import DatePicker from 'material-ui/DatePicker';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeader,
    TableHeaderColumn,
    TableFooter,
} from 'material-ui/Table';

import style from '../style';
import {
    fetchTests,
} from '../action/backend.jsx';

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
        this.fetchTests();
    }

    dateFormat(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dateOfMonth = date.getDate();
        return `${year}-${month}-${dateOfMonth}`;
    }

    fetchTests() {
        const date = this.dateFormat(this.state.date);
        this.props.dispatch(fetchTests(date));
    }

    handleChange(date) {
        console.log(date);
        this.setState({
            date,
        });
        this.fetchTests();
    }

    render() {
        console.log(this.props.tests);
        const tests = this.props.tests[this.dateFormat(this.state.date)] || [];
        const rows = tests.map((test, index) => {
            return (
                <TableRow key={`report-test-${test._id}`}>
                    <TableRowColumn>{index + 1}</TableRowColumn>
                    <TableRowColumn>{test.name}</TableRowColumn>
                    <TableRowColumn>{test.phone}</TableRowColumn>
                    <TableRowColumn>{test.score}</TableRowColumn>
                    <TableRowColumn>{test.date}</TableRowColumn>
                    <TableRowColumn>
                        <a href={`/${test.date}/${test.phone}`} target="_blank">详情</a>
                    </TableRowColumn>
                </TableRow>
            );
        });
        return (
            <div style={style.container}>
                <h2 style={{
                    textAlign: 'center',
                }}>
                    <DatePicker
                        hintText="根据日期查询评测报告"
                        container="inline"
                        mode="landscape"
                        disableYearSelection={true}
                        autoOk={true}
                        value={this.state.date}
                        onChange={(e, date) => {
                            console.log(date);
                            this.handleChange(date);
                        }}
                        style={{
                            display: 'inline-block',
                        }}
                        textFieldStyle={{
                            width: '96px',
                        }}
                    />
                    测评报告
                </h2>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>序号</TableHeaderColumn>
                            <TableHeaderColumn>姓名</TableHeaderColumn>
                            <TableHeaderColumn>手机</TableHeaderColumn>
                            <TableHeaderColumn>分数</TableHeaderColumn>
                            <TableHeaderColumn>日期</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn style={{
                                textAlign: 'right',
                            }}>共{tests.length}份</TableRowColumn>
                        </TableRow>
                    </TableFooter>
                    <TableBody
                        displayRowCheckbox={false}
                        stripedRows={true}
                    >
                        {rows}
                    </TableBody>
                </Table>
            </div>
        );
    }

}


Report.propTypes = {
};


function select(state) {
    return {
        tests: state.tests || {},
    };
}


export default connect(select)(Report);
