import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe, ToEventTime } from './pipes.pipe';

@NgModule({
  declarations: [ToEventTime, SafeHtmlPipe],
  imports: [
    CommonModule
  ],
  exports: [ ToEventTime, SafeHtmlPipe ]
})
export class PipesModule { }
