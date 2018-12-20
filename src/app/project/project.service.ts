import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Activity {
  id?: number;
  name?: string;
  isLocked?: boolean;
  progress?: number;
  hasFeedback?: boolean;
  leadImage?: string;
}

export interface Milestone {
  id: number;
  name: string;
  project_id: number;
  description: string;
  progress: number;
  isLocked: boolean;
  Activity:Array <Activity>;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  milestones: Array <Milestone> = [
    {
      id: 1,
      name: 'fundamental',
      project_id: 55,
      progress :1,
      description: ' You are now part of the learning community. Whether you are a Project Stakeholder, Consulting Mentor or a University Student about to embark on your first consulting project, welcome. This Fundamentals milestone will provide you with an overview, explain your role and provide you with tips and tricks for a successful learning experience ',
      Activity :[
        {
          id: 101,
          name: 'Test Activity one',
          isLocked: false,
          progress: 0.34,
          hasFeedback: true,
          leadImage:''
        },
        {
          id: 102,
          name: 'Activity two',
          isLocked: true,
          progress: 0.74,
          leadImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTVf63Vm3XgOncMVSOy0-jSxdMT8KVJIc8WiWaevuWiPGe0Pm',
          hasFeedback: false,
        },
        {
          id: 102,
          name: 'Activity two',
          isLocked: true,
          progress: 0.74,
          leadImage: '',
          hasFeedback: false,
        } 
      ],
      isLocked: false
    },
    {
      id: 2,
      name: 'delivery',
      description:'', 
      project_id: 55,
      progress: 0.62,
      Activity :[
        { 
          id: 103,
          name: 'Test Activity three',
          isLocked: false,
          progress: 0.47,
          hasFeedback: false,
        },
        {
          id: 104,
          name: 'Activity four',
          isLocked: false,
          progress:0.98,
          hasFeedback: false,
        },
        {
          id: 105,
          name: 'Test Activity five',
          isLocked: false,
          progress: 0.47,
          hasFeedback: false,
        },
      ],
      isLocked: false
    },
    {
      id: 3,
      name: 'communication',
      description: 'there is some dummy text',
      progress: 1,
      project_id: 55,
      Activity :[
        {
          id: 106,
          name: 'Test Activity six',
          isLocked: false,
          progress: 1,
          hasFeedback: false,
        },
        {
          id: 107,
          name: 'Activity seven',
          isLocked: false,
          progress:0.48,
          hasFeedback: true,
        }
      ],
      isLocked: true
    },
    {
      id: 4,
      name: 'last',
      description: 'The deliver phase of a project is all about getting the work done. During this phase your team will likely work both independently and collectively to research and ultimately present your findings. Throughout this phase you will also complete a second employability skill assessment to see how you feel your skills are development and reflect on the journey so far in a reflection journal entry.',
      progress: 0.45,
      project_id: 65,
      Activity :[
        {
          id: 108,
          name: 'Test Activity six',
          isLocked: false,
          progress: 1,
          hasFeedback: false,
        },
      ],
      isLocked: false
    }
  ];

  constructor() { }
  getMilestones(): Observable<any> {
    return of(this.milestones);
  }

}