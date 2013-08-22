var home = 'HOME';

if(require('system').env["USERPROFILE"]){
	home = 'USERPROFILE';
}

var settingsfile = require('system').env[home]+'/.t-zones.json';
var jqueryfile = require('system').env[home]+'/.jquery.js';

phantom.injectJs(jqueryfile);

var casper = require('casper').create({
	verbose: true,
	logLevel: 'info',
  pageSettings: { loadImages: false, loadPlugins: false	}
});

casper.start('https://www.t-mobile.cz');

casper.then(function() {
		this.mouseEvent('mouseover', '.nav-last');
});

casper.then(function() {
	if(typeof jQuery === 'undefined'){
     this.echo('jQuery not loaded! Check ' + jqueryfile, 'ERROR');
		 this.exit();
	}
	var conf = jQuery.parseJSON(require('fs').read(settingsfile));
  this.fill('form[action="https://www.t-mobile.cz/.gang/login-url/portal"]',
		{ username: conf.login, password: conf.password },
	 	 true);
});

casper.then(function() {
	if (!this.exists('.ico-person-small-green-filled')) {
     this.echo('Login to t-zones failed! Check ' + settingsfile, 'ERROR');
		 this.exit();
  }
});

casper.then(function() {
	this.open('https://sms.client.tmo.cz/closed.jsp');
});

casper.then(function() {
    this.fill('form[action="#"]',
			{ recipients: casper.cli.get("tel"), text: casper.cli.get("msg")},
			 true);
});

casper.then(function() {
	if (this.exists('.text-green')) {
		this.echo(this.fetchText('.text-green'));
	}else{
     this.echo('Sending message failed!', 'ERROR');
		 exit();
	}
});

casper.run();
