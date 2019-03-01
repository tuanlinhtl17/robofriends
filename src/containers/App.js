import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    pending: state.requestRobots.pending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobot: () => dispatch(requestRobots())
  }
}

var ws = new WebSocket('wss://echo.websocket.org');

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobot();

    ws.open = () => console.log('connected');

    // ws.onmessage = event => console.log(event.data)

    ws.onclose = () => {
      console.log('disconnected');
      this.setState({ ws: ws });
    }
  }
  
  render() {
    const { robots, pending, searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (pending) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='tc'>
          <ErrorBoundry>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={ onSearchChange }/>
            <Scroll>
              <CardList robots={ filteredRobots } />
            </Scroll>
          </ErrorBoundry>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
