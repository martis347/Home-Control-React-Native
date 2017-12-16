export const updateState = data => {
  return setTimeout(() => {
    console.log('Sending to Server: ');
    console.log(data);
  }, 100);
};

export default ApiService = {
  updateState
};
