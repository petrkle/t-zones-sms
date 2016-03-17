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

casper.userAgent('Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36');

casper.start('https://www.t-mobile.cz/osobni');

casper.then(function() {
		this.click(xpath('//a[text()="Přihlásit"]'));
});

casper.then(function() {
	this.waitForText('Uživatelské jméno', function(){
	if(typeof jQuery === 'undefined'){
     this.echo('jQuery not loaded! Check ' + jqueryfile, 'ERROR');
		 this.exit();
	}
	var conf = jQuery.parseJSON(require('fs').read(settingsfile));
  this.fill('form[action="https://www.t-mobile.cz/.gang/login"]',
		{ username: conf.login, password: conf.password },
	 	 true);
	});
});

casper.then(function() {
	casper.waitForSelector(xpath('//a[text()="Odhlásit"]'), function then() {
			this.echo("Logout link: OK");
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
			this.echo("Login: " + this.fetchText(xpath('//p[@class="user-info"]/span')));
});

casper.then(function() {
    this.fillSelectors('form[action="/sms/closed.jsp"]',
			{ 'input[name="recipients"]': casper.cli.get("tel"),
				'textarea[name="text"]': casper.cli.get("msg")
			},
			 true);
});

casper.then(function() {
	if (this.exists('.background-green')) {
		this.echo(this.fetchText('.background-green'));
	}else{
		 this.echo(this.fetchText('.background-red'), 'ERROR');
		 this.exit();
	}
});

casper.run();
