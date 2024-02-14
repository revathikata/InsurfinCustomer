import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPanMask]'
})
export class PanMaskDirective {

  constructor(private el: ElementRef) { }

  @Input('panMask') set maskedNumber(value: string) {
    if (value && value.length >= 4) {
      let maskedValue: string;
      if (value.length === 12) { // Aadhar number
        maskedValue = '********' + value.slice(-4);
      } else if (value.length === 10) { // PAN number
        // maskedValue = '******' + value.slice(-4);
        maskedValue = '******' + value.slice(-4)
      } else {
        maskedValue = value;
      }
      this.el.nativeElement.innerText = maskedValue;
    } else {
      this.el.nativeElement.innerText = value;
    }
  }


}
