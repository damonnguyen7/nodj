import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestaurantItem from '../components/restaurant_item_component';


class RetaurantList extends Component {
  renderList() {
    return this.props.activeYelp.map((restaurant) => {
      return (
        <RestaurantItem
          key = { restaurant.id }
          restaurant = { restaurant }
        />
        );
    });
  }

  render() {
    return (
      <div id="restaurantContainer">
        <div>
          <h3>Nearby Eats</h3>
          <i className="fa fa-yelp" aria-hidden="true"></i>
        </div>
        <ul className="restaurantList">
          { this.renderList() }
        </ul>
      </div>
    ); 
  }
}

let mapStateToProps = (state) => ({ activeYelp: state.activeYelp });

export default connect(mapStateToProps)(RetaurantList);
