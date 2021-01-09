import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'toEventTime' })
export class ToEventTime implements PipeTransform {
  transform(date: Date): string {
    if (!date) {
      return '';
    }
    const conv_date_number = (new Date(Date.now()).getTime()) - (new Date(date).getTime()); // in mill secs
    const secs = (conv_date_number / 1000);
    const mins = secs / 60;
    const hrs = mins / 60;
    const days = hrs / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    if (Math.floor(years) > 0) {
      return Math.floor(years) + ' years ago';
    } else if (Math.floor(months) > 0) {
      return Math.floor(months) + ' months ago';
    } else if (Math.floor(weeks) > 0) {
      return Math.floor(weeks) + ' weeks ago';
    } else if (Math.floor(days) > 0) {
      return Math.floor(days) + ' days ago';
    } else if (Math.floor(hrs) > 0) {
      return Math.floor(hrs) + ' hrs ago';
    } else if (Math.floor(mins) > 0) {
      return Math.floor(mins) + ' mins ago';
    } else if (Math.floor(secs) > 0) {
      return Math.floor(secs) + ' secs ago';
    } else { return 'now'; }

  }
}

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(
    private domSanitizer: DomSanitizer) { }
  transform(html) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}