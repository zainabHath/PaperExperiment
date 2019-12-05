/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-Present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_GESTURE
#import <JavaScriptCore/JavaScriptCore.h>
#import <TitaniumKit/ObjcProxy.h>

@protocol GestureExports <JSExport>

// Properties (and accessors)
READONLY_PROPERTY(BOOL, landscape, Landscape);
READONLY_PROPERTY(NSNumber *, orientation, Orientation);
READONLY_PROPERTY(BOOL, portrait, Portrait);

@end

@interface GestureModule : ObjcProxy <GestureExports> {
  NSTimeInterval lastShakeTime;
}

@end

#endif
