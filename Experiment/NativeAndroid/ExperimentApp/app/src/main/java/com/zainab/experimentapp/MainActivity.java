package com.zainab.experimentapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void openCamera(View view)
    {
        Intent intent=new Intent(MainActivity.this,CameraUI.class);
        startActivity(intent);
    }
    public void browsePhotos(View view)
    {
        Intent intent=new Intent(MainActivity.this,BrowseImages.class);
        Log.v("newPage","start");
        startActivity(intent);
    }
    @Override
    protected void onResume() {
        super.onResume();
        Log.v("Back", "appear");
    }

}
