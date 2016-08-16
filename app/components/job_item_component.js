import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class JobItem extends Component {

  parseAndFormatJobTitle(job) {
    return job
      .split(' ')
      .reduce((memo, index) => memo += `${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `, '')
      .trim();
  }

  parseAndFormatDaysSincePosted(days) {
    return days
      .match(/(\w+){1,}/gmi)
      .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
      .join(' ');
  }

  render() {
    return (
      <div>
      <li id="jobLI" onClick={() => this.props.jobFunc(this.props.job) }>
          <h4>{ this.parseAndFormatJobTitle(this.props.job.jobtitle) }</h4>
          <div id="jobLI_MetaInfo">
            <h5
            >{this.props.job.company || 'Unlisted'}</h5
            >
            <i className="daysSincePosted">{ this.parseAndFormatDaysSincePosted(this.props.job.formattedRelativeTime) }</i>
          </div>
        </li>
        <hr />
      </div>
    );
  }
}

// console.log(`Active Job: ${this.props.jobFunc(this.props.job)}`)
