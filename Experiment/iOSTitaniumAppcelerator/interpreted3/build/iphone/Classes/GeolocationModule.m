/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-Present by interpreted3, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_GEOLOCATION

#import "GeolocationModule.h"
#import "TiUtils+Addons.h"
#import <TitaniumKit/APSHTTPClient.h>
#import <TitaniumKit/NSData+Additions.h>
#import <TitaniumKit/TiApp.h>

#import <sys/utsname.h>

extern NSString *const TI_APPLICATION_GUID;

@interface GeolocationCallback : NSObject <APSHTTPRequestDelegate> {
  JSValue *callback;
}
- (id)initWithCallback:(JSValue *)callback;
@end

@implementation GeolocationCallback

- (id)initWithCallback:(JSValue *)callback_
{
  //Ignore analyzer warning here. Delegate will call autorelease onLoad or onError.
  if (self = [super init]) {
    // FIXME Use JSManagedValue here?
    callback = [callback_ retain];
  }
  return self;
}

- (void)dealloc
{
  RELEASE_TO_NIL(callback);
  [super dealloc];
}

- (void)start:(NSDictionary *)params
{
  // https://api.appcelerator.net/p/v1/geo
  NSString *kGeolocationURL = stringWithHexString(@"68747470733a2f2f6170692e61707063656c657261746f722e636f6d2f702f76312f67656f");

  NSMutableString *url = [[[NSMutableString alloc] init] autorelease];
  [url appendString:kGeolocationURL];
  [url appendString:@"?"];
  for (id key in params) {
    NSString *value = [TiUtils stringValue:[params objectForKey:key]];
    [url appendFormat:@"%@=%@&", key, [value stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]]];
  }

  APSHTTPRequest *req = [[APSHTTPRequest alloc] init];
  [req addRequestHeader:@"User-Agent" value:[[TiApp app] systemUserAgent]];
  [req setUrl:[NSURL URLWithString:url]];
  [req setDelegate:self];
  [req setMethod:@"GET"];
  // Place it in the main thread since we're not using a queue and yet we need the
  // delegate methods to be called...
  TiThreadPerformOnMainThread(^{
    [req send];
    [req autorelease];
  },
      NO);
}

- (void)requestSuccess:(NSString *)data
{
}

- (void)requestError:(NSError *)error
{
  NSDictionary *event = [TiUtils dictionaryWithCode:[error code] message:[TiUtils messageFromError:error]];
  [callback callWithArguments:@[ event ]];
}

- (void)request:(APSHTTPRequest *)request onLoad:(APSHTTPResponse *)response
{
  [[TiApp app] stopNetwork];

  if (request != nil && [response error] == nil) {
    NSString *data = [response responseString];
    [self requestSuccess:data];
  } else {
    [self requestError:[response error]];
  }

  [self autorelease];
}

- (void)request:(APSHTTPRequest *)request onError:(APSHTTPResponse *)response
{
  [[TiApp app] stopNetwork];
  [self requestError:[response error]];
  [self autorelease];
}

@end

@interface ForwardGeoCallback : GeolocationCallback
@end

@interface ReverseGeoCallback : GeolocationCallback
@end

@implementation ForwardGeoCallback

- (void)requestSuccess:(NSString *)locationString
{
  NSMutableDictionary *event = nil;

  NSArray *listItems = [locationString componentsSeparatedByString:@","];
  if ([listItems count] == 4 && [[listItems objectAtIndex:0] isEqualToString:@"200"]) {
    id accuracy = [listItems objectAtIndex:1];
    id latitude = [listItems objectAtIndex:2];
    id longitude = [listItems objectAtIndex:3];
    event = [TiUtils dictionaryWithCode:0 message:nil];
    [event setObject:accuracy forKey:@"accuracy"];
    [event setObject:latitude forKey:@"latitude"];
    [event setObject:longitude forKey:@"longitude"];
  } else {
    //TODO: better error handling
    event = [TiUtils dictionaryWithCode:-1 message:@"error obtaining geolocation"];
  }

  [callback callWithArguments:@[ event ]];
}

@end

@implementation ReverseGeoCallback

- (void)requestSuccess:(NSString *)locationString
{
  NSError *error = nil;
  id event = [TiUtils jsonParse:locationString error:&error];
  if (error != nil) {
    [self requestError:error];
  } else {
    BOOL success = [TiUtils boolValue:@"success" properties:event def:YES];
    NSMutableDictionary *revisedEvent = [TiUtils dictionaryWithCode:success ? 0 : -1 message:success ? nil : @"error reverse geocoding"];
    [revisedEvent setValuesForKeysWithDictionary:event];
    // TODO: Remove the zipcode and country_code values after on SDK 9.0.0!
    NSArray<NSMutableDictionary *> *places = (NSArray<NSMutableDictionary *> *)revisedEvent[@"places"];
    for (NSMutableDictionary *dict in places) {
      dict[@"postalCode"] = dict[@"zipcode"];
      dict[@"countryCode"] = dict[@"country_code"];
    }
    NSLog(@"[WARN] GeocodedAddress properties country_code and zipcode are deprecated in SDK 8.0.0 and will be removed in 9.0.0");
    NSLog(@"[WARN] Please replace usage with the respective properties: countryCode and postalCode");
    [callback callWithArguments:@[ revisedEvent ]];
  }
}

@end

@implementation GeolocationModule

@synthesize allowsBackgroundLocationUpdates, showCalibration;

#pragma mark Internal

