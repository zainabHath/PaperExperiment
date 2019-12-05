function backToMain() {
   window.location = "index.html";
}
function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}
function writeImage(entry,DataBlob)
{
  entry.createWriter(function(fileWriter) {
     console.log("Writing content to file");
     fileWriter.onwriteend = function(evt) {
       alert("Successfully saved file to " + entry);
     }
     fileWriter.write(DataBlob);
}, function(error) {
alert("Error: Could not create file writer, " + error.code);
})
}
function savebase64AsImageFile(folderpath,filename,content,contentType){
    var DataBlob = b64toBlob(content,contentType);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
      // Create the file.
      fileSystem.root.getDirectory('MyImages', { create: true, exclusive: false }, function (dirEntry) {
      dirEntry.getFile(filename, { create: true, exclusive: false }, function (entry) {
                console.log("File created succesfully.");
                 //var myFileUrl = entry.toURL();
                 writeImage(entry,DataBlob);
      }, function(error) {
        alert("Error: Could not create file, " + error.code);
      }) })
    }, function(evt) {
      alert("Error: Could not access file system, " + evt.target.error.code);
    });
}
function takePicture(){
  CameraPreview.takePicture(function(imgData){
    document.getElementById('originalPicture').src = 'data:image/jpeg;base64,' + imgData;
    var myBaseString = 'data:image/jpeg;base64,' + imgData;
    var block = myBaseString.split(";");
    var dataType = block[0].split(":")[1];// In this case "image/png"
    var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
    var folderpath = "file:///storage/emulated/0/";
    var d = new Date();
    var filename = "myimage"+d.getTime()+".png";
    savebase64AsImageFile(folderpath,filename,realData,dataType);
    CameraPreview.stopCamera();
  });
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
window.smallPreview = false;
CameraPreview.startCamera({x: 50, y: 50, width: 300, height: 300,  camera: CameraPreview.CAMERA_DIRECTION.BACK, toBack: false, previewDrag: true, tapPhoto: true});
}
