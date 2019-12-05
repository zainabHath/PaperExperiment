/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2019 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#ifdef USE_TI_APPIOS

#import "TiAppiOSUserNotificationCenterProxy.h"
#import "TiAppiOSLocalNotificationProxy.h"
#import "TiAppiOSUserNotificationCategoryProxy.h"
#import <CoreLocation/CoreLocation.h>

@implementation TiAppiOSUserNotificationCenterProxy

- (NSString *)apiName
{
  return @"Ti.App.iOS.UserNotificationCenter";
}

- (void)getPendingNotifications:(id)callback
{
  ENSURE_SINGLE_ARG(callback, KrollCallback);

  if ([TiUtils isIOSVersionOrGreater:@"10.0"]) {
    [[UNUserNotificationCenter currentNotificationCenter] getPendingNotificationRequestsWithCompletionHandler:^(NSArray<UNNotificationRequest *> *requests) {
      NSMutableArray *result = [NSMutableArray arrayWithCapacity:[requests count]];

      for (UNNotificationRequest *request in requests) {
        [result addObject:[self dictionaryWithUserNotificationRequest:request]];
      }

      NSDictionary *propertiesDict = @{
        @"notifications" : result
      };
      NSArray *invocationArray = [[NSArray alloc] initWithObjects:&propertiesDict count:1];

      [callback call:invocationArray thisObject:self];
      [invocationArray release];
    }];
  } else {
    NSArray<UILocalNotification *> *notifications = [[UIApplication sharedApplication] scheduledLocalNotifications];
    NSMutableArray *result = [NSMutableArray arrayWithCapacity:[notifications count]];

    for (UILocalNotification *notification in notifications) {
      [result addObject:[TiApp dictionaryWithLocalNotification:notification withIdentifier:notification.userInfo[@"id"]]];
    }

    NSDictionary *propertiesDict = @{
      @"notifications" : result
    };
    NSArray *invocationArray = [[NSArray alloc] initWithObjects:&propertiesDict count:1];

    [callback call:invocationArray thisObject:self];
    [invocationArray release];
  }
}

- (void)getDeliveredNotifications:(id)callback
{
  ENSURE_SINGLE_ARG(callback, KrollCallback);

  if ([TiUtils isIOSVersionOrGreater:@"10.0"]) {
    [[UNUserNotificationCenter currentNotificationCenter] getDeliveredNotificationsWithCompletionHandler:^(NSArray<UNNotification *> *notifications) {
      NSMutableArray *result = [NSMutableArray arrayWithCapacity:[notifications count]];

      for (UNNotification *notification in notifications) {
        [result addObject:[self dictionaryWithUserNotificationRequest:[notification request]]];
      }

      NSDictionary *propertiesDict = @{
        @"notifications" : result
      };
      NSArray *invocationArray = [[NSArray alloc] initWithObjects:&propertiesDict count:1];

      [callback call:invocationArray thisObject:self];
      [invocationArray release];
    }];
  } else {
    DebugLog(@"[ERROR] Ti.App.iOS.UserNotificationCenter.getDeliveredNotifications() is only available in iOS 10 and later.");
  }
}

