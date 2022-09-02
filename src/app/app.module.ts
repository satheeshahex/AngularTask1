import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { AnimatedgirlComponent } from './animatedgirl/animatedgirl.component';
import { ModelComponent } from './model/model.component';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    AnimatedgirlComponent,
    ModelComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
