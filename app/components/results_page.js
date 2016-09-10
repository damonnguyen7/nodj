import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

import Banner from './banner_component';
import DataDiagram from './diagram_component';
import GMap from './google_map_component';
import JobList from '../containers/job_list_container';
import JobDetail from '../containers/job_detail_container';
import SearchBar from '../containers/search_bar_container';
import Footer from './footer_component';
import RetaurantList from '../containers/restaurant_list_container';
import TransportationList from '../containers/transportation_list_container';
import AmenitiesList from '../containers/ameneties_list_container';
import { selectJob, fetchYelp, fetchTrains, fetchBus, fetchGyms, fetchParks, scrapDetail, loading } from '../actions/index';


class Results extends Component {
  constructor(props) {
    super(props);

    this.initJob = this.initJob.bind(this);
  }

  // Lifecycle method:
  componentDidUpdate(nextProps) {
    if (this.props.jobs.length) {
     this.initJob(this.props.jobs[0]);
    }
  }

  // Primary callback used in aggregation of the `results_page` display view:
  initJob(job) {
    let props = this.props;

    props.loading(false);
    props.selectJob(job);
    props.fetchYelp(job.city, job.latitude, job.longitude);
    props.fetchTrains(job.latitude, job.longitude);
    props.fetchBus(job.latitude, job.longitude);
    props.fetchParks(job.latitude, job.longitude);
    props.fetchGyms(job.latitude, job.longitude);
    props.scrapDetail(job.url);
  }

  render() {
    return (
      <div>
        <Banner />        

        <div id="jobMain">
          <div id="jobResultsPane">
            <div>
              <GMap />
            </div>
            <JobList />
          </div>
            
          <div id="jobInfoBody">           
            <JobDetail /> 
            <Tabs onSelect={ this.handleSelect }>  
              <TabList>
                <Tab>
                  {[
                    <i className='fa fa-bus' aria-hidden='true' key='bus_Icon'></i>,
                    `\tTransportation`
                  ]}
                </Tab>
                <Tab>
                  {[
                    <i className='fa fa-futbol-o' aria-hidden='true' key='soccer-ball_Icon'></i>,
                    `\tAmenities`
                  ]}
                </Tab>
                <Tab>
                  {[
                    <i className='fa fa-yelp' aria-hidden='true' key='Yelp_Icon'></i>,
                    `\tYelp`
                  ]}
                </Tab>
              </TabList>

              <TabPanel>
                <TransportationList />
              </TabPanel>
              <TabPanel>
                <AmenitiesList />
              </TabPanel>
              <TabPanel>
                <RetaurantList />
              </TabPanel>
            </Tabs>
          </div>
        </div>

      </div>
    );
  }
};


let mapStateToProps = (state) => ({ 
  jobs: state.jobs 
});

let mapDispatchToProps = (dispatch) =>  { 
  return bindActionCreators({ 
    selectJob, 
    fetchYelp,
    fetchBus, 
    fetchTrains, 
    fetchParks, 
    fetchGyms,
    scrapDetail,
    loading
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);


// <Tab>
//   {[
//     <i className="fa fa-yelp" aria-hidden="true" key="Yelp_Icon"></i>,
//     `\tYelp`
//   ]}
// </Tab>
// <Tab>
//   {[
//     <i className="fa fa-yelp" aria-hidden="true" key="Yelp_Icon"></i>,
//     `\tYelp`
//   ]}
// </Tab>