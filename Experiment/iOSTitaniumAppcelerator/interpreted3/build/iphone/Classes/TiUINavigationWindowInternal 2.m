/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018-present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#if defined(USE_TI_UINAVIGATIONWINDOW) || defined(USE_TI_UIIOSNAVIGATIONWINDOW)

#import "TiUINavigationWindowInternal.h"
#import "TiUINavigationWindowProxy.h"

@implementation TiUINavigationWindowInternal

- (void)frameSizeChanged:(CGRect)frame bounds:(CGRect)bounds
{
  [(TiUINavigationWindowProxy *)[self proxy] _setFrame:bounds];
  [super frameSizeChanged:frame bounds:bounds];
}

@end

#endif