// TODO: Do we need to force this onto the main thread?
- (void)shutdownLocationManager
{
  [lock lock];
  if (locationManager == nil) {
    [lock unlock];
    return;
  }

  if (trackingHeading) {
    [locationManager stopUpdatingHeading];
  }

  if (trackingLocation) {
    if (trackSignificantLocationChange) {
      [locationManager stopMonitoringSignificantLocationChanges];
    } else {
      [locationManager stopUpdatingLocation];
    }
  }
  RELEASE_TO_NIL_AUTORELEASE(locationManager);
  [lock unlock];
}

- (void)dealloc
{
  [self shutdownLocationManager];
  [self releaseSingleshotListeners];
  RELEASE_TO_NIL(tempManager);
  RELEASE_TO_NIL(locationPermissionManager);
  RELEASE_TO_NIL(purpose);
  RELEASE_TO_NIL(lock);
  RELEASE_TO_NIL(lastLocationDict);
  [super dealloc];
}

- (NSString *)apiName
{
  return @"Ti.Geolocation";
}

/**
 * Returns true iff the array was not nil, and all entries have now been removed.
 */
- (BOOL)releaseStoredCallbackArray:(NSMutableArray *)array
{
  if (array != nil) {
    for (JSManagedValue *callback in [NSArray arrayWithArray:array]) {
      [array removeObject:callback];
      [[callback value].context.virtualMachine removeManagedReference:callback withOwner:self];
    }
    if ([array count] == 0) {
      RELEASE_TO_NIL(array);
      return YES;
    }
  }
  return NO;
}

- (void)releaseSingleshotListeners
{
  if ([self releaseStoredCallbackArray:singleHeading]) {
    [locationManager stopUpdatingHeading];
  }
  if ([self releaseStoredCallbackArray:singleLocation]) {
    [locationManager stopUpdatingLocation];
  }
}

- (id)init
{
  if (self = [super init]) {
    // reasonable defaults:

    // accuracy by default
    accuracy = kCLLocationAccuracyThreeKilometers;

    // distance filter by default is notify of all movements
    distance = kCLDistanceFilterNone;

    // minimum heading filter by default
    heading = kCLHeadingFilterNone;

    // should we show heading calibration dialog? defaults to YES
    showCalibration = YES;

    // track all location changes by default
    trackSignificantLocationChange = NO;

    // activity Type by default
    activityType = CLActivityTypeOther;

    // pauseLocationupdateAutomatically by default NO
    pauseLocationUpdateAutomatically = NO;

    // Set the default based on if the user has defined a background location mode
    NSArray *backgroundModes = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"UIBackgroundModes"];
    self.allowsBackgroundLocationUpdates = ([backgroundModes containsObject:@"location"]);

    // Per default, background location indicators are not visible
    showBackgroundLocationIndicator = NO;

    lock = [[NSRecursiveLock alloc] init];
  }
  return self;
}

- (CLLocationManager *)locationManager
{
  [lock lock];
  if (locationManager == nil) {
    RELEASE_TO_NIL(tempManager);
    locationManager = [[CLLocationManager alloc] init];
    locationManager.delegate = self;
    if (!trackSignificantLocationChange) {
      if (accuracy != -1) {
        locationManager.desiredAccuracy = accuracy;
      } else {
        locationManager.desiredAccuracy = kCLLocationAccuracyThreeKilometers;
      }
      locationManager.distanceFilter = distance;
    }
    locationManager.headingFilter = heading;

    if ([CLLocationManager authorizationStatus] != kCLAuthorizationStatusAuthorizedAlways &&
        [CLLocationManager authorizationStatus] != kCLAuthorizationStatusAuthorizedWhenInUse) {
      NSLog(@"[WARN] Trying to use location services without requesting location permissions. Use either:\n\n"
             "Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {\n"
             "\t// Handle authorization via e.success\n"
             "})\n\n"
             "or\n\n"
             "Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {\n"
             "\t// Handle authorization via e.success\n"
             "})\nPicking the hightest permission by default.");
      if ([TiUtils isIOSVersionOrGreater:@"11.0"] && ![[NSBundle mainBundle] objectForInfoDictionaryKey:kTiGeolocationUsageDescriptionWhenInUse]) {
        NSLog(@"[WARN] Apps targeting iOS 11 and later always have to include the \"%@\" key in the tiapp.xml <plist> section in order to use any geolocation-services. This is a constraint Apple introduced to improve user-privacy by suggesting developers to incrementally upgrade the location permissions from \"When in Use\" to \"Always\" only if necessary. You can specify the new iOS 11+ plist-key \"%@\" which is used while upgrading from \"When in Use\" to \"Always\". Use the the Ti.Geolocation.requestLocationPermissions method, which should be called before using any Ti.Geolocation related API. Please verify location permissions and call this method again.", kTiGeolocationUsageDescriptionWhenInUse, kTiGeolocationUsageDescriptionAlwaysAndWhenInUse);
      }

      if ([GeolocationModule hasAlwaysPermissionKeys]) {
        [locationManager requestAlwaysAuthorization];
      } else if ([GeolocationModule hasWhenInUsePermissionKeys]) {
        [locationManager requestWhenInUseAuthorization];
      } else {
        if ([TiUtils isIOSVersionOrGreater:@"11.0"]) {
          NSLog(@"[ERROR] If you are only using geolocation-services *when in use*, you only need to specify the %@ key in your tiapp.xml", kTiGeolocationUsageDescriptionWhenInUse);
          NSLog(@"[ERROR] If you are *always*  using geolocation-servcies, you need to specify the following three keys in your tiapp.xml:\n  * %@\n  * %@\n  * %@", kTiGeolocationUsageDescriptionWhenInUse, kTiGeolocationUsageDescriptionAlways, kTiGeolocationUsageDescriptionAlwaysAndWhenInUse);
        } else {
          NSLog(@"[ERROR] The keys %@ or %@ are not defined in your tiapp.xml. Starting with iOS 8 this is required.", kTiGeolocationUsageDescriptionAlways, kTiGeolocationUsageDescriptionWhenInUse);
        }
      }
    }

    locationManager.allowsBackgroundLocationUpdates = allowsBackgroundLocationUpdates;

#if IS_SDK_IOS_11
    if ([TiUtils isIOSVersionOrGreater:@"11.0"]) {
      locationManager.showsBackgroundLocationIndicator = showBackgroundLocationIndicator;
    }
#endif
    locationManager.activityType = activityType;
    locationManager.pausesLocationUpdatesAutomatically = pauseLocationUpdateAutomatically;

    if (![CLLocationManager locationServicesEnabled]) {
      // NOTE: This is from the Apple example and it works well. the developer can still check for the
      // property and do this message themselves before calling geo. But if they don't, we at least do it for them.
      NSString *title = NSLocalizedString(@"Location Services Disabled", @"Location Services Disabled Alert Title");
      NSString *msg = NSLocalizedString(@"You currently have all location services for this device disabled. If you proceed, you will be asked to confirm whether location services should be reenabled.", @"Location Services Disabled Alert Message");
      NSString *ok = NSLocalizedString(@"OK", @"Location Services Disabled Alert OK Button");

      UIAlertController *alertController = [UIAlertController alertControllerWithTitle:title message:msg preferredStyle:UIAlertControllerStyleAlert];
      UIAlertAction *action = [UIAlertAction actionWithTitle:ok style:UIAlertActionStyleCancel handler:nil];
      [alertController addAction:action];
      [[TiApp app] showModalController:alertController animated:YES];
    }
  }
  [lock unlock];
  return locationManager;
}

