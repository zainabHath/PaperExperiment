function Main() {
	
	var Cam = require('Ui/Cam'),
	Photos = require('Ui/Photos');
		
	var win = Ti.UI.createWindow({
    backgroundColor: '#fff'
});
 
var nav = Ti.UI.iOS.createNavigationWindow({
  window: win
});
 
var btn = Ti.UI.createButton({
    title: 'Open photos',
    bottom : 60
});
 
btn.addEventListener('click', function() {
	
	var detailView2 = Photos();
    var detailContainerWindow2 = Ti.UI.createWindow({
      title: 'Photos',
      backgroundColor: '#ffffff'
    });
    detailContainerWindow2.add(detailView2);
    win.navigationWindow.openWindow(detailContainerWindow2);
});

win.add(btn);

var btn2 = Ti.UI.createButton({
    title: 'Open cam',
    top : 50
});
 
btn2.addEventListener('click', function() {
	
	var detailView2 = Cam();
    var detailContainerWindow2 = Ti.UI.createWindow({
      title: 'Camera',
      backgroundColor: '#ffffff'
    });
    detailContainerWindow2.add(detailView2);
    detailView2.fireEvent('itemSelected',e);
    win.navigationWindow.openWindow(detailContainerWindow2);
});

win.add(btn2);

nav.open();
	
	/*
	 
	var Cam = require('Ui/Cam'),
		Photos = require('Ui/Photos');
		//create object instance
	var self = Ti.UI.createWindow({
		title:'Exp app',
		backgroundColor:'#ffffff'
	});
	
var button2 = Ti.UI.createButton({
    title:'  Browes Picture  ',
    bottom : 60

});
var captureBtn = Ti.UI.createButton({
    title:'  Open Camera  ',
    top : 50

});
//captureBtn.addEventListener('click', startCamera);
captureBtn.addEventListener('click', function () { 
			var detailView = Cam();
            var detailContainerWindow = Ti.UI.createWindow({
			title:'Cam',
			backgroundColor:'#ffffff'
		});
		
		detailContainerWindow.add(detailView);
		detailView.fireEvent('itemSelected',e);
		detailContainerWindow.open(); });
		
button2.addEventListener('click', function () { 
			var detailView2 = Photos();
            var detailContainerWindow2 = Ti.UI.createWindow({
			title:'Photos',
			backgroundColor:'#ffffff'
		});
		detailContainerWindow2.add(detailView2);
		detailContainerWindow2.open(); });
self.add(button2);
self.add(captureBtn);

	return self;
		*/
}
module.exports = Main;