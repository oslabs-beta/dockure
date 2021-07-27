import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Leaders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: null,
    };
  }

  componentDidMount() {
    // uncomment the below for proxy challenge

    fetch('/api/leaders')
      .then((response) => response.json())
      .then((leaders) => this.setState({ leaders }));
  }

  render() {
    if (!this.state.leaders) return null;
    const leaderNames = this.state.leaders.map((leader) => (
      <li key={leader.id}>{leader.name}</li>
    ));
    return (
      <div>
        <div>Leaders:</div>
        <ul>{leaderNames}</ul>
      </div>
    );
  }
}

export default Leaders;
