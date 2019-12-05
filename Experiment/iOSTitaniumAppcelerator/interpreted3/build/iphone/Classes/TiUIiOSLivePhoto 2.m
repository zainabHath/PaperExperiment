/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-Present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#import "TiUIiOSLivePhoto.h"
#import <TitaniumKit/TiBase.h>

@implementation TiUIiOSLivePhoto

- (NSString *)apiName
{
  return @"Ti.UI.iOS.LivePhoto";
}

- (instancetype)initWithLivePhoto:(PHLivePhoto *)livePhoto
{
  if (self = [self init]) {
    [self setLivePhoto:livePhoto];
  }

  return self;
}

- (void)dealloc
{
  RELEASE_TO_NIL(_livePhoto);
  [super dealloc];
}

@end
