/*var view = Ti.UI.createView({
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE,
    bottom : 50
});
var view3 = Ti.UI.createView({
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE,
    bottom : 50
});
var button = Ti.UI.createButton({
    title:'  Take Picture  ',
        bottom : 60

});
var button2 = Ti.UI.createButton({
    title:'  Browes Picture  ',
    bottom : 60

});
var imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,
    'downloaded_images');
if (! imageDir.exists()) {
    imageDir.createDirectory();
}

button.addEventListener('click', function () { Ti.Media.takePicture(); });


view.add(button);
 

var captureBtn = Ti.UI.createButton({
    title:'  Open Camera  ',
    top : 10

});
captureBtn.addEventListener('click', startCamera);
 
var win1 = Ti.UI.createWindow({
    backgroundColor : "#e4e2df"
});
//view3.add(captureBtn);
win1.add(captureBtn);
button2.addEventListener('click', function(event){
    win1.remove(button2);
	win1.remove(captureBtn);    
	var scrollView = Ti.UI.createScrollView({
    contentHeight:'auto',
    contentWidth:'auto',
    top:0,
    showHorizontalScrollIndicator:false,
    showVerticalScrollIndicator:true
});

var maxWidth = Ti.Platform.displayCaps.platformWidth;
var settings = {
    number:10,
    height:70,
    width:70,
    padding:3,   
    perLine:4 
};
//settings.perLine = Math.floor(maxWidth / (settings.width + settings.padding));
var iList=imageDir.getDirectoryListing();
settings.lines = Math.ceil(iList.length/ settings.perLine);
Ti.API.info('PHOTO ERROR'+iList.length+iList[0]);
var counter = 0;
for (var i = 0; i < settings.lines; i++) {
    for (var j = 0; j < settings.perLine; j++) {
    	var imageFile  = Ti.Filesystem.getFile(imageDir.resolve(),iList[counter]);
        var image = Ti.UI.createImageView({
            image:imageFile,
            height:settings.height,
            width:settings.width,
            left:(settings.padding*(j+1)) + (settings.width*j),
            top:(settings.padding*(i+1)) + (settings.height*i)
        });        
        scrollView.add(image);
        counter++;
        if (counter >= iList.length) break;

    }
}

win1.add(scrollView);
var button4 = Ti.UI.createButton({
   		   title:'  Back  ',
	       bottom : 60
			});
			button4.addEventListener('click', function(event){
			win1.remove(scrollView);
			win1.remove(button4);
			win1.add(button2);
			win1.add(captureBtn);
						});
win1.add(button4);            

});
//view3.add(button2);
win1.add(button2);
//win1.add(view3);
win1.open();
 
function startCamera() {
    if (Ti.Media.hasCameraPermissions()) {
        showCamera();
    } else {
        Ti.Media.requestCameraPermissions(function (e) {
            e.success && showCamera();
        });
    }
}
//for iOS
//win1.showNavBar();
function showCamera() {
    Ti.Media.showCamera({
        autohide : true,
        saveToPhotoGallery : true,
        overlay : view,
        success : function(e) {
            Ti.API.info('Path = ' + e.media.nativePath);
            var imageFile  = Ti.Filesystem.getFile(imageDir.resolve(), 'exp'+Date.now() + '.jpg');
			Ti.API.info("ImageFile path is: " + imageFile.resolve());
			if (imageFile.write(e.media)===false) {
 			Ti.API.info('PHOTO ERROR');
 			}
            var iv = Ti.UI.createImageView({
            	height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
                image: e
                
            });
            var view2 = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
            bottom : 50
           });
           var button3 = Ti.UI.createButton({
   		   title:'  Save Picture  ',
	       bottom : 60
			});
			button3.addEventListener('click', function(event){
				win1.remove(view2);
			win1.add(button2);
			win1.add(captureBtn);
						});
			view2.add(iv);
			view2.add(button3);            
			win1.add(view2);
			win1.remove(button2);
			win1.remove(captureBtn);
           
        }
    });
}
*/
/*
 * A master detail view, utilizing a native table view component and platform-specific UI and navigation.
 * A starting point for a navigation-based application with hierarchical data, or a stack of windows.
 * Requires Titanium Mobile SDK 1.8.0+.
 *
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *
 */

//bootstrap and check dependencies
if (Ti.version < 1.8) {
  alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {

   var Window = require('Ui/Main');
   new Window().open();
})();
