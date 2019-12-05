function Photos() {
	var view = Ti.UI.createView({
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE,
    bottom : 50
});

	var imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,
    'downloaded_images');
if (! imageDir.exists()) {
    imageDir.createDirectory();
}
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

view.add(scrollView);
return view;
}
module.exports = Photos;