// this is useful for a few methods below that need to use an instance but we
// don't necessarily want to hold on to this guy
- (CLLocationManager *)tempLocationManager
{
  if (locationManager != nil) {
    // if we have an instance, just use it
    return locationManager;
  }

  if (tempManager == nil) {
    tempManager = [[CLLocationManager alloc] init];
  }
  return tempManager;
}

- (void)startStopLocationManagerIfNeeded
{
  BOOL startHeading = NO;
  BOOL startLocation = NO;

  if (singleHeading != nil && [singleHeading count] > 0) {
    startHeading = YES;
  }
  if (singleLocation != nil && [singleLocation count] > 0) {
    startLocation = YES;
  }
  if (!startHeading && [self _hasListeners:@"heading"]) {
    startHeading = YES;
  }
  if (!startLocation && [self _hasListeners:@"location"]) {
    startLocation = YES;
  }

  if (startHeading || startLocation) {
    CLLocationManager *lm = [self locationManager];
    if (startHeading && !trackingHeading) {
      [lm startUpdatingHeading];
      trackingHeading = YES;
    }
    if (startLocation && !trackingLocation) {
      if (trackSignificantLocationChange) {
        [lm startMonitoringSignificantLocationChanges];
      } else {
        [lm startUpdatingLocation];
      }
      trackingLocation = YES;
    }
  } else if ((!startHeading || !startLocation) && locationManager != nil) {
    CLLocationManager *lm = [self locationManager];
    if (!startHeading && trackingHeading) {
      trackingHeading = NO;
      [lm stopUpdatingHeading];
    }
    if (!startLocation && trackingLocation) {
      trackingLocation = NO;
      if (trackSignificantLocationChange) {
        [lm stopMonitoringSignificantLocationChanges];
      } else {
        [lm stopUpdatingLocation];
      }
    }
    if ((!startHeading && !startLocation) || (!trackingHeading && !trackingLocation)) {
      [self shutdownLocationManager];
      trackingLocation = NO;
      trackingHeading = NO;
    }
  }
}

- (void)_listenerAdded:(NSString *)type count:(int)count
{
  BOOL startStop = NO;

  if (count == 1 && [type isEqualToString:@"heading"]) {
    startStop = YES;
  } else if (count == 1 && [type isEqualToString:@"location"]) {
    startStop = YES;
  }

  if (startStop) {
    TiThreadPerformOnMainThread(^{
      [self startStopLocationManagerIfNeeded];
    },
        NO);
  }
}

- (void)_listenerRemoved:(NSString *)type count:(int)count
{
  BOOL check = NO;
  if (count == 0 && [type isEqualToString:@"heading"]) {
    check = YES;
    if (trackingHeading) {
      trackingHeading = NO;
      [locationManager stopUpdatingHeading];
    }
  } else if (count == 0 && [type isEqualToString:@"location"]) {
    check = YES;
    if (trackingLocation) {
      trackingLocation = NO;
      [locationManager stopUpdatingLocation];
    }
  }

  if (check && ![self _hasListeners:@"heading"] && ![self _hasListeners:@"location"]) {
    TiThreadPerformOnMainThread(^{
      [self startStopLocationManagerIfNeeded];
    },
        YES);
    [self shutdownLocationManager];
    trackingLocation = NO;
    trackingHeading = NO;
    [self releaseSingleshotListeners];
  }
}

- (BOOL)headingAvailable
{
  return [CLLocationManager headingAvailable];
}

#pragma mark Public APIs

- (BOOL)hasCompass
{
  return [self headingAvailable];
}

GETTER_IMPL(BOOL, hasCompass, HasCompass);

