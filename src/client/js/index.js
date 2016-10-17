'use strict';


if ("WebSocket" in window && navigator.mediaDevices.getUserMedia) {
	// Let us open a web socket
	let container = document.querySelector('div#video');
	let ws = new WebSocket('wss://localhost:3000');
	var pc = new RTCPeerConnection( { 'iceServers': [ {'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'} ] } );

	// once remote stream arrives, show it in the remote video element
	pc.ontrack = function(e) {
		// create video element and set remote video stream as source
		let video = document.createElement('video');
    video.setAttribute('autoplay', 'autoplay');
    video.setAttribute('src', URL.createObjectURL(e.stream));

		// append video element to the body element
		container.appendChild(video);
	};

	// Web Socket is connected, send data using send()
	ws.onopen = function() {
		console.log('Connected to WebSocket.')
	};

	// When message recieved 
	ws.onmessage = function(e) { 
		pc.setRemoteDescription(JSON.parse(e.data);
		pc.createAnswer((desc) => {
			
		});
	};

	// websocket is closed.
	ws.onclose = function() { 
		console.log('Connection is closed...'); 
	};

	//
	navigator.mediaDevices.getUserMedia({ 'audio': false, 'video': true })
		.then((stream) => {
	    let video = document.createElement('video');
	    video.setAttribute('autoplay', 'autoplay');
	    video.setAttribute('src', URL.createObjectURL(stream));
	    container.appendChild(video);
	    pc.addStream(stream);

	    pc.createOffer((desc) => {
  			pc.setLocalDescription(desc);
  			ws.send(JSON.stringify(desc));
  		});

	   //  pc.createOffer( function(offer) {
		  //   pc.setLocalDescription(new RTCSessionDescription(offer), function() {
	   //      ws.send(JSON.stringify( { "sdp": offer } ) );
	   //    }, 
	   //    function(error) { 
	   //      console.log(error);
	   //    }
    // 	)}, function(error) { 
	   //  	console.log(error);
	  	// });
	  })
  	.catch((error) => { 
  		console.log(error);
  	});

  function initiateSession() {

  }




	// let localVideoElem = null, 
	// 	remoteVideoElem = null, 
	// 	localVideoStream = null,
 //    videoCallButton = null, 
 //    endCallButton = null,
 //    peerConn = null,
    
    
	// function pageReady() {
	    // videoCallButton = document.getElementById("videoCallButton");
	    // endCallButton = document.getElementById("endCallButton");
	    // localVideo = document.getElementById('localVideo');
	    // remoteVideo = document.getElementById('remoteVideo');
	    // videoCallButton.removeAttribute("disabled");
	    // videoCallButton.addEventListener("click", initiateCall);
	    // endCallButton.addEventListener("click", function (evt) {
	    //   ws.send(JSON.stringify({"closeConnection": true }));
	    // });
	// };


	// run start(true) to initiate a call
	// function initiateCall() {
	//   prepareCall();
	//   // get the local stream, show it in the local video element and send it
	//   navigator.getUserMedia({ "audio": false, "video": true }, function (stream) {
	//     localVideoStream = stream;
	//     localVideo.src = URL.createObjectURL(localVideoStream);
	//     peerConn.addStream(localVideoStream);
	//     createAndSendOffer();
	//   }, function(error) { console.log(error);});
	// };

	// function answerCall() {
	//   prepareCall();
	//   // get the local stream, show it in the local video element and send it
	//   navigator.getUserMedia({ "audio": false, "video": true }, function (stream) {
	//     localVideoStream = stream;
	//     localVideo.src = URL.createObjectURL(localVideoStream);
	//     peerConn.addStream(localVideoStream);
	//     createAndSendAnswer();
	//   }, function(error) { console.log(error);});
	// };

	// ws.onmessage = function (evt) {
	//   var signal = null;
	//   if (!peerConn)
	//     answerCall();
	//   signal = JSON.parse(evt.data);
	//   if (signal.sdp) {
	//     peerConn.setRemoteDescription(new RTCSessionDescription(signal.sdp));
	//   }
	//   else if (signal.candidate) {
	//     peerConn.addIceCandidate(new RTCIceCandidate(signal.candidate));
	//   } else if ( signal.closeConnection){
	//     endCall();
	//   }
	// };

	// function createAndSendOffer() {
	//   peerConn.createOffer(
	//     function (offer) {
	//       var off = new RTCSessionDescription(offer);
	//       peerConn.setLocalDescription(new RTCSessionDescription(off), 
	//         function() {
	//           ws.send(JSON.stringify({"sdp": off }));
	//         }, 
	//         function(error) { 
	//           console.log(error);
	//         }
	//       );
	//     }, 
	//     function (error) { 
	//       console.log(error);
	//     }
	//   );
	// };

	// function createAndSendAnswer() {
	//   peerConn.createAnswer(
	//     function (answer) {
	//       var ans = new RTCSessionDescription(answer);
	//       peerConn.setLocalDescription(ans, function() {
	//           wsc.send(JSON.stringify({"sdp": ans }));
	//         }, 
	//         function (error) { 
	//           console.log(error);
	//         }
	//       );
	//     },
	//     function (error) { 
	//       console.log(error);
	//     }
	//   );
	// };

} else {
	// The browser doesn't support WebSocket
	console.log("WebSocket NOT supported by your Browser!");
}