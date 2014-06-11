Posílání SMS zpráv přes t-zones.cz z příkazové řádky.

Požadavky
=========

- http://phantomjs.org
- http://casperjs.org

Instalace
=========

	cd "$HOME"
	git clone https://github.com/petrkle/t-zones-sms.git
	wget -O .jquery.js http://code.jquery.com/jquery-1.9.1.min.js
	cp t-zones-sms/t-zones.json .t-zones.json
	vim .t-zones.json

Ve Windows nahraďte proměnou $HOME za %userprofile%.

Použití
=======

	casperjs t-zones.js --tel=123456789 --msg="Vaše SMS zpráva"
