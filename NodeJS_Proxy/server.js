const axios = require('axios');
const express = require('express');
const cors = require('cors');
const moment = require('moment');

const app = express();
app.use(cors());

app.post('/api/:a?/:b?/:c?/:d?/:e?', (req, resp) => {
	let request = '';
	request += req.params.a ? '/' + req.params.a : '';
	request += req.params.b ? '/' + req.params.b : '';
	request += req.params.c ? '/' + req.params.c : '';
	request += req.params.d ? '/' + req.params.d : '';
	request += req.params.e ? '/' + req.params.e : '';
	console.log(request);
	
	return axios.get('http://178.16.37.145:3001' + request)
		.then(r => {
			return resp.send(r.data);
		})
		.catch(r => {
			return resp.status(r.response.status).send({
				data: r.response.data
			});
		});
});

app.get('/api/weather', async (req, resp) => {
	const daysOfWeek = ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis']
	const { data } = await axios.get('https://api.darksky.net/forecast/3e3a24a1e579b33cf401b4a69f4ad990/54.927689,23.949363?units=si');
	const hourlyWeather = data.hourly.data.slice(0, 16).map(d => ({
		hour: moment.utc(d.time * 1000).add(3, 'hours').get('hours'),
		temperature: d.apparentTemperature,
		rainProbability: d.precipProbability * 100,
	}));

	const dailyWeather = data.daily.data.slice(0, 7).map(d => ({
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