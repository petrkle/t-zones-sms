phantom.injectJs(require('system').env["HOME"]+'/.jquery.js');

var casper = require('casper').create({
	verbose: true,
	logLevel: "info"
});

casper.userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.63 Safari/537.31');

casper.start('https://www.t-mobile.cz', function() {
		this.mouseEvent('mouseover', '.nav-last');
});

casper.then(function() {
	var conf = jQuery.parseJSON(require('fs').read(require('system').env["HOME"]+'/.t-zones.json'));
  this.fill('form[action="https://www.t-mobile.cz/.gang/login-url/portal"]', { username: conf.login, password: conf.password }, true);
});

casper.then(function() {
	this.open('https://sms.client.tmo.cz/closed.jsp');
});

casper.then(function() {
    this.fill('form[action="#"]', { recipients: casper.cli.get("tel"), text: casper.cli.get("msg")}, true);
});

casper.run();
