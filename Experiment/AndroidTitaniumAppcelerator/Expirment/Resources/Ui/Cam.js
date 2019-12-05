function Cam() {
	
	var view= Ti.UI.createView({
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE,
    bottom : 50
});
var button = Ti.UI.createButton({
    title:'  Take Picture  ',
        bottom : 60

});
button.addEventListener('click', function () { Ti.Media.takePicture(); });

view.add(button);
 
/*if (Ti.Media.hasCameraPermissions()) {
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
            /*var iv = Ti.UI.createImageView({
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
				view.remove(view2);
						});
			view2.add(iv);
			view2.add(button3);            
			view.add(view2);   
        }
    });
    } else {
        Ti.Media.requestCameraPermissions(function (e) {
            e.success && showCamera();
        });
    }*/
var imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,
    'downloaded_images');
if (! imageDir.exists()) {
    imageDir.createDirectory();
}
view.addEventListener('itemSelected', function(e) {
if (Ti.Media.hasCameraPermissions()) {
        showCamera();
    } else {
        Ti.Media.requestCameraPermissions(function (e) {
            e.success && showCamera();
        });
    }
    	});
view.fireEvent('itemSelected',{});
 
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
            /*var iv = Ti.UI.createImageView({
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
				view.remove(view2);
						});
			view2.add(iv);
			view2.add(button3);            
			view.add(view2);  */     
        }
    });
   }
   return view;
}
module.exports = Cam;