- (void)performGeo:(NSString *)direction address:(NSString *)address callback:(GeolocationCallback *)callback
{
  [[TiApp app] startNetwork];

  id aguid = TI_APPLICATION_GUID;
  id sid = [[TiApp app] sessionId];

  NSDictionary *params = @{
    @"d" : direction,
    @"aguid" : aguid,
    @"mid" : [TiUtils appIdentifier],
    @"sid" : sid,
    @"q" : address,
    @"c" : [[NSLocale currentLocale] objectForKey:NSLocaleCountryCode]
  };
  [callback start:params];
}

- (void)reverseGeocoder:(double)latitude longitude:(double)longitude withCallback:(JSValue *)callback
{
#ifndef __clang_analyzer__ // Ignore static analyzer error here, memory will be released. See TIMOB-19444
  ReverseGeoCallback *rcb = [[ReverseGeoCallback alloc] initWithCallback:callback];
  [self performGeo:@"r" address:[NSString stringWithFormat:@"%f,%f", latitude, longitude] callback:rcb];
#endif
}

- (void)forwardGeocoder:(NSString *)address withCallback:(JSValue *)callback
{
#ifndef __clang_analyzer__ // Ignore static analyzer error here, memory will be released. See TIMOB-19444
  ForwardGeoCallback *fcb = [[ForwardGeoCallback alloc] initWithCallback:callback];
  [self performGeo:@"f" address:address callback:fcb];
#endif
}

- (void)getCurrentHeading:(JSValue *)callback
{
  ENSURE_UI_THREAD(getCurrentHeading, callback);
  if (singleHeading == nil) {
    singleHeading = [[NSMutableArray alloc] initWithCapacity:1];
  }

  // Need to use JSManagedValue here!
  JSManagedValue *managedValue = [JSManagedValue managedValueWithValue:callback andOwner:self];
  [singleHeading addObject:managedValue];
  [self startStopLocationManagerIfNeeded];
}

- (void)getCurrentPosition:(JSValue *)callback
{
  ENSURE_UI_THREAD(getCurrentPosition, callback);

  // If the location updates are started, invoke the callback directly.
  if (locationManager != nil && locationManager.location != nil && trackingLocation) {
    CLLocation *currentLocation = locationManager.location;
    NSMutableDictionary *event = [TiUtils dictionaryWithCode:0 message:nil];
    event[@"coords"] = [self locationDictionary:currentLocation];
    event[@"type"] = @"location";
    event[@"source"] = self;
    // FIXME queue this up to happen async
    [callback callWithArguments:@[ event ]];
  }
  // Otherwise, start the location manager.
  else {
    if (singleLocation == nil) {
      singleLocation = [[NSMutableArray alloc] initWithCapacity:1];
    }
    // Need to use JSManagedValue here!
    JSManagedValue *managedValue = [JSManagedValue managedValueWithValue:callback andOwner:self];
    [callback.context.virtualMachine addManagedReference:managedValue withOwner:self];
    [singleLocation addObject:managedValue];
    [self startStopLocationManagerIfNeeded];
  }
}

- (NSString *)lastGeolocation
{
  return [TiUtils jsonStringify:lastLocationDict error:nil];
}

- (CLLocationAccuracy)accuracy
{
  return accuracy;
}

- (void)setAccuracy:(CLLocationAccuracy)value
{
  ENSURE_UI_THREAD(setAccuracy, value);

  accuracy = value;
  // don't prematurely start it
  if (locationManager != nil) {
    [locationManager setDesiredAccuracy:accuracy];
  }
}

READWRITE_IMPL(CLLocationAccuracy, accuracy, Accuracy);

- (CLLocationDistance)distanceFilter
{
  return distance;
}

- (void)setDistanceFilter:(CLLocationDistance)value
{
  ENSURE_UI_THREAD(setDistanceFilter, value);
  distance = value;
  // don't prematurely start it
  if (locationManager != nil) {
    [locationManager setDistanceFilter:distance];
  }
}

READWRITE_IMPL(CLLocationDistance, distanceFilter, DistanceFilter);

- (CLLocationDegrees)headingFilter
{
  return heading;
}

- (void)setHeadingFilter:(CLLocationDegrees)value
{
  ENSURE_UI_THREAD(setHeadingFilter, value);
  heading = value;
  // don't prematurely start it
  if (locationManager != nil) {
    [locationManager setHeadingFilter:heading];
  }
}

READWRITE_IMPL(CLLocationDegrees, headingFilter, HeadingFilter);

- (BOOL)showBackgroundLocationIndicator
{
#if IS_SDK_IOS_11
  if ([TiUtils isIOSVersionOrGreater:@"11.0"]) {
    return showBackgroundLocationIndicator;
  }
#endif
  DebugLog(@"[ERROR] The showBackgroundLocationIndicator property is only available on iOS 11.0+. Returning \"false\" ...");
  return NO;
}

- (void)setShowBackgroundLocationIndicator:(BOOL)value
{
#if IS_SDK_IOS_11
  if ([TiUtils isIOSVersionOrGreater:@"11.0"]) {
    showBackgroundLocationIndicator = value;
    return;
  }
#endif
  DebugLog(@"[ERROR] The showBackgroundLocationIndicator property is only available on iOS 11.0+. Ignoring call ...");
}

READWRITE_IMPL(BOOL, showBackgroundLocationIndicator, ShowBackgroundLocationIndicator);

- (BOOL)locationServicesEnabled
{
  return [CLLocationManager locationServicesEnabled];
}

GETTER_IMPL(BOOL, locationServicesEnabled, LocationServicesEnabled);

