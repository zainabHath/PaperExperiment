/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-Present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_CALENDAR

@import JavaScriptCore;
@import TitaniumKit.ObjcProxy;
@import EventKit;

@class CalendarModule; // forward declare
@class TiCalendarAlert;
@class TiCalendarAttendee;
@class TiCalendarRecurrenceRule;

@protocol TiCalendarEventExports <JSExport>
// properties (and accessors)
PROPERTY(NSArray<TiCalendarAlert *> *, alerts, Alerts);
PROPERTY(BOOL, allDay, AllDay);
READONLY_PROPERTY(NSArray<TiCalendarAttendee *> *, attendees, Attendees);
PROPERTY(EKEventAvailability, availability, Availability);
PROPERTY(NSDate *, begin, Begin);
PROPERTY(NSDate *, end, End);
READONLY_PROPERTY(BOOL, hasAlarm, HasAlarm);
READONLY_PROPERTY(NSString *, id, Id);
READONLY_PROPERTY(BOOL, isDetached, IsDetached);
PROPERTY(NSString *, location, Location);
PROPERTY(NSString *, notes, Notes);
PROPERTY(NSArray<TiCalendarRecurrenceRule *> *, recurrenceRules, RecurrenceRules);
READONLY_PROPERTY(EKEventStatus, status, Status);
PROPERTY(NSString *, title, Title);

// methods
- (void)addRecurrenceRule:(TiCalendarRecurrenceRule *)rule;
- (TiCalendarAlert *)createAlert:(NSDictionary *)properties;
- (TiCalendarRecurrenceRule *)createRecurrenceRule:(NSDictionary *)properties;
- (BOOL)refresh;
- (BOOL)remove:(EKSpan)span;
- (void)removeRecurrenceRule:(TiCalendarRecurrenceRule *)rule;
- (BOOL)save:(EKSpan)span;

@end

@interface TiCalendarEvent : ObjcProxy <TiCalendarEventExports> {
  @private

  CalendarModule *module;
  EKEvent *event;
}

/**
  @deprecated Only here for backwards compatibility with SDK < 8.1.0. Use `initWithEvent:calendar:module:` instead.
  */
- (id)_initWithPageContext:(id<TiEvaluator>)context event:(EKEvent *)event_ calendar:(EKCalendar *)calendar_ module:(CalendarModule *)module_ __attribute__((deprecated));
- (id)initWithEvent:(EKEvent *)event_ calendar:(EKCalendar *)calendar_ module:(CalendarModule *)module_;
- (EKEvent *)event;
+ (NSArray<TiCalendarEvent *> *)convertEvents:(NSArray<EKEvent *> *)events_ calendar:(EKCalendar *)calendar_ module:(CalendarModule *)module_;

@end

#endif
