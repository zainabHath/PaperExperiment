function backToMain() {
   window.location = "index.html";
}
function onSuccessCallback(entries){
  var i;
  for (i = 0; i < entries.length; i++) {
  var ul = document.getElementById("deck");
  var li = document.createElement("li");
  var img = document.createElement("img");
  img.src = entries[i].toURL();
  li.setAttribute("class", "card"); // added line
  img.setAttribute("class", "card-img"); // added line
  li.appendChild(img);
  ul.appendChild(li);
  }
}

function onFailCallback(){
  // In case of error
  alert("error");

}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
    fileSystem.root.getDirectory('MyImages', { create: true, exclusive: false }, function (dirEntry) {
      var directoryReader = dirEntry.createReader();
          directoryReader.readEntries(onSuccessCallback,onFailCallback);
     });
  }, function(evt) {
    alert("Error: Could not access file system, " + evt.target.error.code);
  });
}
