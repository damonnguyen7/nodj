import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import { fetchJobs } from '../actions/index';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobTerm: '',
      locationTerm: ''
    };

    this.onJobTitleInputChange = this.onJobTitleInputChange.bind(this);
    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onJobTitleInputChange(event) {
    this.setState({jobTerm: event.target.value});
  }

  onLocationInputChange(event) {
    this.setState({locationTerm: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchJobs(this.state.jobTerm, this.state.locationTerm);
    this.props.push('/results');
    this.setState({
      jobTerm: '',
      locationTerm: '' 
    });
  }

  render() {
    return (
      //id="searchForm"
      <form className="container" id="searchForm" onSubmit={this.onFormSubmit}>
        <div id="box">
          <div id="container-3">

            <div className="row">
              <input 
                id="search" 
                className="five columns"
                type="search" 
                results="4" 
                placeholder="Job"
                value={this.state.jobTerm}
                onChange={this.onJobTitleInputChange} />
              
              <input 
                id="searchLocation"
                className="five columns"
                type="search"
                results="4"
                placeholder="City"
                value={this.state.locationTerm}
                onChange={this.onLocationInputChange} />
              <button className="two columns" id="jobSearchSubmitBtn" type="submit">Submit</button>
            </div>
          </div>

        </div>
      </form>
    );
  }
};


let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchJobs, push }, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchBar);
