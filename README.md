# Unicam

## Install Jitsi Videobridge
```sh
wget https://download.jitsi.org/jitsi-videobridge/linux/jitsi-videobridge-linux-{arch-buildnum}.zip
unzip jitsi-videobridge-linux-{arch-buildnum}.zip
```

Install JRE if missing:
```
apt-get install default-jre
```

_NOTE: When installing on older Debian releases keep in mind that you need JRE >= 1.7._

In the user home that will be starting Jitsi Videobridge create `.sip-communicator` folder and add the file `sip-communicator.properties` with one line in it:
```
org.jitsi.impl.neomedia.transform.srtp.SRTPCryptoContext.checkReplay=false
```

Start the videobridge with:
```sh
./jvb.sh --host=localhost --domain=jitsi.example.com --port=5347 --secret=YOURSECRET1 &
```

Options can be:
```sh
--secret - sets the shared secret used to authenticate to the XMPP server
--domain - sets the XMPP domain (default: none)
--min-port - sets the min port used for media (default: 10001)
--max-port - sets the max port used for media (default: 20000)
--host - sets the hostname of the XMPP server (default: domain, if domain is set, \"localhost\" otherwise)
--port - sets the port of the XMPP server (default: 5275)
--subdomain - sets the sub-domain used to bind JVB XMPP component (default: jitsi-videobridge)
--apis - where APIS is a comma separated list of APIs to enable. Currently supported APIs are 'xmpp' and 'rest'. The default is 'xmpp'.
```
Or autostart it by adding the line in `/etc/rc.local`:
```sh
/bin/bash /root/jitsi-videobridge-linux-{arch-buildnum}/jvb.sh --host=localhost --domain=jitsi.example.com --port=5347 --secret=YOURSECRET1 </dev/null >> /var/log/jvb.log 2>&1
```