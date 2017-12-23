import ReconnectingWebSocket from 'reconnecting-websocket';
import Data from '../data';

const rws = new ReconnectingWebSocket(Data.websocketPath + 'radio');
const connection = {
  open: false,
  listeners: []
};

const updateState = data => {
  if(connection.open) {
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

const connectionChanged = () => {
  connection.listeners.forEach(l => l.onConnectionChanged(connection.open));
}

rws.onopen = e => {
  connection.open = true;
};

rws.onerror = e => {
  console.log(e.message);
  connectionChanged();
};

rws.onclose = e => {
  connection.open = false;
  connectionChanged();
  console.log(e.code, e.reason);
};

rws.onmessage = m => {
  connection.open = true;
  connectionChanged();

  connection.listeners.forEach(l => {
    const message = JSON.parse(m.data);
    l.onMessage(message)
  });
};

export default ApiService = {
  updateState,
  addConnectionListener,
  removeConnectionListener
};
