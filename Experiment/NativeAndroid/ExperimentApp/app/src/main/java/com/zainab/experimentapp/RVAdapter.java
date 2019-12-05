package com.zainab.experimentapp;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import java.util.ArrayList;
import java.util.List;

public class RVAdapter extends RecyclerView.Adapter<PlaceViewHolder> {

private Context mContext;
    ArrayList<Bitmap> mPlaceList;

public RVAdapter(Context mContext, ArrayList<Bitmap>  mPlaceList) {
        this.mContext = mContext;
        this.mPlaceList = mPlaceList;
        }

@Override
public PlaceViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.rv_item,
        parent, false);
        return new PlaceViewHolder(view);
        }

@Override
public void onBindViewHolder(final PlaceViewHolder holder, int position) {
        holder.mPlace.setImageBitmap(mPlaceList.get(position));
        }

@Override
public int getItemCount() {
        return mPlaceList.size();
        }
        }

class PlaceViewHolder extends RecyclerView.ViewHolder {

    ImageView mPlace;

    public PlaceViewHolder(View itemView) {
        super(itemView);

        mPlace = (ImageView) itemView.findViewById(R.id.ivPlace);
    }
}
