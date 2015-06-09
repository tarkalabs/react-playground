import React from "react";
import {setParamsFromRoute} from '../stores/app_state';
import {getCurrentDriver} from '../stores/drivers_store';

export default class TripsComponent extends React.Component {
  constructor(){
    super();
  }

  componentWillReceiveProps(nextProps){
    setParamsFromRoute(nextProps.params);
  }

  render() {
    var driver = getCurrentDriver().deref();
    return (
      <p>Trips for {driver.get('name')}</p>
    );
  }
};
