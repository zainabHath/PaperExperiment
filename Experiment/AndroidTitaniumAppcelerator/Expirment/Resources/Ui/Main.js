function Main() {
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
    top : 10

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
		
}
module.exports = Main;