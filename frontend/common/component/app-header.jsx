import React, {
    Component,
} from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import AppAction from './app-action.jsx';
import AppProgress from './app-progress.jsx';


export default class AppHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper style={{
                position: 'fixed',
                width: '100%',
                zIndex: '100',
            }}
                zDepth={2}
            >
                <AppProgress />
                <AppBar
                    title="TEA素质测评"
                    iconElementRight={<AppAction />}
                    iconStyleRight={{
                        marginTop: 0,
                        marginRight: 0,
                        alignSelf: 'center',
                    }}
                    showMenuIconButton={false}
                />
            </Paper>
        );
    }

}
