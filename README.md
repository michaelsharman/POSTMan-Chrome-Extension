#Postman-LN
Postman-LN is a fork of [Postman](https://github.com/a85/POSTMan-Chrome-Extension) for [Learnosity](http://www.learnosity.com) to cover very specific requirements. It  builds upon the great work done by the Postman team, the addition is around *signing* each request so the server side component can check for a security signature and also to ensure that the request variables haven't been tampered with.

##Installation
Because this is simply a fork from Postman and not an actual app in the Chrome web store, you must clone this repo locally and then install manually to Chrome as an extension.

###git clone
```
git clone git@github.com:michaelsharman/POSTMan-Chrome-Extension.git ./postman-ln
```

###Add to Chrome
Open a new Chrome tab, click on the customise Chrome icon and go to ```Tools->Extensions```

Check the *Developer mode* checkbox, then click the *Load unpacked extension…* button.

Navigate to the ```postman-ln/chrome``` folder and click *select*.

That's it! In any new tab you'll see *Postman-LN* as an app/extension. Open it up and import your [environments and collections](https://github.com/Learnosity/data/tree/develop/docs/testHarness/postman).

##Request Envelope
The server side component expects something like the following sample envelope to be sent for each request:

```
{
  "security": {
    "consumer_key": "ABC123",
    "domain": "localhost",
    "timestamp": "20130719-2030",
    "signature": "908c855ac2b52772add2b94e36f1f2eaa7c30c343f6be851acfa50bfaabc6699"
  },
  "request": {
    "limit": 50
  },
  "action": "get"
}
```

##Request Signing
The addition to Postman is to automatically sign the entire request (using sha256). This is handled by *environments* which contain the security private key used to complete the verifed signature.

Essentially the app combines the relevant *security* keys (in a set order) as well as the stringified *request* packet and *action* value. This is hashed and added to the *security* packet as a signature before sending to the server.

Postman
=======
Postman helps you be more efficient while working with APIs. Postman is a scratch-your-own-itch project. The need for it arose while one of the developers was creating an API for his project. After looking around for a number of tools, nothing felt just right. The primary features added were a history of sent requests and collections.
A number of other features have been added since the initial release. A small list is below. To see a fancier page and a video tutorial, check out http://www.getpostman.com

Features
========

Create requests quickly.

- Compact layout
- HTTP requests with file upload support
- Formatted API responses for JSON and XML
- HATEOS support
- Image previews
- Request history
- Basic Auth and OAuth 1.0 helpers
- Autocomplete for URL and header values
- Key/value editors for adding parameters or header values. Works for URL parameters too.
- Use environment variables to easily shift between settings. Great for testing production, staging or local setups.
- Keyboard shortcuts to maximize your productivity

Document and share APIs.

- Use collections to organize requests.
- Document requests inside collections. You can even store entire HTML notes. Postman uses Bootstrap so you can use it too to style your notes.
- Download and share collections with your team of developers.

For more details checkout the Postman wiki - https://github.com/a85/POSTMan-Chrome-Extension/wiki.

Postman for Chrome can be downloaded from https://chrome.google.com/webstore/detail/fdmmgilgnpjigdojojpjoooidkmcomcm

Postman for Google Chrome is licensed under the Apache Licence, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html).

Installing the zip file
=========================

If you downloaded the Postman zip file here is what you need to do to install it as a developer extension:

1. Go to Tools > Extensions inside Chrome by clicking on the wrench icon on top right.
2. Select "Load unpacked extension"
3. Select the "chrome" folder with manifest.json in it's root
4. Postman will be installed as a developer extension. The installation from the Chrome Web Store will remain independent with all your data.

Building and Developing
=========================
1. Install the dependencies
<pre>
sudo npm install -g grunt grunt-cli
</pre>
2. Generate the template.js and request.js files by running grunt. You can watch the folder for changes using:
<pre>
	grunt watch
</pre>
3. For misc. grunt tasks, look at grunt.js.

Pull requests
=========================

Please send pull requests to the dev branch. The master branch contains the latest code which has been put in production.