- (void)removePendingNotifications:(id)args
{
  ENSURE_SINGLE_ARG_OR_NIL(args, NSArray);

  if ([TiUtils isIOSVersionOrGreater:@"10.0"]) {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    if (args == nil || [args count] == 0) {
      [center removeAllPendingNotificationRequests];
      return;
    }

    [center getPendingNotificationRequestsWithCompletionHandler:^(NSArray<UNNotificationRequest *> *requests) {
      NSMutableArray<NSString *> *identifiers = [NSMutableArray new];
      for (UNNotificationRequest *request in requests) {
        for (id notification in args) {
          ENSURE_TYPE(notification, NSDictionary);

          if ([request.identifier isEqual:notification[@"identifier"]]) {
            [identifiers addObject:request.identifier];
          }
        }
      }
      if (identifiers.count > 0) {
        [center removePendingNotificationRequestsWithIdentifiers:identifiers];
      }
    }];
  } else {
    TiThreadPerformOnMainThread(^{
      if (args == nil || [args count] == 0) {
        [[UIApplication sharedApplication] cancelAllLocalNotifications];
        return;
      }

      for (UILocalNotification *scheduledNotification in UIApplication.sharedApplication.scheduledLocalNotifications) {
        for (id notification in args) {
          ENSURE_TYPE(notification, NSDictionary);

          if ([notification[@"userInfo"][@"id"] isEqual:scheduledNotification.userInfo[@"id"]]) {
            [UIApplication.sharedApplication cancelLocalNotification:scheduledNotification];
            break;
          }
        }
      }
    },
        NO);
  }
}

- (void)removeDeliveredNotifications:(id)args
{
  ENSURE_SINGLE_ARG_OR_NIL(args, NSArray);

  if ([TiUtils isIOSVersionOrGreater:@"10.0"]) {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];

    if ([args count] == 0) {
      [center removeAllDeliveredNotifications];
      return;
    }

    [center getDeliveredNotificationsWithCompletionHandler:^(NSArray<UNNotification *> *notifications) {
      NSMutableArray<NSString *> *identifiers = [NSMutableArray new];
      for (UNNotification *deliveredNotification in notifications) {
        for (id notification in args) {
          ENSURE_TYPE(notification, NSDictionary);

          if ([deliveredNotification.request.identifier isEqual:notification[@"identifier"]]) {
            [identifiers addObject:deliveredNotification.request.identifier];
          }
        }
      }
      if (identifiers.count > 0) {
        [center removeDeliveredNotificationsWithIdentifiers:identifiers];
      }
    }];
  } else {
    DebugLog(@"[ERROR] Ti.App.iOS.UserNotificationCenter.removeDeliveredNotifications() is only available in iOS 10 and later.");
  }
}

- (void)requestUserNotificationSettings:(id)callback
{
  ENSURE_SINGLE_ARG(callback, KrollCallback);

  if ([TiUtils isIOSVersionOrGreater:@"10.0"]) {
    [[UNUserNotificationCenter currentNotificationCenter] getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings *settings) {
      NSMutableDictionary *propertiesDict = [@{
        @"authorizationStatus" : @([settings authorizationStatus]),
        @"soundSetting" : @([settings soundSetting]),
        @"badgeSetting" : @([settings badgeSetting]),
        @"alertSetting" : @([settings alertSetting]),
        @"notificationCenterSetting" : @([settings notificationCenterSetting]),
        @"lockScreenSetting" : @([settings lockScreenSetting]),
        @"carPlaySetting" : @([settings carPlaySetting]),
        @"alertStyle" : @([settings alertStyle])
      } mutableCopy];
#if IS_SDK_IOS_11
      if ([TiUtils isIOSVersionOrGreater:@"11.0"]) {
        propertiesDict[@"showPreviewsSetting"] = @([settings showPreviewsSetting]);
      }
#endif
#if IS_SDK_IOS_12
      if ([TiUtils isIOSVersionOrGreater:@"12.0"]) {
        propertiesDict[@"criticalAlertSetting"] = @([settings criticalAlertSetting]);
        propertiesDict[@"providesAppNotificationSettings"] = @([settings providesAppNotificationSettings]);
      }
#endif
      NSArray *invocationArray = [[NSArray alloc] initWithObjects:&propertiesDict count:1];

      [callback call:invocationArray thisObject:self];
      [invocationArray release];
    }];
  } else {
    TiThreadPerformOnMainThread(^{
      UIUserNotificationSettings *settings = [[UIApplication sharedApplication] currentUserNotificationSettings];

      NSDictionary *propertiesDict = [self formatUserNotificationSettings:settings];
      NSArray *invocationArray = [[NSArray alloc] initWithObjects:&propertiesDict count:1];

      [callback call:invocationArray thisObject:self];
      [invocationArray release];
    },
        YES);
  }
}

