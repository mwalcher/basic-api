import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../reducers/api';

class App extends Component {
    componentWillMount() {
        const {
            props: {
                getUsers
            }
        } = this;

        getUsers();
    }

    render() {
        return (
            <div className="app">
                <h1>React App</h1>
            </div>
        );
    }
}

const mapStateToProps = ({ api }) => ({

});

const mapDispathToProps = dispatch => ({
    getUsers: () => dispatch(getUsers)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    getUsers: dispatchProps.getUsers(),
    ...ownProps
});

export default connect(
    mapStateToProps,
    mapDispathToProps,
    mergeProps
)(App);
