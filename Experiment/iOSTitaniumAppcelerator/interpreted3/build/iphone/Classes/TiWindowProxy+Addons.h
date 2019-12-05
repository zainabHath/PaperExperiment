/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018-present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#import <TitaniumKit/TiWindowProxy.h>

#ifdef USE_TI_UIIOSNAVIGATIONWINDOW
#import "TiUIiOSNavigationWindowProxy.h"
#endif
#ifdef USE_TI_UINAVIGATIONWINDOW
#import "TiUINavigationWindowProxy.h"
#endif

@interface TiWindowProxy (Addons)

#if defined(USE_TI_UINAVIGATIONWINDOW) || defined(USE_TI_UIIOSNAVIGATIONWINDOW)
- (TiUINavigationWindowProxy *)navigationWindow;
#endif

@end
