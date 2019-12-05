package com.zainab.experimentapp;

import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.hardware.Camera;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CameraUI extends AppCompatActivity {
    private Camera mCamera;
    private CameraPreview mPreview;
    ImageView imageView;
    Button save;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera_ui);
        checkCameraHardware(this);
        // Create an instance of Camera
        mCamera = getCameraInstance();
        Log.v("camera+++","appear");
        imageView= (ImageView) findViewById(R.id.imagePreview);
        save= (Button) findViewById(R.id.saveB);

        // Create our Preview view and set it as the content of our activity.
        mPreview = new CameraPreview(this, mCamera);
        FrameLayout preview = (FrameLayout) findViewById(R.id.camera_preview);
        preview.addView(mPreview);
    }
    public void save(View view)
    {
        imageView.setVisibility(View.GONE);
        mPreview.setVisibility(View.VISIBLE);
        save.setVisibility(View.GONE);


    }
    public void takePic(View view)
    {
        mCamera.takePicture(null, null, mPicture);
    }
    /** Check if this device has a camera */
    private boolean checkCameraHardware(Context context) {
        if (context.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)){
            // this device has a camera
            return true;
        } else {
            // no camera on this device
            return false;
        }
    }
    public static Camera getCameraInstance(){
        Camera c = null;
        try {
            Log.v("camera+++","start");
            c = Camera.open(); // attempt to get a Camera instance
        }
        catch (Exception e){
            // Camera is not available (in use or does not exist)
        }
        return c; // returns null if camera is unavailable
    }

    /** Create a File for saving an image or video */
    private static File getOutputMediaFile(){
        File mediaStorageDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "MyCameraApp");

        // Create the storage directory if it does not exist
        if (! mediaStorageDir.exists()){
            if (! mediaStorageDir.mkdirs()){
                Log.d("MyCameraApp", "failed to create directory");
                return null;
            }
        }
        // Create a media file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        File mediaFile = new File(mediaStorageDir.getPath() + File.separator +
                    "IMG_"+ timeStamp + ".jpg");
        return mediaFile;
    }

    private Camera.PictureCallback mPicture = new Camera.PictureCallback() {

        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
           // imageView.setImageBitmap(rotateImages(BitmapFactory.decodeByteArray(data, 0, data.length)));
            imageView.setImageBitmap(BitmapFactory.decodeByteArray(data, 0, data.length));
            imageView.setVisibility(View.VISIBLE);
            mPreview.setVisibility(View.GONE);
            save.setVisibility(View.VISIBLE);
            File pictureFile = CameraUI.this.getOutputMediaFile();
            if (pictureFile == null){
                Log.d("pp", "Error creating media file, check storage permissions");
                return;
            }

            try {
                FileOutputStream fos = new FileOutputStream(pictureFile);
                Log.d("write","start");
                fos.write(data);
                fos.close();
                Log.d("write","saved");
            } catch (FileNotFoundException e) {
                Log.d("00", "File not found: " + e.getMessage());
            } catch (IOException e) {
                Log.d("oo", "Error accessing file: " + e.getMessage());
            }
        }
    };
}