#pragma mark Utilities

- (NSDictionary *)dictionaryWithUserNotificationRequest:(UNNotificationRequest *)request
{
  NSMutableDictionary *event = [NSMutableDictionary dictionary];

  [event setObject:[[NSTimeZone defaultTimeZone] name] forKey:@"timezone"];
  [event setObject:NULL_IF_NIL([[request content] body]) forKey:@"alertBody"];
  [event setObject:NULL_IF_NIL([[request content] title]) forKey:@"alertTitle"];
  [event setObject:NULL_IF_NIL([[request content] subtitle]) forKey:@"alertSubtitle"];
  [event setObject:NULL_IF_NIL([[request content] launchImageName]) forKey:@"alertLaunchImage"];
  [event setObject:NULL_IF_NIL([[request content] badge]) forKey:@"badge"];
  [event setObject:NULL_IF_NIL([[request content] userInfo]) forKey:@"userInfo"];
  [event setObject:NULL_IF_NIL([[request content] categoryIdentifier]) forKey:@"category"];
  [event setObject:NULL_IF_NIL([request identifier]) forKey:@"identifier"];

  // iOS 10+ does have "soundName" but "sound" which is a native object. But if we find
  // a sound in the APS dictionary, we can provide that one for parity
  if (request.content.userInfo[@"aps"] && request.content.userInfo[@"aps"][@"sound"]) {
    [event setObject:request.content.userInfo[@"aps"][@"sound"] forKey:@"sound"];
  }

  if ([[request trigger] isKindOfClass:[UNCalendarNotificationTrigger class]]) {
    [event setObject:NULL_IF_NIL([(UNCalendarNotificationTrigger *)[request trigger] nextTriggerDate]) forKey:@"date"];
  } else if ([[request trigger] isKindOfClass:[UNLocationNotificationTrigger class]]) {
    CLCircularRegion *region = (CLCircularRegion *)[(UNLocationNotificationTrigger *)[request trigger] region];

    NSDictionary *dict = @{
      @"latitude" : NUMDOUBLE(region.center.latitude),
      @"longitude" : NUMDOUBLE(region.center.longitude),
      @"radius" : NUMDOUBLE(region.radius),
      @"identifier" : region.identifier
    };
    [event setObject:dict forKey:@"region"];
  }

  return event;
}

- (NSDictionary *)formatUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  if (![NSThread isMainThread]) {
    __block NSDictionary *result = nil;
    TiThreadPerformOnMainThread(^{
      result = [[self formatUserNotificationSettings:notificationSettings] retain];
    },
        YES);
    return [result autorelease];
  }
  NSMutableArray *typesArray = [NSMutableArray array];
  NSMutableArray *categoriesArray = [NSMutableArray array];

  NSUInteger types = notificationSettings.types;
  NSSet *categories = notificationSettings.categories;

  // Types
  if ((types & UIUserNotificationTypeBadge) != 0) {
    [typesArray addObject:NUMINT(UIUserNotificationTypeBadge)];
  }
  if ((types & UIUserNotificationTypeAlert) != 0) {
    [typesArray addObject:NUMINT(UIUserNotificationTypeAlert)];
  }
  if ((types & UIUserNotificationTypeSound) != 0) {
    [typesArray addObject:NUMINT(UIUserNotificationTypeSound)];
  }

  // Categories
  for (id cat in categories) {
    TiAppiOSUserNotificationCategoryProxy *categoryProxy = [[[TiAppiOSUserNotificationCategoryProxy alloc] _initWithPageContext:[self executionContext]] autorelease];
    categoryProxy.notificationCategory = cat;
    [categoriesArray addObject:categoryProxy];
  }

  return @{
    @"types" : typesArray,
    @"categories" : categoriesArray
  };
}

@end
#endif
