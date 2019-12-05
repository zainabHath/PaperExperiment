function Cam() {

  var view = Ti.UI.createView({
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE,
    bottom: 50 });

  var button = Ti.UI.createButton({
    title: '  Take Picture  ',
    bottom: 60 });


  button.addEventListener('click', function () {Ti.Media.takePicture();});

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
  if (!imageDir.exists()) {
    imageDir.createDirectory();
  }
  view.addEventListener('itemSelected', function (e) {
    if (Ti.Media.hasCameraPermissions()) {
      showCamera();
    } else {
      Ti.Media.requestCameraPermissions(function (e) {
        e.success && showCamera();
      });
    }
  });
  view.fireEvent('itemSelected', {});

  function showCamera() {
    Ti.Media.showCamera({
      autohide: true,
      saveToPhotoGallery: true,
      overlay: view,
      success: function (e) {
        Ti.API.info('Path = ' + e.media.nativePath);
        var imageFile = Ti.Filesystem.getFile(imageDir.resolve(), 'exp' + Date.now() + '.jpg');
        Ti.API.info("ImageFile path is: " + imageFile.resolve());
        if (imageFile.write(e.media) === false) {
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
      } });

  }
  return view;
}
module.exports = Cam;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbS5qcyJdLCJuYW1lcyI6WyJDYW0iLCJ2aWV3IiwiVGkiLCJVSSIsImNyZWF0ZVZpZXciLCJoZWlnaHQiLCJTSVpFIiwid2lkdGgiLCJib3R0b20iLCJidXR0b24iLCJjcmVhdGVCdXR0b24iLCJ0aXRsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJNZWRpYSIsInRha2VQaWN0dXJlIiwiYWRkIiwiaW1hZ2VEaXIiLCJGaWxlc3lzdGVtIiwiZ2V0RmlsZSIsImFwcGxpY2F0aW9uRGF0YURpcmVjdG9yeSIsImV4aXN0cyIsImNyZWF0ZURpcmVjdG9yeSIsImUiLCJoYXNDYW1lcmFQZXJtaXNzaW9ucyIsInNob3dDYW1lcmEiLCJyZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbnMiLCJzdWNjZXNzIiwiZmlyZUV2ZW50IiwiYXV0b2hpZGUiLCJzYXZlVG9QaG90b0dhbGxlcnkiLCJvdmVybGF5IiwiQVBJIiwiaW5mbyIsIm1lZGlhIiwibmF0aXZlUGF0aCIsImltYWdlRmlsZSIsInJlc29sdmUiLCJEYXRlIiwibm93Iiwid3JpdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxHQUFULEdBQWU7O0FBRWQsTUFBSUMsSUFBSSxHQUFFQyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsVUFBTixDQUFpQjtBQUN4QkMsSUFBQUEsTUFBTSxFQUFHSCxFQUFFLENBQUNDLEVBQUgsQ0FBTUcsSUFEUztBQUV4QkMsSUFBQUEsS0FBSyxFQUFHTCxFQUFFLENBQUNDLEVBQUgsQ0FBTUcsSUFGVTtBQUd4QkUsSUFBQUEsTUFBTSxFQUFHLEVBSGUsRUFBakIsQ0FBVjs7QUFLRCxNQUFJQyxNQUFNLEdBQUdQLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNTyxZQUFOLENBQW1CO0FBQzVCQyxJQUFBQSxLQUFLLEVBQUMsa0JBRHNCO0FBRXhCSCxJQUFBQSxNQUFNLEVBQUcsRUFGZSxFQUFuQixDQUFiOzs7QUFLQUMsRUFBQUEsTUFBTSxDQUFDRyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFZLENBQUVWLEVBQUUsQ0FBQ1csS0FBSCxDQUFTQyxXQUFULEdBQXlCLENBQXhFOztBQUVBYixFQUFBQSxJQUFJLENBQUNjLEdBQUwsQ0FBU04sTUFBVDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDQSxNQUFJTyxRQUFRLEdBQUdkLEVBQUUsQ0FBQ2UsVUFBSCxDQUFjQyxPQUFkLENBQXNCaEIsRUFBRSxDQUFDZSxVQUFILENBQWNFLHdCQUFwQztBQUNYLHFCQURXLENBQWY7QUFFQSxNQUFJLENBQUVILFFBQVEsQ0FBQ0ksTUFBVCxFQUFOLEVBQXlCO0FBQ3JCSixJQUFBQSxRQUFRLENBQUNLLGVBQVQ7QUFDSDtBQUNEcEIsRUFBQUEsSUFBSSxDQUFDVyxnQkFBTCxDQUFzQixjQUF0QixFQUFzQyxVQUFTVSxDQUFULEVBQVk7QUFDbEQsUUFBSXBCLEVBQUUsQ0FBQ1csS0FBSCxDQUFTVSxvQkFBVCxFQUFKLEVBQXFDO0FBQzdCQyxNQUFBQSxVQUFVO0FBQ2IsS0FGTCxNQUVXO0FBQ0h0QixNQUFBQSxFQUFFLENBQUNXLEtBQUgsQ0FBU1ksd0JBQVQsQ0FBa0MsVUFBVUgsQ0FBVixFQUFhO0FBQzNDQSxRQUFBQSxDQUFDLENBQUNJLE9BQUYsSUFBYUYsVUFBVSxFQUF2QjtBQUNILE9BRkQ7QUFHSDtBQUNDLEdBUk47QUFTQXZCLEVBQUFBLElBQUksQ0FBQzBCLFNBQUwsQ0FBZSxjQUFmLEVBQThCLEVBQTlCOztBQUVBLFdBQVNILFVBQVQsR0FBc0I7QUFDbEJ0QixJQUFBQSxFQUFFLENBQUNXLEtBQUgsQ0FBU1csVUFBVCxDQUFvQjtBQUNoQkksTUFBQUEsUUFBUSxFQUFHLElBREs7QUFFaEJDLE1BQUFBLGtCQUFrQixFQUFHLElBRkw7QUFHaEJDLE1BQUFBLE9BQU8sRUFBRzdCLElBSE07QUFJaEJ5QixNQUFBQSxPQUFPLEVBQUcsVUFBU0osQ0FBVCxFQUFZO0FBQ2xCcEIsUUFBQUEsRUFBRSxDQUFDNkIsR0FBSCxDQUFPQyxJQUFQLENBQVksWUFBWVYsQ0FBQyxDQUFDVyxLQUFGLENBQVFDLFVBQWhDO0FBQ0EsWUFBSUMsU0FBUyxHQUFJakMsRUFBRSxDQUFDZSxVQUFILENBQWNDLE9BQWQsQ0FBc0JGLFFBQVEsQ0FBQ29CLE9BQVQsRUFBdEIsRUFBMEMsUUFBTUMsSUFBSSxDQUFDQyxHQUFMLEVBQU4sR0FBbUIsTUFBN0QsQ0FBakI7QUFDVHBDLFFBQUFBLEVBQUUsQ0FBQzZCLEdBQUgsQ0FBT0MsSUFBUCxDQUFZLHdCQUF3QkcsU0FBUyxDQUFDQyxPQUFWLEVBQXBDO0FBQ0EsWUFBSUQsU0FBUyxDQUFDSSxLQUFWLENBQWdCakIsQ0FBQyxDQUFDVyxLQUFsQixNQUEyQixLQUEvQixFQUFzQztBQUNyQy9CLFVBQUFBLEVBQUUsQ0FBQzZCLEdBQUgsQ0FBT0MsSUFBUCxDQUFZLGFBQVo7QUFDQztBQUNPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkgsT0FoQ2UsRUFBcEI7O0FBa0NBO0FBQ0QsU0FBTy9CLElBQVA7QUFDRjtBQUNEdUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekMsR0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBDYW0oKSB7XHJcblx0XHJcblx0dmFyIHZpZXc9IFRpLlVJLmNyZWF0ZVZpZXcoe1xyXG4gICAgaGVpZ2h0IDogVGkuVUkuU0laRSxcclxuICAgIHdpZHRoIDogVGkuVUkuU0laRSxcclxuICAgIGJvdHRvbSA6IDUwXHJcbn0pO1xyXG52YXIgYnV0dG9uID0gVGkuVUkuY3JlYXRlQnV0dG9uKHtcclxuICAgIHRpdGxlOicgIFRha2UgUGljdHVyZSAgJyxcclxuICAgICAgICBib3R0b20gOiA2MFxyXG5cclxufSk7XHJcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHsgVGkuTWVkaWEudGFrZVBpY3R1cmUoKTsgfSk7XHJcblxyXG52aWV3LmFkZChidXR0b24pO1xyXG4gXHJcbi8qaWYgKFRpLk1lZGlhLmhhc0NhbWVyYVBlcm1pc3Npb25zKCkpIHtcclxuICAgICAgICAgVGkuTWVkaWEuc2hvd0NhbWVyYSh7XHJcbiAgICAgICAgYXV0b2hpZGUgOiB0cnVlLFxyXG4gICAgICAgIHNhdmVUb1Bob3RvR2FsbGVyeSA6IHRydWUsXHJcbiAgICAgICAgb3ZlcmxheSA6IHZpZXcsXHJcbiAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgVGkuQVBJLmluZm8oJ1BhdGggPSAnICsgZS5tZWRpYS5uYXRpdmVQYXRoKTtcclxuICAgICAgICAgICAgdmFyIGltYWdlRmlsZSAgPSBUaS5GaWxlc3lzdGVtLmdldEZpbGUoaW1hZ2VEaXIucmVzb2x2ZSgpLCAnZXhwJytEYXRlLm5vdygpICsgJy5qcGcnKTtcclxuXHRcdFx0VGkuQVBJLmluZm8oXCJJbWFnZUZpbGUgcGF0aCBpczogXCIgKyBpbWFnZUZpbGUucmVzb2x2ZSgpKTtcclxuXHRcdFx0aWYgKGltYWdlRmlsZS53cml0ZShlLm1lZGlhKT09PWZhbHNlKSB7XHJcbiBcdFx0XHRUaS5BUEkuaW5mbygnUEhPVE8gRVJST1InKTtcclxuIFx0XHRcdH1cclxuICAgICAgICAgICAgLyp2YXIgaXYgPSBUaS5VSS5jcmVhdGVJbWFnZVZpZXcoe1xyXG4gICAgICAgICAgICBcdGhlaWdodCA6IFRpLlVJLlNJWkUsXHJcbiAgICAgICAgICAgIHdpZHRoIDogVGkuVUkuU0laRSxcclxuICAgICAgICAgICAgICAgIGltYWdlOiBlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciB2aWV3MiA9IFRpLlVJLmNyZWF0ZVZpZXcoe1xyXG4gICAgICAgICAgICBoZWlnaHQgOiBUaS5VSS5TSVpFLFxyXG4gICAgICAgICAgICB3aWR0aCA6IFRpLlVJLlNJWkUsXHJcbiAgICAgICAgICAgIGJvdHRvbSA6IDUwXHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgdmFyIGJ1dHRvbjMgPSBUaS5VSS5jcmVhdGVCdXR0b24oe1xyXG4gICBcdFx0ICAgdGl0bGU6JyAgU2F2ZSBQaWN0dXJlICAnLFxyXG5cdCAgICAgICBib3R0b20gOiA2MFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0YnV0dG9uMy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHRcdFx0XHR2aWV3LnJlbW92ZSh2aWV3Mik7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR2aWV3Mi5hZGQoaXYpO1xyXG5cdFx0XHR2aWV3Mi5hZGQoYnV0dG9uMyk7ICAgICAgICAgICAgXHJcblx0XHRcdHZpZXcuYWRkKHZpZXcyKTsgICBcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVGkuTWVkaWEucmVxdWVzdENhbWVyYVBlcm1pc3Npb25zKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3VjY2VzcyAmJiBzaG93Q2FtZXJhKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9Ki9cclxudmFyIGltYWdlRGlyID0gVGkuRmlsZXN5c3RlbS5nZXRGaWxlKFRpLkZpbGVzeXN0ZW0uYXBwbGljYXRpb25EYXRhRGlyZWN0b3J5LFxyXG4gICAgJ2Rvd25sb2FkZWRfaW1hZ2VzJyk7XHJcbmlmICghIGltYWdlRGlyLmV4aXN0cygpKSB7XHJcbiAgICBpbWFnZURpci5jcmVhdGVEaXJlY3RvcnkoKTtcclxufVxyXG52aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2l0ZW1TZWxlY3RlZCcsIGZ1bmN0aW9uKGUpIHtcclxuaWYgKFRpLk1lZGlhLmhhc0NhbWVyYVBlcm1pc3Npb25zKCkpIHtcclxuICAgICAgICBzaG93Q2FtZXJhKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIFRpLk1lZGlhLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9ucyhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnN1Y2Nlc3MgJiYgc2hvd0NhbWVyYSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHR9KTtcclxudmlldy5maXJlRXZlbnQoJ2l0ZW1TZWxlY3RlZCcse30pO1xyXG4gXHJcbmZ1bmN0aW9uIHNob3dDYW1lcmEoKSB7XHJcbiAgICBUaS5NZWRpYS5zaG93Q2FtZXJhKHtcclxuICAgICAgICBhdXRvaGlkZSA6IHRydWUsXHJcbiAgICAgICAgc2F2ZVRvUGhvdG9HYWxsZXJ5IDogdHJ1ZSxcclxuICAgICAgICBvdmVybGF5IDogdmlldyxcclxuICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBUaS5BUEkuaW5mbygnUGF0aCA9ICcgKyBlLm1lZGlhLm5hdGl2ZVBhdGgpO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2VGaWxlICA9IFRpLkZpbGVzeXN0ZW0uZ2V0RmlsZShpbWFnZURpci5yZXNvbHZlKCksICdleHAnK0RhdGUubm93KCkgKyAnLmpwZycpO1xyXG5cdFx0XHRUaS5BUEkuaW5mbyhcIkltYWdlRmlsZSBwYXRoIGlzOiBcIiArIGltYWdlRmlsZS5yZXNvbHZlKCkpO1xyXG5cdFx0XHRpZiAoaW1hZ2VGaWxlLndyaXRlKGUubWVkaWEpPT09ZmFsc2UpIHtcclxuIFx0XHRcdFRpLkFQSS5pbmZvKCdQSE9UTyBFUlJPUicpO1xyXG4gXHRcdFx0fVxyXG4gICAgICAgICAgICAvKnZhciBpdiA9IFRpLlVJLmNyZWF0ZUltYWdlVmlldyh7XHJcbiAgICAgICAgICAgIFx0aGVpZ2h0IDogVGkuVUkuU0laRSxcclxuICAgICAgICAgICAgd2lkdGggOiBUaS5VSS5TSVpFLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGVcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHZpZXcyID0gVGkuVUkuY3JlYXRlVmlldyh7XHJcbiAgICAgICAgICAgIGhlaWdodCA6IFRpLlVJLlNJWkUsXHJcbiAgICAgICAgICAgIHdpZHRoIDogVGkuVUkuU0laRSxcclxuICAgICAgICAgICAgYm90dG9tIDogNTBcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICB2YXIgYnV0dG9uMyA9IFRpLlVJLmNyZWF0ZUJ1dHRvbih7XHJcbiAgIFx0XHQgICB0aXRsZTonICBTYXZlIFBpY3R1cmUgICcsXHJcblx0ICAgICAgIGJvdHRvbSA6IDYwXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRidXR0b24zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG5cdFx0XHRcdHZpZXcucmVtb3ZlKHZpZXcyKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdHZpZXcyLmFkZChpdik7XHJcblx0XHRcdHZpZXcyLmFkZChidXR0b24zKTsgICAgICAgICAgICBcclxuXHRcdFx0dmlldy5hZGQodmlldzIpOyAgKi8gICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICB9XHJcbiAgIHJldHVybiB2aWV3O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gQ2FtOyJdLCJzb3VyY2VSb290IjoiQzpcXFVzZXJzXFx6b3pvXFxEb2N1bWVudHNcXEFwcGNlbGVyYXRvcl9TdHVkaW9fV29ya3NwYWNlXFxFeHBpcm1lbnRcXFJlc291cmNlc1xcVWkifQ==
