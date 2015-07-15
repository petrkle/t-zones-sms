Posílání SMS zpráv přes t-zones.cz z příkazové řádky.

Instalace
=========
	sudo npm -g install casperjs
	cd "$HOME"
	git clone https://github.com/petrkle/t-zones-sms.git
	wget -O .jquery.js http://code.jquery.com/jquery-1.11.3.min.js
	cp t-zones-sms/t-zones.json .t-zones.json
	vim .t-zones.json

Ve Windows nahraďte proměnou $HOME za %userprofile%.

Použití
=======

	casperjs t-zones.js --tel=123456789 --msg="Vaše SMS zpráva"

Omezení
=======

Přes web jde poslat max. 50 sms denně.

Když posíláte víc zpráv rychle za sebou, formulář vyžaduje
opsání kódu z obrázku a tento skript selže.
