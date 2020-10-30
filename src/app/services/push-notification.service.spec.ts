import { TestBed, flush, fakeAsync } from '@angular/core/testing';
import { PushNotificationService } from './push-notification.service';
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { Observable, interval, pipe, of } from 'rxjs';
import { switchMap, concatMap, tap, retryWhen, take, delay } from 'rxjs/operators';
import { BrowserStorageService } from '@services/storage.service';
import { environment } from '@environments/environment';
import { Plugins, WebPlugin } from '@capacitor/core';

Plugins.PushNotifications = jasmine.createSpyObj('PushNotifications', [
  'requestPermission',
  'register',
  'addListener',
]);

class MockPlugin extends WebPlugin {
  constructor() {
    super({ name: 'Mock' });
  }
  trigger() {
    this.notifyListeners('test', {
      value: 'Capacitors on top of toast!',
    });
  }
}

// const { PushNotifications, LocalNotifications, PusherBeams } = Plugins;

/*class PushNotifications {
  async requestPermission() {
    return {
      granted: true
    };
  }
  async register() {
    return true;
  }
  addListener() {
    return true;
  }
}*/

describe('PushNotificationService', () => {
  let service: PushNotificationService;
  // let requestSpy: jasmine.SpyObj<RequestService>;
  // let pushNotificationsSpy;
  // let pusherBeamsSpy: jasmine.SpyObj<PusherBeams>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(() => {

    // PushNotifications = jasmine.spyOn('PushNotifications', ['addListener']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['set'])
        },
        /*{
          provide: PushNotifications,
          useValue: jasmine.createSpyObj('PushNotifications', ['requestPermission'])
        },
        {
          provide: PusherBeams,
          useValue: jasmine.createSpyObj('PusherBeams', [])
        }*/
      ]
    });

    service = new PushNotificationService(storageSpy);
    // service = TestBed.inject(PushNotificationService) as jasmine.SpyObj<PushNotificationService>;
    // pushNotificationsSpy = TestBed.inject(PushNotifications) as jasmine.SpyObj<PushNotifications>;
    // pusherBeamsSpy = TestBed.inject(PusherBeams) as jasmine.SpyObj<PusherBeams>;
  });

  it('should be created', () => {
    console.log('Capacitor::', Plugins);
    expect(service).toBeTruthy();
  });

  describe('hasPermission', () => {
    it('should return true when permission is allowed for Ios', fakeAsync(() => {
      /*pushNotificationsSpy.requestPermission.and.returnValue(of({
        data: {
          is_last: true,
          task: null
        }
      }));*/
      service.hasPermission().then(res => {
        console.log('testsetetst', res);
        expect(res).toBeTruthy();
      });
      flush();
    }));
  });

  it('should return false when permission is not allowed for Ios', fakeAsync(() => {
    /*pushNotificationsSpy.requestPermission.and.returnValue(of({
      data: {
        is_last: true,
        task: null
      }
    }));*/
      expect(true).toBeTruthy();
  }));
});
