var fs = require('fs');
var ArgParse = require('argparse').ArgumentParser;
var Downloader = require('./Downloader');

var parser = new ArgParse({
	description: 'Downloads pictures non-interactively'
});

parser.addArgument(
	['--file'],
	{
		help: 'Path to file containing flickr picture urls, one per line',
		default: 'urls.txt'
	}
);

parser.addArgument(
	['--api-key'],
	{
		help: 'Your Flickr API key. Get one at https://www.flickr.com/services/developer/api/'
	}
);

var args = parser.parseArgs();

console.log(args);

var config = {};

if(fs.existsSync('config.json')) {
	config = require('./config.json');
}

var apiKey = args.api_key || config.api_key;

var urls = readURLsFrom(args.file);

Downloader(urls, apiKey).then((res) => {
	console.log('End!');
	console.log(res);
}).catch(function(horror) {
	console.error("Something terrible happened");
	console.error(horror);
	throw(horror);
});

function readURLsFrom(fileName) {
	var urls = [];

	if(fs.existsSync(fileName)) {
		var urlsData = fs.readFileSync(fileName, 'utf-8');
		urls = urlsData.split('\n').filter(notEmpty);
	} else {
		console.error(fileName, 'does not exist');
	}

	return urls;
}

function notEmpty(str) {
	return str.length > 0;
}
