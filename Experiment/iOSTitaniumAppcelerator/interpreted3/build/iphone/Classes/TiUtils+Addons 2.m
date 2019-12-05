/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2019-present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#import "TiUtils+Addons.h"

static NSString *kAppUUIDString = @"com.interpreted3.uuid";

@implementation TiUtils (Addons)

+ (NSString *)appIdentifier
{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *uid = [defaults stringForKey:kAppUUIDString];
  if (uid == nil) {
    uid = [TiUtils createUUID];
    [defaults setObject:uid forKey:kAppUUIDString];
    [defaults synchronize];
  }

  return uid;
}

@end
