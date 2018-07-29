import ReconnectingWebSocket from 'reconnecting-websocket';
import Data from '../data';

const rws = new ReconnectingWebSocket(Data.websocketPath + 'lightning');
const connection = {
  open: false,
  listeners: []
};

const isConnected = () => rws.readyState === rws.OPEN;

const updateState = data => {
  if(isConnected()) {
    rws.send(JSON.stringify(data));
  } else {
    console.error('Connection Closed, unable to send request.');
  }
};

const addConnectionListener = callbacks => {
  connection.listeners.push(callbacks);
};

const removeConnectionListener = callbacks => {
  var index = connection.listeners.indexOf(callbacks);
  if (index > -1) {
    connection.listeners.splice(index, 1);
  }
};

rws.onerror = e => {
  console.log(e.message);
};

rws.onclose = e => {
  console.log(e.code, e.reason);
};

rws.onmessage = m => {
  connection.listeners.forEach(l => {
    const message = JSON.parse(m.data);
    l.onMessage(message)
  });
};

export default ApiService = {
  updateState,
  addConnectionListener,
  removeConnectionListener,
  isConnected
};