- (CLAuthorizationStatus)locationServicesAuthorization
{
  return [CLLocationManager authorizationStatus];
}

GETTER_IMPL(CLAuthorizationStatus, locationServicesAuthorization, LocationServicesAuthorization);

- (BOOL)trackSignificantLocationChange
{
  return trackSignificantLocationChange;
}

- (void)setTrackSignificantLocationChange:(BOOL)newval
{
  if ([CLLocationManager significantLocationChangeMonitoringAvailable]) {
    if (newval != trackSignificantLocationChange) {
      if (trackingLocation && locationManager != nil) {
        [lock lock];
        [self shutdownLocationManager];
        trackingHeading = NO;
        trackingLocation = NO;
        trackSignificantLocationChange = newval;
        [lock unlock];
        TiThreadPerformOnMainThread(^{
          [self startStopLocationManagerIfNeeded];
        },
            NO);
        return;
      }
    }
    trackSignificantLocationChange = newval;
  } else {
    trackSignificantLocationChange = NO;
    DebugLog(@"[WARN] Ti.Geolocation.setTrackSignificantLocationChange is not supported on this device.");
  }
}

READWRITE_IMPL(BOOL, trackSignificantLocationChange, TrackSignificantLocationChange);

// Activity Type for CLlocationManager.
- (CLActivityType)activityType
{
  return activityType;
}

- (void)setActivityType:(CLActivityType)value
{
  activityType = value;
  TiThreadPerformOnMainThread(^{
    [locationManager setActivityType:activityType];
  },
      NO);
}

READWRITE_IMPL(CLActivityType, activityType, ActivityType);

// Flag to decide whether or not the app should continue to send location updates while the app is in background.

- (BOOL)pauseLocationUpdateAutomatically
{
  return pauseLocationUpdateAutomatically;
}

- (void)setPauseLocationUpdateAutomatically:(BOOL)value
{
  pauseLocationUpdateAutomatically = value;
  TiThreadPerformOnMainThread(^{
    [locationManager setPausesLocationUpdatesAutomatically:pauseLocationUpdateAutomatically];
  },
      NO);
}

READWRITE_IMPL(BOOL, pauseLocationUpdateAutomatically, PauseLocationUpdateAutomatically);

- (void)restart:(id)arg
{
  [lock lock];
  [self shutdownLocationManager];
  trackingHeading = NO;
  trackingLocation = NO;
  [lock unlock];
  // must be on UI thread
  TiThreadPerformOnMainThread(^{
    [self startStopLocationManagerIfNeeded];
  },
      NO);
}

MAKE_SYSTEM_PROP_DBL(ACCURACY_BEST, kCLLocationAccuracyBest);
MAKE_SYSTEM_PROP_DBL(ACCURACY_HIGH, kCLLocationAccuracyBest);
MAKE_SYSTEM_PROP_DBL(ACCURACY_NEAREST_TEN_METERS, kCLLocationAccuracyNearestTenMeters);
MAKE_SYSTEM_PROP_DBL(ACCURACY_HUNDRED_METERS, kCLLocationAccuracyHundredMeters);
MAKE_SYSTEM_PROP_DBL(ACCURACY_KILOMETER, kCLLocationAccuracyKilometer);
MAKE_SYSTEM_PROP_DBL(ACCURACY_THREE_KILOMETERS, kCLLocationAccuracyThreeKilometers);
MAKE_SYSTEM_PROP_DBL(ACCURACY_LOW, kCLLocationAccuracyThreeKilometers);
MAKE_SYSTEM_PROP(ACCURACY_BEST_FOR_NAVIGATION, kCLLocationAccuracyBestForNavigation); //Since 2.1.3

MAKE_SYSTEM_PROP(AUTHORIZATION_UNKNOWN, kCLAuthorizationStatusNotDetermined);
MAKE_SYSTEM_PROP(AUTHORIZATION_AUTHORIZED, kCLAuthorizationStatusAuthorizedAlways);
MAKE_SYSTEM_PROP(AUTHORIZATION_WHEN_IN_USE, kCLAuthorizationStatusAuthorizedWhenInUse);
MAKE_SYSTEM_PROP(AUTHORIZATION_ALWAYS, kCLAuthorizationStatusAuthorizedAlways);
MAKE_SYSTEM_PROP(AUTHORIZATION_DENIED, kCLAuthorizationStatusDenied);
MAKE_SYSTEM_PROP(AUTHORIZATION_RESTRICTED, kCLAuthorizationStatusRestricted);

MAKE_SYSTEM_PROP(ERROR_LOCATION_UNKNOWN, kCLErrorLocationUnknown);
MAKE_SYSTEM_PROP(ERROR_DENIED, kCLErrorDenied);
MAKE_SYSTEM_PROP(ERROR_NETWORK, kCLErrorNetwork);
MAKE_SYSTEM_PROP(ERROR_HEADING_FAILURE, kCLErrorHeadingFailure);

MAKE_SYSTEM_PROP(ERROR_REGION_MONITORING_DENIED, kCLErrorRegionMonitoringDenied);
MAKE_SYSTEM_PROP(ERROR_REGION_MONITORING_FAILURE, kCLErrorRegionMonitoringFailure);
MAKE_SYSTEM_PROP(ERROR_REGION_MONITORING_DELAYED, kCLErrorRegionMonitoringSetupDelayed);

