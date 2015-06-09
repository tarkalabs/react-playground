const immstruct = require("immstruct");
import Immutable from 'immutable';
const appState = immstruct({state: Immutable.fromJS({})});
export default appState;
window.appState = appState;

export function setParamsFromRoute(params) {
  if(params.driverId) {
    appState.cursor(['state','currentDriverId']).update(function(val) {
      return params.driverId;
    });
  }
}
