require("!style!css!less!./styles/app.less");
const React = require("react");
import DriversComponent from "./components/drivers_component";
import TripsComponent from "./components/trips_component";
import appState from "./stores/app_state";
import Router, {Route, Redirect} from "react-router";
var routes = (
  <Route name="app" path="/" handler={Layout}>
    <Route name="drivers" path="drivers" handler={DriversComponent}>
      <Route name="driver" path=":driverId" handler={TripsComponent}/>
    </Route>
    <Redirect from="/" to="/drivers"/>
  </Route>
);
class Layout extends React.Component {
  render(){
    return (
      <div>
        <h2>Test app</h2>
        <RouteHandler/>
      </div>
    );
  }
}
var AppHandler=null;
const render = () => {
  console.log(appState);
  React.render(
    <div>
      <AppHandler/>
    </div>,
  document.getElementById("root"));
};

Router.run(routes,function(Handler, state){
  console.log("Route updated");
  if(state.params.driverId) {
    console.log(state);
    appState.cursor(['state','currentDriverId']).update(function(val) {
      return state.params.driverId;
    });
  }
  AppHandler = Handler
  render();
});
appState.on("swap", render);
window.appState = appState;