MAKE_SYSTEM_PROP(ACTIVITYTYPE_OTHER, CLActivityTypeOther);
MAKE_SYSTEM_PROP(ACTIVITYTYPE_AUTOMOTIVE_NAVIGATION, CLActivityTypeAutomotiveNavigation);
MAKE_SYSTEM_PROP(ACTIVITYTYPE_FITNESS, CLActivityTypeFitness);
MAKE_SYSTEM_PROP(ACTIVITYTYPE_OTHER_NAVIGATION, CLActivityTypeOtherNavigation);

- (CLLocationManager *)locationPermissionManager
{
  // if we don't have an instance, create it
  if (locationPermissionManager == nil) {
    locationPermissionManager = [[CLLocationManager alloc] init];
    locationPermissionManager.delegate = self;
  }
  return locationPermissionManager;
}

- (BOOL)hasLocationPermissions:(CLAuthorizationStatus)authorizationType
{
  BOOL locationServicesEnabled = [CLLocationManager locationServicesEnabled];
  CLAuthorizationStatus currentPermissionLevel = [CLLocationManager authorizationStatus];
  CLAuthorizationStatus requestedPermissionLevel = authorizationType;
  return locationServicesEnabled && currentPermissionLevel == requestedPermissionLevel;
}

- (void)requestLocationPermissions:(CLAuthorizationStatus)authorizationType withCallback:(JSValue *)callback
{
  // Store the authorization callback for later usage
  if (callback != nil) {
    if (authorizationCallback != nil) {
      JSValue *actualCallback = [authorizationCallback value];
      [actualCallback.context.virtualMachine removeManagedReference:authorizationCallback withOwner:self];
      [authorizationCallback release];
      authorizationCallback = nil;
    }
    authorizationCallback = [[JSManagedValue managedValueWithValue:callback andOwner:self] retain];
    [callback.context.virtualMachine addManagedReference:authorizationCallback withOwner:self];
  }

  requestedAuthorizationStatus = authorizationType;
  CLAuthorizationStatus currentPermissionLevel = [CLLocationManager authorizationStatus];
  BOOL permissionsGranted = currentPermissionLevel == requestedAuthorizationStatus;

  // For iOS < 11, already granted permissions will return with success immediately
  if (permissionsGranted) {
    [self executeAndReleaseCallbackWithCode:0 andMessage:nil];
    return;
  } else if (currentPermissionLevel == kCLAuthorizationStatusDenied) {
    NSString *message = @"The user denied access to use location services.";
    [self executeAndReleaseCallbackWithCode:1 andMessage:message];
    return;
  }

  NSString *errorMessage = nil;

  if (requestedAuthorizationStatus == kCLAuthorizationStatusAuthorizedWhenInUse) {
    if ([GeolocationModule hasWhenInUsePermissionKeys]) {
      if (currentPermissionLevel == kCLAuthorizationStatusAuthorizedAlways) {
        errorMessage = @"Cannot change already granted permission from AUTHORIZATION_ALWAYS to the lower permission-level AUTHORIZATION_WHEN_IN_USE";
      } else {
        TiThreadPerformOnMainThread(^{
          [[self locationPermissionManager] requestWhenInUseAuthorization];
        },
            NO);
      }
    } else {
      errorMessage = [[NSString alloc] initWithFormat:@"The %@ key must be defined in your tiapp.xml in order to request this permission",
                                       kTiGeolocationUsageDescriptionWhenInUse];
    }
  }
  if (requestedAuthorizationStatus == kCLAuthorizationStatusAuthorizedAlways) {
    if ([GeolocationModule hasAlwaysPermissionKeys]) {
      TiThreadPerformOnMainThread(^{
        [[self locationPermissionManager] requestAlwaysAuthorization];
      },
          NO);
    } else if ([TiUtils isIOSVersionOrGreater:@"11.0"]) {
      errorMessage = [[NSString alloc] initWithFormat:
                                           @"The %@, %@ and %@ (iOS 11+) key must be defined in your tiapp.xml in order to request this permission.",
                                       kTiGeolocationUsageDescriptionWhenInUse,
                                       kTiGeolocationUsageDescriptionAlways,
                                       kTiGeolocationUsageDescriptionAlwaysAndWhenInUse];
    } else {
      errorMessage = [[NSString alloc] initWithFormat:
                                           @"The %@ key must be defined in your tiapp.xml in order to request this permission.",
                                       kTiGeolocationUsageDescriptionAlways];
    }
  }

  if (errorMessage != nil) {
    NSLog(@"[ERROR] %@", errorMessage);
    [self executeAndReleaseCallbackWithCode:(errorMessage == nil) ? 0 : 1 andMessage:errorMessage];
    RELEASE_TO_NIL(errorMessage);
  }
}

READWRITE_IMPL(BOOL, allowsBackgroundLocationUpdates, AllowsBackgroundLocationUpdates);
GETTER_IMPL(NSString *, lastGeolocation, LastGeolocation);
READWRITE_IMPL(BOOL, showCalibration, ShowCalibration);

#pragma mark Internal

+ (BOOL)hasAlwaysPermissionKeys
{
  if (![TiUtils isIOSVersionOrGreater:@"11.0"]) {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:kTiGeolocationUsageDescriptionAlways] != nil;
  }

  return [[NSBundle mainBundle] objectForInfoDictionaryKey:kTiGeolocationUsageDescriptionWhenInUse] &&
      [[NSBundle mainBundle] objectForInfoDictionaryKey:kTiGeolocationUsageDescriptionAlways] &&
      [[NSBundle mainBundle] objectForInfoDictionaryKey:kTiGeolocationUsageDescriptionAlwaysAndWhenInUse];
}

