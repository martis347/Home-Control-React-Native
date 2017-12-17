import ReconnectingWebSocket from 'reconnecting-websocket';

const rws = new ReconnectingWebSocket('ws://192.168.31.247:3001/ws/lightning');
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

const addConnectionListener = callback => {
  connection.listeners.push(callback);
};

const connectionChanged = () => {
  connection.listeners.forEach(l => l(connection.open));
}

rws.onopen = () => {
  connection.open = true;
  connectionChanged();
};

rws.onerror = e => {
  console.log(e.message);
};

rws.onclose = e => {
  connection.open = false;
  connectionChanged();
  console.log(e.code, e.reason);
};

export default ApiService = {
  updateState,
  addConnectionListener
};
