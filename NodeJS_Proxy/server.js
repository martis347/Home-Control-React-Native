const axios = require('axios');
const express = require('express');
const cors = require('cors');
const moment = require('moment');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const controllerUrl = 'http://178.16.37.145:3001';

app.post('/api/:a?/:b?/:c?/:d?/:e?', (req, resp) => {
	let requestPromise;
	if (req.body.controller) {
		controller = req.body.controller;
		data = req.body.data;
		requestPromise = axios.post(`${controllerUrl}/${req.body.controller}`, req.body.data);
		console.log(`Controller: ${req.body.controller}`);
		console.log(`Data: ${JSON.stringify(req.body.data)}`);
	} else {
		let request = '';
		request += req.params.a ? '/' + req.params.a : '';
		request += req.params.b ? '/' + req.params.b : '';
		request += req.params.c ? '/' + req.params.c : '';
		request += req.params.d ? '/' + req.params.d : '';
		request += req.params.e ? '/' + req.params.e : '';
		requestPromise = axios.get(controllerUrl + request);
		console.log(request);
	}

	return requestPromise
		.then(r => {
			return resp.send(r.data);
		})
		.catch(r => {
			console.log('Failed', r.response.data);
			return resp.status(400).send({
				data: r.response.data
			});
		});
});

app.get('/api/weather', async (req, resp) => {
	const daysOfWeek = ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'];
	const { data } = await axios.get('https://api.darksky.net/forecast/3e3a24a1e579b33cf401b4a69f4ad990/54.927689,23.949363?units=si');
	const hourlyWeather = data.hourly.data.map(d => ({
		id: d.time,
		hour: moment.utc(d.time * 1000).add(3, 'hours').get('hours'),
		temperature: d.apparentTemperature,
		rainProbability: d.precipProbability * 100,
	}));

	const dailyWeather = data.daily.data.map(d => ({
		id: d.time,
		day: daysOfWeek[moment.utc(d.time * 1000).add(3, 'hours').get('day')],
		icon: d.icon,
		lowTemp: Math.round(d.temperatureLow),
		highTemp: Math.round(d.temperatureHigh),
	}));

	const currentWeather = {
		icon: data.currently.icon,
		summary: data.currently.summary,
		apparentTemperature: Math.round(data.currently.apparentTemperature),
	};

	return resp.json({
		hourly: hourlyWeather,
		daily: dailyWeather,
		current: currentWeather,
	});
});

app.listen(process.env.port || 3005);