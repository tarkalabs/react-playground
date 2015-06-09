const React = require('react');
import appState from '../stores/app_state';

import {Link,RouteHandler} from "react-router";

class Driver extends React.Component {
  render(){
    var driver = this.props.driver.deref();
    return <div><Link to="driver" params={{driverId: driver.get('id')}}>{driver.get('name')}</Link></div>;
  }
}
export default class DriversComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    var drivers = appState.cursor(['state','drivers']);
    return (
      <div>
        {drivers.toArray().map((driver) => <Driver driver={driver} key={driver.deref().get('id')}/>)}
        <RouteHandler/>
      </div>
    );
  }
};
