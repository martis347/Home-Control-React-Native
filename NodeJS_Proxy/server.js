const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('static'));

app.post('api/:a?/:b?/:c?/:d?/:e?', (req, resp) => {
	let request = '';
	request += req.params.a ? '/' + req.params.a : '';
	request += req.params.b ? '/' + req.params.b : '';
	request += req.params.c ? '/' + req.params.c : '';
	request += req.params.d ? '/' + req.params.d : '';
	request += req.params.e ? '/' + req.params.e : '';
	console.log(request);
	
	return axios.get('http://78.63.201.236:3001' + request)
		.then(r => {
			return resp.send(r.data);
		})
		.catch(r => {
			return resp.status(r.response.status).send({
				data: r.response.data
			});
		});
});

app.listen(process.env.port || 3005);