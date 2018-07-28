const websocketPath = 'ws://192.168.31.246:3001/ws/';

const getSliders = () => [
  [{ title: 'Ryškumas', value: 10, id: 1 }],
  [{ title: 'Raudona', value: 10, id: 11 }, { title: 'Žalia', value: 10, id: 12	}, { title: 'Mėlyna', value: 10, id: 13 }],
  [{ title: 'Ryškumas', value: 10, id: 21 }, { title: 'Greitis', value: 10, id: 22 }]
];

const getCheckboxes = () => [{
    title: 'Balta',
    id: 0
  }, {
    title: 'RGB',
    id: 1
  }, {
    title: 'Vaivorykštė',
    id: 2
  }
];

const getAudios = () => [{
  title: 'M-1',
  id: 'm1'
}, {
  title: 'Power Hit Radio',
  id: 'phr'
}];

export default Data = {
  getSliders,
  getCheckboxes,
  getAudios,
  websocketPath
}
