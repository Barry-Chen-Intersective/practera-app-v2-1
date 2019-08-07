import { Injectable } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NotificationService } from '@shared/notification/notification.service';
import { RequestService } from '@shared/request/request.service';
import { Achievement } from '@app/achievements/achievements.service';

export interface PusherAchievement extends Achievement {
  badge?: string;
  Unlock: Unlock;
}

export interface Unlock {
  type: string;
  activity_id?: Array<number> | number;
  tasks?: Array<{
    id: number;
    type: string;
  }>;
}

export interface Profile {
  contact_number: string;
  email?: string;
  sendsms?: boolean;
}

const api = {
  post: {
    profile: 'api/v2/user/enrolment/edit.json',
  },
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private achievementEvent;
  private memoryCache = {};

  constructor(
    private utils: UtilsService,
    private storage: BrowserStorageService,
    private notification: NotificationService,
    private request: RequestService
  ) {}

  // call this function on every page refresh
  onPageLoad() {
    // only do these if a timeline is choosen
    if (!this.storage.getUser().timelineId) {
      return;
    }
    // check and change theme color on every page refresh
    const color = this.storage.getUser().themeColor;
    if (color) {
      this.utils.changeThemeColor(color);
    }
    const image = this.storage.getUser().activityCardImage;
    if (image) {
      this.utils.changeCardBackgroundImage(image);
    }

    // listen to the achievement event
    if (!this.achievementEvent) {
      this.achievementEvent = this.utils.getEvent('achievement').subscribe(event => {
        const Achievement: PusherAchievement = event.meta.Achievement;

        this.notification.achievementPopUp(
          'notification',
          {
            id: Achievement.id,
            name: Achievement.name,
            description: Achievement.description,
            points: Achievement.points,
            image: Achievement.badge
          },
          {
            unlocks: Achievement.Unlock,
          }
        );
      });
    }
  }

  updateProfile(data: Profile) {
    return this.request.post(api.post.profile, data);
  }

  /**
   * This method check due dates of assessment or activity.
   * - Check due date is today, tomorrow, upcoming date or overdue date.
   * - If due date is upcoming one this will returns 'Due (date)' ex: 'Due 06-30-2019'.
   * - If due date is overdue one this will returns 'Overdue (date)' ex: 'Overdue 01-10-2019'.
   * - If due date is today this will return 'Due Today'.
   * - If due date is tomorrow this will return 'Due Tomorrow'.
   * @param dueDate - due date of assessment or activity.
   */
  dueDateFormatter(dueDate: string) {
    if (!dueDate) {
      return '';
    }
    const difference = this.utils.timeComparer(dueDate);
    if (difference < 0) {
      return 'Overdue ' + this.utils.utcToLocal(dueDate);
    }
    return 'Due ' + this.utils.utcToLocal(dueDate);
  }
}
