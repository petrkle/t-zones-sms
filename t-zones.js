var home = 'HOME';
var xpath = require('casper').selectXPath;

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
		this.click(xpath('//a[text()="Přihlásit"]'));
});

casper.then(function() {
	if(typeof jQuery === 'undefined'){
     this.echo('jQuery not loaded! Check ' + jqueryfile, 'ERROR');
		 this.exit();
	}
	var conf = jQuery.parseJSON(require('fs').read(settingsfile));
  this.fill('form[action="https://www.t-mobile.cz/.gang/login/tzones"]',
		{ username: conf.login, password: conf.password },
	 	 true);
});

casper.then(function() {
	casper.waitForSelector(xpath('//a[text()="Odhlásit"]'), function then() {
			this.echo("Login: " + this.fetchText(xpath('//p[@id="welcome"]/strong')));
			},
		function timeout(){
			 this.echo('Login to t-zones failed! Check ' + settingsfile, 'ERROR');
			 this.exit();
		})
});

casper.then(function() {
		this.click(xpath('//a[text()="Poslat SMS"]'));
});

casper.then(function() {
    this.fillSelectors('form[action="#"]',
			{ 'input[name="recipients"]': casper.cli.get("tel"),
				'textarea[name="text"]': casper.cli.get("msg")
			},
			 true);
});

casper.then(function() {
	if (this.exists('.text-green')) {
		this.echo(this.fetchText('.text-green'));
	}else{
     this.echo('Sending message failed!', 'ERROR');
		 this.exit();
	}
});

casper.run();
