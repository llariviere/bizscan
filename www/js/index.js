/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
                
        var GeoLoc = document.getElementById('GeoLoc');
        GeoLoc.addEventListener('click', couac, false);
        
    }
};


var couac = function() {
	console.log('Shake IT')
	shake.startWatch(onShake, 90);
}

function onShake() {
	alert("Arrete de shaker!");
	shake.stopWatch();
}

var couac3 = function() {
	console.log("QRScanner!!! = ");
	
	console.log(QRScanner);
	
	QRScanner.prepare(QRonDone);
	
	/*
	cordova.plugins.QRScanner.getStatus(function(status){
	  console.log(status);
	});
	*/
	var thebody = parentElement.querySelector('body');
	thebody.setAttribute('style', 'background:transparent;');
	
	var thehtml= parentElement.querySelector('html');
	thehtml.setAttribute('style', 'background:transparent;');
	
	QRScanner.scan(displayContents);
	QRScanner.show(function(status){
	  console.log(status);
	});
	console.log("QRScanner encore!!!")	
}

function QRonDone(err, status) {
  if (err) {
   // here we can handle errors and clean up any loose ends.
   console.error(err);
  }
  if (status.authorized) {
    // W00t, you have camera access and the scanner is initialized.
    // QRscanner.show() should feel very fast.
  } else if (status.denied) {
   // The video preview will remain black, and scanning is disabled. We can
   // try to ask the user to change their mind, but we'll have to send them
   // to their device settings with `QRScanner.openSettings()`.
  } else {
    // we didn't get permission, but we didn't get permanently denied. (On
    // Android, a denial isn't permanent unless the user checks the "Don't
    // ask again" box.) We can ask again at the next relevant opportunity.
  }
	
}

function displayContents(err, text){
  if(err){
    // an error occurred, or the scan was canceled (error code `6`)
    console.log(err.name)
  } else {
    // The scan completed, display the contents of the QR code:
    alert(text);
  }
}


var couac2 = function() {
	cordova.plugins.barcodeScanner.scan(
	  function (result) {
	    if(!result.cancelled)
	    {
	      alert("Barcode type is: " + result.format);
	      alert("Decoded text is: " + result.text);
	    }
	    else
	    {
	      alert("You have cancelled scan");
	    }
	  },
	  function (error) {
	      alert("Scanning failed: " + error);
	  }
   );
}





















function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}
function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

    }, onErrorResolveUrl);
}


var openCamera = function() {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    //var func = createNewFileEntry;
    var selection = "camera-thmb";

    if (selection == "camera-thmb") {
        options.targetHeight = 100;
        options.targetWidth = 100;
    }

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
			
        // Do something
        console.log(imageUri)

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function onBatteryStatus(status) {
    alert("Level: " + status.level + "\nisPlugged: " + status.isPlugged);
}

var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
var geolocation = function () {
 	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

 var onSuccess = function(position) {
     alert('Latitude: '          + position.coords.latitude          + '\n' +
           'Longitude: '         + position.coords.longitude         + '\n' +
           'Altitude: '          + position.coords.altitude          + '\n' +
           'Accuracy: '          + position.coords.accuracy          + '\n' +
           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
           'Heading: '           + position.coords.heading           + '\n' +
           'Speed: '             + position.coords.speed             + '\n' +
           'Timestamp: '         + position.timestamp                + '\n');
 };

 // onError Callback receives a PositionError object
 //
 function onError(error) {
     alert('code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n');
 }