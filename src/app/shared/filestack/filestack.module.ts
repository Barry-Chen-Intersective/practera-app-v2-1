import { IonicModule } from '@ionic/angular';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestackService } from './filestack.service';
import { FilestackComponent } from './filestack.component';

@NgModule({
  imports: [ 
    IonicModule,
    CommonModule 
  ],
  providers: [
    FilestackService
  ],
  declarations: [
    FilestackComponent
  ],
  exports: [
    FilestackComponent
  ]
})

export class FilestackModule {
  
}