+ (BOOL)hasWhenInUsePermissionKeys
{
  return [[NSBundle mainBundle] objectForInfoDictionaryKey:kTiGeolocationUsageDescriptionWhenInUse] != nil;
}

- (void)executeAndReleaseCallbackWithCode:(NSInteger)code andMessage:(NSString *)message
{
  if (authorizationCallback == nil) {
    return;
  }

  NSMutableDictionary *propertiesDict = [TiUtils dictionaryWithCode:code message:message];
  NSArray *invocationArray = [[NSArray alloc] initWithObjects:&propertiesDict count:1];

  JSValue *actualCallback = [authorizationCallback value];
  [actualCallback callWithArguments:invocationArray];
  [invocationArray release];

  // release the stored callback
  [actualCallback.context.virtualMachine removeManagedReference:authorizationCallback withOwner:self];
  [authorizationCallback release];
  authorizationCallback = nil;
}

- (NSDictionary *)locationDictionary:(CLLocation *)newLocation;
{
  if ([newLocation timestamp] == 0) {
    // this happens when the location object is essentially null (as in no location)
    return nil;
  }

  CLLocationCoordinate2D latlon = [newLocation coordinate];

  NSMutableDictionary *data = [NSMutableDictionary dictionaryWithObjectsAndKeys:
                                                       [NSNumber numberWithFloat:latlon.latitude], @"latitude",
                                                   [NSNumber numberWithFloat:latlon.longitude], @"longitude",
                                                   [NSNumber numberWithFloat:[newLocation altitude]], @"altitude",
                                                   [NSNumber numberWithFloat:[newLocation horizontalAccuracy]], @"accuracy",
                                                   [NSNumber numberWithFloat:[newLocation verticalAccuracy]], @"altitudeAccuracy",
                                                   [NSNumber numberWithFloat:[newLocation course]], @"heading",
                                                   [NSNumber numberWithFloat:[newLocation speed]], @"speed",
                                                   [NSNumber numberWithLongLong:(long long)([[newLocation timestamp] timeIntervalSince1970] * 1000)], @"timestamp",
                                                   nil];

  data[@"floor"] = @{ @"level" : [NSNumber numberWithInteger:[[newLocation floor] level]] };

  return data;
}

- (NSDictionary *)headingDictionary:(CLHeading *)newHeading
{
  long long ts = (long long)[[newHeading timestamp] timeIntervalSince1970] * 1000;

  NSDictionary *data = [NSDictionary dictionaryWithObjectsAndKeys:
                                         [NSNumber numberWithDouble:[newHeading magneticHeading]], @"magneticHeading",
                                     [NSNumber numberWithDouble:[newHeading trueHeading]], @"trueHeading",
                                     [NSNumber numberWithDouble:[newHeading headingAccuracy]], @"accuracy",
                                     [NSNumber numberWithLongLong:ts], @"timestamp",
                                     [NSNumber numberWithDouble:[newHeading x]], @"x",
                                     [NSNumber numberWithDouble:[newHeading y]], @"y",
                                     [NSNumber numberWithDouble:[newHeading z]], @"z",
                                     nil];
  return data;
}

#pragma mark Single Shot Handling

- (BOOL)fireSingleShotLocationIfNeeded:(NSDictionary *)event stopIfNeeded:(BOOL)stopIfNeeded
{
  // check to see if we have any single shot location callbacks
  if (singleLocation != nil) {
    for (JSManagedValue *managedCallback in singleLocation) {
      JSValue *callback = [managedCallback value];
      [self _fireEventToListener:@"location" withObject:event listener:callback];
      [callback.context.virtualMachine removeManagedReference:managedCallback withOwner:self];
    }

    // after firing, we remove them
    RELEASE_TO_NIL(singleLocation);

    // check to make sure we don't need to stop after the single shot
    if (stopIfNeeded) {
      [self startStopLocationManagerIfNeeded];
    }
    return YES;
  }
  return NO;
}

- (BOOL)fireSingleShotHeadingIfNeeded:(NSDictionary *)event stopIfNeeded:(BOOL)stopIfNeeded
{
  // check to see if we have any single shot heading callbacks
  if (singleHeading != nil) {
    for (JSManagedValue *managedCallback in singleHeading) {
      JSValue *callback = [managedCallback value];
      [self _fireEventToListener:@"heading" withObject:event listener:callback];
      [callback.context.virtualMachine removeManagedReference:managedCallback withOwner:self];
    }

    // after firing, we remove them
    RELEASE_TO_NIL(singleHeading);

    // check to make sure we don't need to stop after the single shot
    if (stopIfNeeded) {
      [self startStopLocationManagerIfNeeded];
    }
    return YES;
  }
  return NO;
}

- (NSString *)purpose
{
  return purpose;
}

- (void)setPurpose:(NSString *)reason
{
  ENSURE_UI_THREAD(setPurpose, reason);
  RELEASE_TO_NIL(purpose);
  purpose = [reason retain];

  if ([TiUtils isIOSVersionOrGreater:@"11.0"]) {
    DebugLog(@"[WARN] The Ti.Geolocation.purpose property is deprecated. Include the %@ or %@ and (!) %@ (iOS 11+) key in your Info.plist instead", kTiGeolocationUsageDescriptionWhenInUse, kTiGeolocationUsageDescriptionAlways, kTiGeolocationUsageDescriptionAlwaysAndWhenInUse);
  } else {
    DebugLog(@"[WARN] The Ti.Geolocation.purpose property is deprecated. Include the %@ or %@ key in your Info.plist instead", kTiGeolocationUsageDescriptionWhenInUse, kTiGeolocationUsageDescriptionAlways);
  }

  if (locationManager != nil) {
    if ([locationManager respondsToSelector:@selector(setPurpose:)]) {
      [locationManager performSelector:@selector(setPurpose:) withObject:purpose];
    }
  }
}

