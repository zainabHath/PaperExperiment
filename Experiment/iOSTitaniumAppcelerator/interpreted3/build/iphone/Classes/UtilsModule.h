/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-Present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_UTILS

#import <JavaScriptCore/JavaScriptCore.h>
#import <TitaniumKit/ObjcProxy.h>

@class TiBlob;

@protocol UtilsExports <JSExport>

// TODO: Change from JSValue * to id argument once TiFile has been migrated to obj-c proxies
- (TiBlob *)base64decode:(JSValue *)obj;
- (TiBlob *)base64encode:(JSValue *)obj;
- (NSString *)md5HexDigest:(JSValue *)obj;
- (NSString *)sha1:(JSValue *)obj;
- (NSString *)sha256:(JSValue *)obj;

@end

@interface UtilsModule : ObjcProxy <UtilsExports>

@end

#endif
