import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImage } from '../reducers/api';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            imageQuery: ''
        };
    }

    componentWillMount(){
        this.timer = null;
    }

    getQuery(value){
        clearTimeout(this.timer);

        this.setState({
            imageQuery: value
        });

        this.timer = setTimeout(() => this.searchImage(value), 1000);
    }

    searchImage(query){
        const {
            props: {
                getImage
            }
        } = this;

        getImage(query);
    }

    render() {
        const {
            props: {
                apiLoading,
                apiImage,
                apiError
            },
            state: {
                imageQuery
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
                !apiLoading && apiError &&
                <p>Please try your search again</p>
            }
            <form className='searchInput'>
            <label htmlFor='search'>Search</label>
            <input
                id='search'
                type='text'
                onChange={(event) => this.getQuery(event.target.value)}
            />
            <button
                type='button'
                onClick={() => this.searchImage(imageQuery)}
            >Search</button>
            </form>
            {
                apiImage &&
                <img src={apiImage} alt='Test'/>
            }
            </div>
        );
    }
}

const mapStateToProps = ({ api }) => ({
    apiImage: api.image,
    apiLoading: api.isLoading,
    apiError: api.hasError
});

const mapDispathToProps = dispatch => ({
    getImage: () => dispatch(getImage)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    getImage: dispatchProps.getImage(),
    ...ownProps
});

export default connect(
    mapStateToProps,
    mapDispathToProps,
    mergeProps
)(App);
