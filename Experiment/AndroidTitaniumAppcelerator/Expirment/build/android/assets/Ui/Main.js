function Main() {
  var Cam = require('Ui/Cam'),
  Photos = require('Ui/Photos');
  //create object instance
  var self = Ti.UI.createWindow({
    title: 'Exp app',
    backgroundColor: '#ffffff' });


  var button2 = Ti.UI.createButton({
    title: '  Browes Picture  ',
    bottom: 60 });


  var captureBtn = Ti.UI.createButton({
    title: '  Open Camera  ',
    top: 10 });


  //captureBtn.addEventListener('click', startCamera);
  captureBtn.addEventListener('click', function () {
    var detailView = Cam();
    var detailContainerWindow = Ti.UI.createWindow({
      title: 'Cam',
      backgroundColor: '#ffffff' });


    detailContainerWindow.add(detailView);
    detailView.fireEvent('itemSelected', e);
    detailContainerWindow.open();});
  button2.addEventListener('click', function () {
    var detailView2 = Photos();
    var detailContainerWindow2 = Ti.UI.createWindow({
      title: 'Photos',
      backgroundColor: '#ffffff' });

    detailContainerWindow2.add(detailView2);
    detailContainerWindow2.open();});
  self.add(button2);
  self.add(captureBtn);

  return self;

}
module.exports = Main;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1haW4uanMiXSwibmFtZXMiOlsiTWFpbiIsIkNhbSIsInJlcXVpcmUiLCJQaG90b3MiLCJzZWxmIiwiVGkiLCJVSSIsImNyZWF0ZVdpbmRvdyIsInRpdGxlIiwiYmFja2dyb3VuZENvbG9yIiwiYnV0dG9uMiIsImNyZWF0ZUJ1dHRvbiIsImJvdHRvbSIsImNhcHR1cmVCdG4iLCJ0b3AiLCJhZGRFdmVudExpc3RlbmVyIiwiZGV0YWlsVmlldyIsImRldGFpbENvbnRhaW5lcldpbmRvdyIsImFkZCIsImZpcmVFdmVudCIsImUiLCJvcGVuIiwiZGV0YWlsVmlldzIiLCJkZXRhaWxDb250YWluZXJXaW5kb3cyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsSUFBVCxHQUFnQjtBQUNmLE1BQUlDLEdBQUcsR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBakI7QUFDQ0MsRUFBQUEsTUFBTSxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQURqQjtBQUVDO0FBQ0QsTUFBSUUsSUFBSSxHQUFHQyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsWUFBTixDQUFtQjtBQUM3QkMsSUFBQUEsS0FBSyxFQUFDLFNBRHVCO0FBRTdCQyxJQUFBQSxlQUFlLEVBQUMsU0FGYSxFQUFuQixDQUFYOzs7QUFLRCxNQUFJQyxPQUFPLEdBQUdMLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNSyxZQUFOLENBQW1CO0FBQzdCSCxJQUFBQSxLQUFLLEVBQUMsb0JBRHVCO0FBRTdCSSxJQUFBQSxNQUFNLEVBQUcsRUFGb0IsRUFBbkIsQ0FBZDs7O0FBS0EsTUFBSUMsVUFBVSxHQUFHUixFQUFFLENBQUNDLEVBQUgsQ0FBTUssWUFBTixDQUFtQjtBQUNoQ0gsSUFBQUEsS0FBSyxFQUFDLGlCQUQwQjtBQUVoQ00sSUFBQUEsR0FBRyxFQUFHLEVBRjBCLEVBQW5CLENBQWpCOzs7QUFLQTtBQUNBRCxFQUFBQSxVQUFVLENBQUNFLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQVk7QUFDOUMsUUFBSUMsVUFBVSxHQUFHZixHQUFHLEVBQXBCO0FBQ1MsUUFBSWdCLHFCQUFxQixHQUFHWixFQUFFLENBQUNDLEVBQUgsQ0FBTUMsWUFBTixDQUFtQjtBQUN4REMsTUFBQUEsS0FBSyxFQUFDLEtBRGtEO0FBRXhEQyxNQUFBQSxlQUFlLEVBQUMsU0FGd0MsRUFBbkIsQ0FBNUI7OztBQUtWUSxJQUFBQSxxQkFBcUIsQ0FBQ0MsR0FBdEIsQ0FBMEJGLFVBQTFCO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0csU0FBWCxDQUFxQixjQUFyQixFQUFvQ0MsQ0FBcEM7QUFDQUgsSUFBQUEscUJBQXFCLENBQUNJLElBQXRCLEdBQStCLENBVGpDO0FBVUFYLEVBQUFBLE9BQU8sQ0FBQ0ssZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBWTtBQUMzQyxRQUFJTyxXQUFXLEdBQUduQixNQUFNLEVBQXhCO0FBQ1MsUUFBSW9CLHNCQUFzQixHQUFHbEIsRUFBRSxDQUFDQyxFQUFILENBQU1DLFlBQU4sQ0FBbUI7QUFDekRDLE1BQUFBLEtBQUssRUFBQyxRQURtRDtBQUV6REMsTUFBQUEsZUFBZSxFQUFDLFNBRnlDLEVBQW5CLENBQTdCOztBQUlWYyxJQUFBQSxzQkFBc0IsQ0FBQ0wsR0FBdkIsQ0FBMkJJLFdBQTNCO0FBQ0FDLElBQUFBLHNCQUFzQixDQUFDRixJQUF2QixHQUFnQyxDQVBsQztBQVFBakIsRUFBQUEsSUFBSSxDQUFDYyxHQUFMLENBQVNSLE9BQVQ7QUFDQU4sRUFBQUEsSUFBSSxDQUFDYyxHQUFMLENBQVNMLFVBQVQ7O0FBRUMsU0FBT1QsSUFBUDs7QUFFQTtBQUNEb0IsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekIsSUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBNYWluKCkge1xyXG5cdHZhciBDYW0gPSByZXF1aXJlKCdVaS9DYW0nKSxcclxuXHRcdFBob3RvcyA9IHJlcXVpcmUoJ1VpL1Bob3RvcycpO1xyXG5cdFx0Ly9jcmVhdGUgb2JqZWN0IGluc3RhbmNlXHJcblx0dmFyIHNlbGYgPSBUaS5VSS5jcmVhdGVXaW5kb3coe1xyXG5cdFx0dGl0bGU6J0V4cCBhcHAnLFxyXG5cdFx0YmFja2dyb3VuZENvbG9yOicjZmZmZmZmJ1xyXG5cdH0pO1xyXG5cdFxyXG52YXIgYnV0dG9uMiA9IFRpLlVJLmNyZWF0ZUJ1dHRvbih7XHJcbiAgICB0aXRsZTonICBCcm93ZXMgUGljdHVyZSAgJyxcclxuICAgIGJvdHRvbSA6IDYwXHJcblxyXG59KTtcclxudmFyIGNhcHR1cmVCdG4gPSBUaS5VSS5jcmVhdGVCdXR0b24oe1xyXG4gICAgdGl0bGU6JyAgT3BlbiBDYW1lcmEgICcsXHJcbiAgICB0b3AgOiAxMFxyXG5cclxufSk7XHJcbi8vY2FwdHVyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0Q2FtZXJhKTtcclxuY2FwdHVyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHsgXHJcblx0XHRcdHZhciBkZXRhaWxWaWV3ID0gQ2FtKCk7XHJcbiAgICAgICAgICAgIHZhciBkZXRhaWxDb250YWluZXJXaW5kb3cgPSBUaS5VSS5jcmVhdGVXaW5kb3coe1xyXG5cdFx0XHR0aXRsZTonQ2FtJyxcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOicjZmZmZmZmJ1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdGRldGFpbENvbnRhaW5lcldpbmRvdy5hZGQoZGV0YWlsVmlldyk7XHJcblx0XHRkZXRhaWxWaWV3LmZpcmVFdmVudCgnaXRlbVNlbGVjdGVkJyxlKTtcclxuXHRcdGRldGFpbENvbnRhaW5lcldpbmRvdy5vcGVuKCk7IH0pO1xyXG5idXR0b24yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkgeyBcclxuXHRcdFx0dmFyIGRldGFpbFZpZXcyID0gUGhvdG9zKCk7XHJcbiAgICAgICAgICAgIHZhciBkZXRhaWxDb250YWluZXJXaW5kb3cyID0gVGkuVUkuY3JlYXRlV2luZG93KHtcclxuXHRcdFx0dGl0bGU6J1Bob3RvcycsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjonI2ZmZmZmZidcclxuXHRcdH0pO1xyXG5cdFx0ZGV0YWlsQ29udGFpbmVyV2luZG93Mi5hZGQoZGV0YWlsVmlldzIpO1xyXG5cdFx0ZGV0YWlsQ29udGFpbmVyV2luZG93Mi5vcGVuKCk7IH0pO1xyXG5zZWxmLmFkZChidXR0b24yKTtcclxuc2VsZi5hZGQoY2FwdHVyZUJ0bik7XHJcblxyXG5cdHJldHVybiBzZWxmO1xyXG5cdFx0XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBNYWluOyJdLCJzb3VyY2VSb290IjoiQzpcXFVzZXJzXFx6b3pvXFxEb2N1bWVudHNcXEFwcGNlbGVyYXRvcl9TdHVkaW9fV29ya3NwYWNlXFxFeHBpcm1lbnRcXFJlc291cmNlc1xcVWkifQ==