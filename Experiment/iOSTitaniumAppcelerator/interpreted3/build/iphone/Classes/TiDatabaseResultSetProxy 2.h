/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-Present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_DATABASE
@import JavaScriptCore;
@import TitaniumKit.ObjcProxy;
#import "DatabaseModule.h"
#import "PlausibleDatabase.h"

@class TiDatabaseProxy; // forward declare

@protocol TiDatabaseResultSetProxyExports <JSExport>
// Properties (and accessors)
READONLY_PROPERTY(NSInteger, fieldCount, FieldCount);
READONLY_PROPERTY(NSInteger, rowCount, RowCount);
READONLY_PROPERTY(BOOL, validRow, ValidRow);

// Methods
- (void)close;
JSExportAs(field,
           -(JSValue *)field
           : (NSInteger)index withType
           : (JSValue *)optionalType);
JSExportAs(fieldByName,
           -(JSValue *)fieldByName
           : (NSString *)name withType
           : (JSValue *)optionalType);
- (NSString *)fieldName:(NSInteger)index;
- (NSString *)getFieldName:(NSInteger)index;
- (BOOL)isValidRow;
- (BOOL)next;

@end

@interface TiDatabaseResultSetProxy : ObjcProxy <TiDatabaseResultSetProxyExports> {
  @private
  TiDatabaseProxy *database;
  PLSqliteResultSet *results;
  BOOL validRow;
  int rowCount;
}

/**
  @deprecated Only here for backwards compatibility with SDK < 8.1.0. Use `initWithResults:database:` instead.
  */
- (id)initWithResults:(PLSqliteResultSet *)results database:(TiDatabaseProxy *)database pageContext:(id<TiEvaluator>)context __attribute__((deprecated));
- (id)initWithResults:(PLSqliteResultSet *)results database:(TiDatabaseProxy *)database;

@end

#endif
