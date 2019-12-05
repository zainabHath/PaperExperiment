package com.zainab.experimentapp;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.Toast;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;

public class BrowseImages extends AppCompatActivity {
    RecyclerView mRecyclerView;
    int[] mPlaceList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_browse_images);
        Log.v("newPage","appear");
        mRecyclerView = (RecyclerView) findViewById(R.id.RV);
        GridLayoutManager mGridLayoutManager = new GridLayoutManager(BrowseImages.this, 2);
        mRecyclerView.setLayoutManager(mGridLayoutManager);
        String[] imageFileList;
        ArrayList<Bitmap> photo = new ArrayList<Bitmap>();
        try {
            Log.v("read","start");
            File file1 =new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "MyCameraApp");
             imageFileList = file1.list();
            for (int i = 0; i < imageFileList.length; i++) {
                Log.v("test",file1.getPath()+imageFileList[i]+"");
            }
                if (imageFileList != null) {
                    for (int i = 0; i < imageFileList.length; i++) {
                        try {
                          //  File imgFile = new  File(file1+imageFileList[i]);
                            //InputStream is = new URL( imgFile.getAbsolutePath() ).openStream();
                            Uri takenPhotoUri = Uri.fromFile(new File(file1,"/"+imageFileList[i]));
                            photo.add(BitmapFactory.decodeFile (takenPhotoUri.getPath()));
                        } catch (Exception e) {
                            Log.v("ttt",e.toString());
                            Toast.makeText(getApplicationContext(), e.toString(),Toast.LENGTH_LONG).show();
                        }
                    }
                    Log.v("read","done");

                }
        } catch (Exception e) {
        }
        Log.v("size",photo.size()+"");
        RVAdapter myAdapter = new RVAdapter(BrowseImages.this, photo);
        mRecyclerView.setAdapter(myAdapter);
    }
    public void onBackPressed() {
        super.onBackPressed();
        Log.v("Back", "start");
    }
}
