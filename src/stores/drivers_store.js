import lodash from 'lodash';
import Immutable from 'immutable';
import appState from './app_state';
function generateRandomVehicle() {
  return lodash.sample(['VW Beetle', 'VW Jetta', 'Ford F150', 'Audi A6', 'Toyota Corolla']);
}
function generateTrips(driver) {
  return lodash.range(1,11).map(function(i) {
    return {
      id: driver.id*100 + i,
      tripName: `Trip ${driver.id*100 + i}`,
      score: lodash.sample(['A','B','C','D']),
      events: Math.floor(Math.random()*10)
    }
  });
}
function objectify(collection) {
  var obj = {}
  collection.forEach((item) => { obj[item.id] = item });
  return obj;
}
function generateDriver(n) {
  var driver = {
    id: n,
    name: `Driver ${n}`,
    vehicle: generateRandomVehicle()
  }
  driver.trips = objectify(generateTrips(driver));
  return driver;
}
function generateDrivers() {
  return objectify(lodash.range(1,11).map((i) => generateDriver(i)));
}
export function getCurrentDriver() {
  var currentDriverId = appState.cursor(['state', 'currentDriverId']).deref();
  if(currentDriverId) {
    return appState.cursor(['state','drivers', currentDriverId]);
  }
}
export default function initDriverStore(){
  var drivers=generateDrivers();
  console.log(drivers);
  appState.cursor(['state','drivers']).update(function(val) {
    return Immutable.fromJS(drivers);
  });
};

initDriverStore();
