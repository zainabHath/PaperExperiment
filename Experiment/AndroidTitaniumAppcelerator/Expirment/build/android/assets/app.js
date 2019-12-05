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
(function () {

  var Window = require('Ui/Main');
  new Window().open();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJUaSIsInZlcnNpb24iLCJhbGVydCIsIldpbmRvdyIsInJlcXVpcmUiLCJvcGVuIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZKQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQSxJQUFJQSxFQUFFLENBQUNDLE9BQUgsR0FBYSxHQUFqQixFQUFzQjtBQUNwQkMsRUFBQUEsS0FBSyxDQUFDLDZFQUFELENBQUw7QUFDRDs7QUFFRDtBQUNBLENBQUMsWUFBVzs7QUFFVCxNQUFJQyxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXBCO0FBQ0EsTUFBSUQsTUFBSixHQUFhRSxJQUFiO0FBQ0YsQ0FKRCIsInNvdXJjZXNDb250ZW50IjpbIi8qdmFyIHZpZXcgPSBUaS5VSS5jcmVhdGVWaWV3KHtcbiAgICBoZWlnaHQgOiBUaS5VSS5TSVpFLFxuICAgIHdpZHRoIDogVGkuVUkuU0laRSxcbiAgICBib3R0b20gOiA1MFxufSk7XG52YXIgdmlldzMgPSBUaS5VSS5jcmVhdGVWaWV3KHtcbiAgICBoZWlnaHQgOiBUaS5VSS5TSVpFLFxuICAgIHdpZHRoIDogVGkuVUkuU0laRSxcbiAgICBib3R0b20gOiA1MFxufSk7XG52YXIgYnV0dG9uID0gVGkuVUkuY3JlYXRlQnV0dG9uKHtcbiAgICB0aXRsZTonICBUYWtlIFBpY3R1cmUgICcsXG4gICAgICAgIGJvdHRvbSA6IDYwXG5cbn0pO1xudmFyIGJ1dHRvbjIgPSBUaS5VSS5jcmVhdGVCdXR0b24oe1xuICAgIHRpdGxlOicgIEJyb3dlcyBQaWN0dXJlICAnLFxuICAgIGJvdHRvbSA6IDYwXG5cbn0pO1xudmFyIGltYWdlRGlyID0gVGkuRmlsZXN5c3RlbS5nZXRGaWxlKFRpLkZpbGVzeXN0ZW0uYXBwbGljYXRpb25EYXRhRGlyZWN0b3J5LFxuICAgICdkb3dubG9hZGVkX2ltYWdlcycpO1xuaWYgKCEgaW1hZ2VEaXIuZXhpc3RzKCkpIHtcbiAgICBpbWFnZURpci5jcmVhdGVEaXJlY3RvcnkoKTtcbn1cblxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkgeyBUaS5NZWRpYS50YWtlUGljdHVyZSgpOyB9KTtcblxuXG52aWV3LmFkZChidXR0b24pO1xuIFxuXG52YXIgY2FwdHVyZUJ0biA9IFRpLlVJLmNyZWF0ZUJ1dHRvbih7XG4gICAgdGl0bGU6JyAgT3BlbiBDYW1lcmEgICcsXG4gICAgdG9wIDogMTBcblxufSk7XG5jYXB0dXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRDYW1lcmEpO1xuIFxudmFyIHdpbjEgPSBUaS5VSS5jcmVhdGVXaW5kb3coe1xuICAgIGJhY2tncm91bmRDb2xvciA6IFwiI2U0ZTJkZlwiXG59KTtcbi8vdmlldzMuYWRkKGNhcHR1cmVCdG4pO1xud2luMS5hZGQoY2FwdHVyZUJ0bik7XG5idXR0b24yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgIHdpbjEucmVtb3ZlKGJ1dHRvbjIpO1xuXHR3aW4xLnJlbW92ZShjYXB0dXJlQnRuKTsgICAgXG5cdHZhciBzY3JvbGxWaWV3ID0gVGkuVUkuY3JlYXRlU2Nyb2xsVmlldyh7XG4gICAgY29udGVudEhlaWdodDonYXV0bycsXG4gICAgY29udGVudFdpZHRoOidhdXRvJyxcbiAgICB0b3A6MCxcbiAgICBzaG93SG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcjpmYWxzZSxcbiAgICBzaG93VmVydGljYWxTY3JvbGxJbmRpY2F0b3I6dHJ1ZVxufSk7XG5cbnZhciBtYXhXaWR0aCA9IFRpLlBsYXRmb3JtLmRpc3BsYXlDYXBzLnBsYXRmb3JtV2lkdGg7XG52YXIgc2V0dGluZ3MgPSB7XG4gICAgbnVtYmVyOjEwLFxuICAgIGhlaWdodDo3MCxcbiAgICB3aWR0aDo3MCxcbiAgICBwYWRkaW5nOjMsICAgXG4gICAgcGVyTGluZTo0IFxufTtcbi8vc2V0dGluZ3MucGVyTGluZSA9IE1hdGguZmxvb3IobWF4V2lkdGggLyAoc2V0dGluZ3Mud2lkdGggKyBzZXR0aW5ncy5wYWRkaW5nKSk7XG52YXIgaUxpc3Q9aW1hZ2VEaXIuZ2V0RGlyZWN0b3J5TGlzdGluZygpO1xuc2V0dGluZ3MubGluZXMgPSBNYXRoLmNlaWwoaUxpc3QubGVuZ3RoLyBzZXR0aW5ncy5wZXJMaW5lKTtcblRpLkFQSS5pbmZvKCdQSE9UTyBFUlJPUicraUxpc3QubGVuZ3RoK2lMaXN0WzBdKTtcbnZhciBjb3VudGVyID0gMDtcbmZvciAodmFyIGkgPSAwOyBpIDwgc2V0dGluZ3MubGluZXM7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2V0dGluZ3MucGVyTGluZTsgaisrKSB7XG4gICAgXHR2YXIgaW1hZ2VGaWxlICA9IFRpLkZpbGVzeXN0ZW0uZ2V0RmlsZShpbWFnZURpci5yZXNvbHZlKCksaUxpc3RbY291bnRlcl0pO1xuICAgICAgICB2YXIgaW1hZ2UgPSBUaS5VSS5jcmVhdGVJbWFnZVZpZXcoe1xuICAgICAgICAgICAgaW1hZ2U6aW1hZ2VGaWxlLFxuICAgICAgICAgICAgaGVpZ2h0OnNldHRpbmdzLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOnNldHRpbmdzLndpZHRoLFxuICAgICAgICAgICAgbGVmdDooc2V0dGluZ3MucGFkZGluZyooaisxKSkgKyAoc2V0dGluZ3Mud2lkdGgqaiksXG4gICAgICAgICAgICB0b3A6KHNldHRpbmdzLnBhZGRpbmcqKGkrMSkpICsgKHNldHRpbmdzLmhlaWdodCppKVxuICAgICAgICB9KTsgICAgICAgIFxuICAgICAgICBzY3JvbGxWaWV3LmFkZChpbWFnZSk7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaUxpc3QubGVuZ3RoKSBicmVhaztcblxuICAgIH1cbn1cblxud2luMS5hZGQoc2Nyb2xsVmlldyk7XG52YXIgYnV0dG9uNCA9IFRpLlVJLmNyZWF0ZUJ1dHRvbih7XG4gICBcdFx0ICAgdGl0bGU6JyAgQmFjayAgJyxcblx0ICAgICAgIGJvdHRvbSA6IDYwXG5cdFx0XHR9KTtcblx0XHRcdGJ1dHRvbjQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHR3aW4xLnJlbW92ZShzY3JvbGxWaWV3KTtcblx0XHRcdHdpbjEucmVtb3ZlKGJ1dHRvbjQpO1xuXHRcdFx0d2luMS5hZGQoYnV0dG9uMik7XG5cdFx0XHR3aW4xLmFkZChjYXB0dXJlQnRuKTtcblx0XHRcdFx0XHRcdH0pO1xud2luMS5hZGQoYnV0dG9uNCk7ICAgICAgICAgICAgXG5cbn0pO1xuLy92aWV3My5hZGQoYnV0dG9uMik7XG53aW4xLmFkZChidXR0b24yKTtcbi8vd2luMS5hZGQodmlldzMpO1xud2luMS5vcGVuKCk7XG4gXG5mdW5jdGlvbiBzdGFydENhbWVyYSgpIHtcbiAgICBpZiAoVGkuTWVkaWEuaGFzQ2FtZXJhUGVybWlzc2lvbnMoKSkge1xuICAgICAgICBzaG93Q2FtZXJhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgVGkuTWVkaWEucmVxdWVzdENhbWVyYVBlcm1pc3Npb25zKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN1Y2Nlc3MgJiYgc2hvd0NhbWVyYSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vL2ZvciBpT1Ncbi8vd2luMS5zaG93TmF2QmFyKCk7XG5mdW5jdGlvbiBzaG93Q2FtZXJhKCkge1xuICAgIFRpLk1lZGlhLnNob3dDYW1lcmEoe1xuICAgICAgICBhdXRvaGlkZSA6IHRydWUsXG4gICAgICAgIHNhdmVUb1Bob3RvR2FsbGVyeSA6IHRydWUsXG4gICAgICAgIG92ZXJsYXkgOiB2aWV3LFxuICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgVGkuQVBJLmluZm8oJ1BhdGggPSAnICsgZS5tZWRpYS5uYXRpdmVQYXRoKTtcbiAgICAgICAgICAgIHZhciBpbWFnZUZpbGUgID0gVGkuRmlsZXN5c3RlbS5nZXRGaWxlKGltYWdlRGlyLnJlc29sdmUoKSwgJ2V4cCcrRGF0ZS5ub3coKSArICcuanBnJyk7XG5cdFx0XHRUaS5BUEkuaW5mbyhcIkltYWdlRmlsZSBwYXRoIGlzOiBcIiArIGltYWdlRmlsZS5yZXNvbHZlKCkpO1xuXHRcdFx0aWYgKGltYWdlRmlsZS53cml0ZShlLm1lZGlhKT09PWZhbHNlKSB7XG4gXHRcdFx0VGkuQVBJLmluZm8oJ1BIT1RPIEVSUk9SJyk7XG4gXHRcdFx0fVxuICAgICAgICAgICAgdmFyIGl2ID0gVGkuVUkuY3JlYXRlSW1hZ2VWaWV3KHtcbiAgICAgICAgICAgIFx0aGVpZ2h0IDogVGkuVUkuU0laRSxcbiAgICAgICAgICAgIHdpZHRoIDogVGkuVUkuU0laRSxcbiAgICAgICAgICAgICAgICBpbWFnZTogZVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgdmlldzIgPSBUaS5VSS5jcmVhdGVWaWV3KHtcbiAgICAgICAgICAgIGhlaWdodCA6IFRpLlVJLlNJWkUsXG4gICAgICAgICAgICB3aWR0aCA6IFRpLlVJLlNJWkUsXG4gICAgICAgICAgICBib3R0b20gOiA1MFxuICAgICAgICAgICB9KTtcbiAgICAgICAgICAgdmFyIGJ1dHRvbjMgPSBUaS5VSS5jcmVhdGVCdXR0b24oe1xuICAgXHRcdCAgIHRpdGxlOicgIFNhdmUgUGljdHVyZSAgJyxcblx0ICAgICAgIGJvdHRvbSA6IDYwXG5cdFx0XHR9KTtcblx0XHRcdGJ1dHRvbjMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdHdpbjEucmVtb3ZlKHZpZXcyKTtcblx0XHRcdHdpbjEuYWRkKGJ1dHRvbjIpO1xuXHRcdFx0d2luMS5hZGQoY2FwdHVyZUJ0bik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdHZpZXcyLmFkZChpdik7XG5cdFx0XHR2aWV3Mi5hZGQoYnV0dG9uMyk7ICAgICAgICAgICAgXG5cdFx0XHR3aW4xLmFkZCh2aWV3Mik7XG5cdFx0XHR3aW4xLnJlbW92ZShidXR0b24yKTtcblx0XHRcdHdpbjEucmVtb3ZlKGNhcHR1cmVCdG4pO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0pO1xufVxuKi9cbi8qXG4gKiBBIG1hc3RlciBkZXRhaWwgdmlldywgdXRpbGl6aW5nIGEgbmF0aXZlIHRhYmxlIHZpZXcgY29tcG9uZW50IGFuZCBwbGF0Zm9ybS1zcGVjaWZpYyBVSSBhbmQgbmF2aWdhdGlvbi5cbiAqIEEgc3RhcnRpbmcgcG9pbnQgZm9yIGEgbmF2aWdhdGlvbi1iYXNlZCBhcHBsaWNhdGlvbiB3aXRoIGhpZXJhcmNoaWNhbCBkYXRhLCBvciBhIHN0YWNrIG9mIHdpbmRvd3MuXG4gKiBSZXF1aXJlcyBUaXRhbml1bSBNb2JpbGUgU0RLIDEuOC4wKy5cbiAqXG4gKiBJbiBhcHAuanMsIHdlIGdlbmVyYWxseSB0YWtlIGNhcmUgb2YgYSBmZXcgdGhpbmdzOlxuICogLSBCb290c3RyYXAgdGhlIGFwcGxpY2F0aW9uIHdpdGggYW55IGRhdGEgd2UgbmVlZFxuICogLSBDaGVjayBmb3IgZGVwZW5kZW5jaWVzIGxpa2UgZGV2aWNlIHR5cGUsIHBsYXRmb3JtIHZlcnNpb24gb3IgbmV0d29yayBjb25uZWN0aW9uXG4gKiAtIFJlcXVpcmUgYW5kIG9wZW4gb3VyIHRvcC1sZXZlbCBVSSBjb21wb25lbnRcbiAqXG4gKi9cblxuLy9ib290c3RyYXAgYW5kIGNoZWNrIGRlcGVuZGVuY2llc1xuaWYgKFRpLnZlcnNpb24gPCAxLjgpIHtcbiAgYWxlcnQoJ1NvcnJ5IC0gdGhpcyBhcHBsaWNhdGlvbiB0ZW1wbGF0ZSByZXF1aXJlcyBUaXRhbml1bSBNb2JpbGUgU0RLIDEuOCBvciBsYXRlcicpO1xufVxuXG4vLyBUaGlzIGlzIGEgc2luZ2xlIGNvbnRleHQgYXBwbGljYXRpb24gd2l0aCBtdXRsaXBsZSB3aW5kb3dzIGluIGEgc3RhY2tcbihmdW5jdGlvbigpIHtcblxuICAgdmFyIFdpbmRvdyA9IHJlcXVpcmUoJ1VpL01haW4nKTtcbiAgIG5ldyBXaW5kb3coKS5vcGVuKCk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiJDOlxcVXNlcnNcXHpvem9cXERvY3VtZW50c1xcQXBwY2VsZXJhdG9yX1N0dWRpb19Xb3Jrc3BhY2VcXEV4cGlybWVudFxcUmVzb3VyY2VzIn0=