#pragma mark Delegates

- (void)locationManagerDidPauseLocationUpdates:(CLLocationManager *)manager
{
  if ([self _hasListeners:@"locationupdatepaused"]) {
    [self fireEvent:@"locationupdatepaused" withDict:nil];
  }
}

- (void)locationManagerDidResumeLocationUpdates:(CLLocationManager *)manager
{
  if ([self _hasListeners:@"locationupdateresumed"]) {
    [self fireEvent:@"locationupdateresumed" withDict:nil];
  }
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
                                          NUMINT([CLLocationManager authorizationStatus]), @"authorizationStatus", nil];

  // Still using this event for changes being made outside the app (e.g. disable all location services on the device).
  if ([self _hasListeners:@"authorization"]) {
    [self fireEvent:@"authorization" withDict:event];
  }

  BOOL requestedStatusMatchesActualStatus = status == requestedAuthorizationStatus;

  // The new callback for android parity used inside Ti.Geolocation.requestLocationPermissions()
  if (authorizationCallback != nil && status != kCLAuthorizationStatusNotDetermined) {
    int code = 0;
    NSString *errorStr = nil;

    switch (status) {
    case kCLAuthorizationStatusAuthorizedAlways:
    case kCLAuthorizationStatusAuthorizedWhenInUse:
      break;
    default:
      code = 1;
      errorStr = @"The user denied access to use location services.";
    }

    // This is very important for iOS 11+ because even if the user did an incremental authorization before
    // (by selecting "when in use", he/she will still get a dialog that includes the "when in use" option.
    // In case that one is still selected then, the developer should know about that selection and the following
    // statement allows that.
    if (!requestedStatusMatchesActualStatus) {
      code = 1;
      errorStr = @"The requested permissions do not match the selected permission (the user likely declined AUTHORIZATION_ALWAYS permissions) in iOS 11+";
    }

    TiThreadPerformOnMainThread(^{
      NSMutableDictionary *propertiesDict = [TiUtils dictionaryWithCode:code message:errorStr];
      [propertiesDict setObject:NUMINT([CLLocationManager authorizationStatus]) forKey:@"authorizationStatus"];
      [[authorizationCallback value] callWithArguments:@[ propertiesDict ]];
    },
        YES);
    [[authorizationCallback value].context.virtualMachine removeManagedReference:authorizationCallback withOwner:self];
    RELEASE_TO_NIL(authorizationCallback);
    RELEASE_TO_NIL(errorStr);
  }
}

//Using new delegate instead of the old deprecated method - (void)locationManager:didUpdateToLocation:fromLocation:

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
  NSDictionary *todict = [self locationDictionary:[locations lastObject]];

  //Must use dictionary because of singleshot.
  NSMutableDictionary *event = [TiUtils dictionaryWithCode:0 message:nil];
  [event setObject:todict forKey:@"coords"];
  if ([self _hasListeners:@"location"]) {
    [self fireEvent:@"location" withDict:event];
  }

  [self updateLastLocationDictionary:locations];
  [self fireSingleShotLocationIfNeeded:event stopIfNeeded:YES];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation
{
  if (newLocation != nil) {
    if (oldLocation == nil) {
      [self locationManager:manager didUpdateLocations:[NSArray arrayWithObject:newLocation]];
    } else {
      [self locationManager:manager didUpdateLocations:[NSArray arrayWithObjects:oldLocation, newLocation, nil]];
    }
  }
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
  if ([self _hasListeners:@"location"]) {
    [self fireEvent:@"location" withObject:nil errorCode:[error code] message:[TiUtils messageFromError:error]];
  }

  NSMutableDictionary *event = [TiUtils dictionaryWithCode:[error code] message:[TiUtils messageFromError:error]];
  BOOL recheck = [self fireSingleShotLocationIfNeeded:event stopIfNeeded:NO];
  recheck = recheck || [self fireSingleShotHeadingIfNeeded:event stopIfNeeded:NO];

  if (recheck) {
    // check to make sure we don't need to stop after the single shot
    [self startStopLocationManagerIfNeeded];
  }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateHeading:(CLHeading *)newHeading
{
  //Unfortunately, because of the single shot overloaded here, we can't use the faster eventing.
  NSMutableDictionary *event = [TiUtils dictionaryWithCode:0 message:nil];
  [event setObject:[self headingDictionary:newHeading] forKey:@"heading"];

  [self fireEvent:@"heading" withDict:event];

  [self fireSingleShotHeadingIfNeeded:event stopIfNeeded:YES];
}

- (BOOL)locationManagerShouldDisplayHeadingCalibration:(CLLocationManager *)manager
{
  if ([self showCalibration]) {
    // fire an event in case the dev wants to hide it
    if ([self _hasListeners:@"calibration"]) {
      [self fireEvent:@"calibration" withDict:nil];
    }
    return YES;
  }
  return NO;
}

#pragma mark Utilities

- (void)dismissHeadingCalibrationDisplay:(id)args
{
  ENSURE_UI_THREAD(dismissHeadingCalibrationDisplay, args);
  [[self locationManager] dismissHeadingCalibrationDisplay];
}

- (void)updateLastLocationDictionary:(NSArray *)locations
{
  [lastLocationDict release];
  lastLocationDict = [[self locationDictionary:[locations lastObject]] copy];
}

@end

#endif
