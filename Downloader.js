var fs = require('fs');
var request = require('request');

module.exports = function Downloader(urls, apiKey) {
	
	return Promise.all(urls.filter(validURL).map(downloadAndSave));

	function validURL(url) {
		return url.startsWith('http');
	}


	function downloadAndSave(url) {
	
		var urlInfo = parseURL(url);

		console.log(urlInfo);
		
		return getPhotoInfo(urlInfo.id)
			.then(parseBody)
			.then(extractImageURL)
			.then(downloadImage)
			.then((res) => {
				console.log('done', url);
				return url;
			});

	}


	function parseURL(url) {
		var parts = url.split('/');
		var filename;
		var id;

		if(url.match(/statickflickr\.com/)) {
			filename = parts[4];
			id = filename.substring(0, filename.indexOf('_'));
		} else {
			id = parts[5];
		}

		return { filename, id };
	}


	function getPhotoInfo(id) {
		var endPoint = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + apiKey + "&photo_id=" + id + "&format=json&nojsoncallback=1";

		console.log(endPoint);

		return promiseRequest(endPoint);
	}

	function parseBody(text) {
		return new Promise((ok, fail) => {
			ok(JSON.parse(text));
		});
	}

	function extractImageURL(photoInfo) {
		return new Promise((ok, fail) => {
			var imageURL;
			var photo = photoInfo.photo;

			console.log(photoInfo);

			if(photo.originalsecret) {
				imageURL = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.originalsecret + "_o";

				imageURL += '.' + photo.originalformat;
				ok(imageURL);
			} else {
				// should guess sizes and wait until that is resolved to resolve
				fail('Not implemented yet');
			}
		});
	}

	function downloadImage(url) {
		return promiseRequest(url, { encoding: null }).then((res) => {
			var parts = url.split('/');
			var filename = parts.pop();
			fs.writeFileSync(filename, res);
			return('Downloaded ', url, res.length);
		});
	}

	function promiseRequest(url, options) {
		if(!options) {
			options = {};
		}

		options.url = url;

		return new Promise((ok, fail) => {
			request(options, (error, response, body) => {
				if(!error && response.statusCode == 200) {
					ok(body);
				} else {
					fail({ error, response });
				}
			});
		});

	}

};
