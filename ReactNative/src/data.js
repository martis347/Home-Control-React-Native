const getSliders = () => [
  [{ title: 'Ryškumas', value: 50, id: 1 }],
  [{ title: 'Raudona', value: 50, id: 11 }, { title: 'Žalia', value: 50, id: 12	}, { title: 'Mėlyna', value: 50, id: 13 }],
  [{ title: 'Ryškumas', value: 50, id: 21 }, { title: 'Greitis', value: 10, id: 22 }]
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

export default Data = {
  getSliders,
  getCheckboxes
}
