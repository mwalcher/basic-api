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
        const {
            props: {
                users,
                apiLoading
            }
        } = this;

        return (
            <div className="app">
                <h1>React App</h1>
                {
                    apiLoading &&
                    <p>Loading</p>
                }
                {
                    users && users.length > 0 &&
                    users.map((user, index) => (
                        <p key={`${user.nat}-${index}`}>{user.name.first} {user.name.last}</p>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = ({ api }) => ({
    users: api.users,
    apiLoading: api.isLoading,
    apiError: api.hasError
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
