# flickr-downloader

> Downloads a series of pictures from Flickr using the command line

This is meant to be an emergency procedure in case you've been logged out of your old account with the move from Gmail/Facebook logins to just Yahoo! logins, but want to recover your pictures (because they are *yours*).

## How to use

First you need to get a copy of this script in your computer. You can clone or download a zip.

You will also need to have access to the command line or terminal (depends on which operating system you use). The commands are meant to be typed in a terminal.

### To `clone`:

```bash
git clone https://github.com/possers/flickr-downloader.git
```

You will need to have [git](https://git-scm.com/) installed. Instructions to install git will depend on your system. Alternatively, download the ZIP as detailed below:

### To `download`

You can download the zip here: https://github.com/possers/flickr-downloader/archive/master.zip

Then uncompress it (perhaps double clicking on the ZIP file) and go to the folder where the files were uncompressed, using your terminal. If it was uncompressed to `flickr-downloader` then use that name:

```bash
cd flickr-downloader
```

Or if it was uncompressed to `master`, then:

```bash
cd master
```

etc...

If you choose the cloning path, it will be easier to get updates (if there are any in the future) by running `git pull origin`, but both ways are valid to get started.

Once you're in the `flickr-downloader` directory you'll need to install the dependencies (i.e. stuff this script needs to work). You'll need to have a recent version of node.js installed in your system. If you don't have it, you can download one from [the node.js website](https://nodejs.org/) and install it.

When you have node in your computer, type this to install the dependencies:

```bash
npm install
```

Then create a text file with your favourite text editor (an easy one is [Atom](https://atom.io/) which is also free to download) and copy and paste the url of each picture in a separated line (a url is the address in your browser bar, starting with `http`). Save the file, for example to `urls.txt`.

If you have many pictures it might be better to generate the `urls.txt` file by automated means (i.e. not by hand).

Finally, to run the script, type the following, but replacing "API_KEY" with your own API key from Flickr:

```bash
node main.js --file=urls.txt --api-key=API_KEY
```

You can get an API key at Flickr's developer site: https://www.flickr.com/services/developer/api/

Downloading all the pictures will take some time. It depends on how many pictures you have, the speed of your connection, the size of the pictures, etc.

Once the process is finished, you will find the pictures and a file called `downloaded-pictures.json` in the same folder. The JSON file contains metadata about the pictures, which you can use to insert them into your own self-hosted service, e.g. the picture title, etc.

Not very elegant, but it works. Remember to move the downloaded data to a safe place!

## config.json

You can also have a configuration file to avoid having to re-enter the API key each time you call the script. You can use the  `config-example.json` file as a guide. Duplicate it and save it as `config.json`, then edit the contents to use your own key instead of the placeholder content. Make sure you don't delete the quotes, commas, etc. or the file won't work!

If there is a `config.json` file, the script will try to read the key from there if it hasn't been provided using the `--api-key` parameter.

The script will **not** work without an API key.

## Inspiration and credits

Many thanks to Jason Ting, author of the [Flickr Original](https://addons.mozilla.org/en-US/firefox/addon/flickr-original-10049/) Firefox extension as I learnt a lot looking at its code.

## Unmaintained

This script is likely incomplete in the types of pictures and urls it can handle. I made it for my personal use, and as they say, your mileage may vary. I cannot provide support for this script, but I'm sharing it in the hope that it is useful for someone else. If you have an issue, I encourage you to try and find the solution yourself, or get in touch with a developer that can help you (I can't).

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
