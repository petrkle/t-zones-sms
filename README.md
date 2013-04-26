Posílání SMS zpráv přes t-zones.cz z příkazové řádky.

Požadavky
=========

	http://phantomjs.org/
	http://casperjs.org/

Instalace
=========

	wget -O $HOME/.jquery.js http://code.jquery.com/jquery-1.9.1.min.js
	cp t-zones.json $HOME/.t-zones.json
	vim $HOME/.t-zones.json

Použití
=======

	casperjs t-zones.js --tel=123456789 --msg="Vaše SMS zpráva"
