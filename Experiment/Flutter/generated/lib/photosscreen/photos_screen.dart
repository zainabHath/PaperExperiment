import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:camera/camera.dart';


class PhotosScreen extends StatefulWidget {
  _PhotosScreenState createState() => _PhotosScreenState();
}

class _PhotosScreenState extends State<PhotosScreen> {

  List<String> _images = List<String>();

  @override
  void initState() {
    // This is the proper place to make the async calls
    // This way they only get called once

    // During development, if you change this code,
    // you will need to do a full restart instead of just a hot reload

    // You can't use async/await here,
    // We can't mark this method as async because of the @override
    getImages().then((result) {
      // If we need to rebuild the widget with the resulting data,
      // make sure to use `setState`
      setState(() {
        _images = result;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Photos"),
      ), 
      body: new Center(
        child: _images == null ? Container() : buildGrid(),
      ),
    );
  }

  Widget buildGrid() {
    
    return new GridView.builder(
      itemCount: _images.length,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          childAspectRatio: 1.0,
      ),
      itemBuilder: (context, i ){
        print(i) ;
        return new Container(child: FittedBox(
          child: new Image.file(File(_images[i])),
          fit: BoxFit.cover,
        ));
      },
    );

    /* return new GridView.extent(
      maxCrossAxisExtent: 150.0,
      padding: const EdgeInsets.all(4.0),
      mainAxisSpacing: 4.0,
      crossAxisSpacing: 4.0,
      children: _buildGridTileList(30)); */
  }

  Future _getThingsOnStartup() async {
    getImages();
  }

  Future<List<String>> getImages() async {

    final directory = await getApplicationDocumentsDirectory();
    String directoryString = directory.path;
    String imagesDirectory = '$directoryString/pictures/';

    final myDir = new Directory(imagesDirectory);
    List<FileSystemEntity> imagesFiles = List<FileSystemEntity>();
    imagesFiles = myDir.listSync(recursive: true, followLinks: false);
    print(imagesFiles);
    List<String> images = List<String>();
    for (int i = 0; i < imagesFiles.length; i++) {
      images.add(imagesFiles[i].path);
    }
    return images;
  }
}