import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  elemRef: ElementRef;
  decimalPlaces = 2;
  minValue = '0.00';

  constructor(private el: ElementRef) {
    this.elemRef = el;
  }
  /**
   * To restrict number on the field
   * @param event
   */
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent> event;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  }

  /**
   * Validate for decimal places
   * @param event
   */
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const e = <any> event;

    let currentCursorPos: Number = -1;
    if (typeof this.elemRef.nativeElement.selectionStart === 'number') {
        currentCursorPos = this.elemRef.nativeElement.selectionStart;
    } else {
      // Probably an old IE browser
      console.log('This browser doesn\'t support selectionStart');
    }

    const dotLength: number = e.target.value.replace(/[^\.]/g, '').length;
    const decimalLength = e.target.value.split('.')[1] ? e.target.value.split('.')[1].length : 0;

    // (this.decimalPlaces - 1) because we don't get decimalLength including currently pressed character
    // currentCursorPos > e.target.value.indexOf(".") because we must allow user's to enter value before dot(.)
    // Checking Backspace etc.. keys because firefox doesn't pressing them while chrome does by default
    if ( dotLength > 1 ||
        (dotLength === 1 && e.key === '.') ||
        (decimalLength > (this.decimalPlaces - 1) && currentCursorPos > e.target.value.indexOf('.')) &&
        ['Backspace', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) === -1 ) {
      e.preventDefault();
    }
  }
}
