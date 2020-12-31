const http = require('http');

// function returns a Promise
function getPromise() {
	return new Promise((resolve, reject) => {
		http.get('http://www.usefulangle.com/api?api_key=554545', (response) => {
			let chunks_of_data = [];

			response.on('data', (fragments) => {
				chunks_of_data.push(fragments);
			});

			response.on('end', () => {
				let response_body = Buffer.concat(chunks_of_data);
				resolve(response_body.toString());
			});

			response.on('error', (error) => {
				reject(error);
			});
		});
	});
}

// async function to make http request
async function makeSynchronousRequest(request) {
	try {
		let http_promise = getPromise();
		let response_body = await http_promise;

		// holds response from server that is passed when Promise is resolved
		console.log(response_body);
	}
	catch(error) {
		// Promise rejected
		console.log(error);
	}
}

async function test(){
	console.log(1);

	// anonymous async function to execute some code synchronously after http request
	// wait to http request to finish
	await makeSynchronousRequest();

	// below code will be executed after http request is finished
	console.log(2);
	console.log(3);
	console.log(4);
	console.log(5);
	console.log(6);
	console.log(7);
	console.log(8);
	console.log(9);
	return 10;
}

console.log(test()``);
