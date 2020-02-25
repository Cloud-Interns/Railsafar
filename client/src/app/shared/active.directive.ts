import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[linkActive]'
})
export class ActiveDirective {

  @HostBinding('class.active') isActive : boolean = false;
  @HostListener('click') toggleActive(){
    this.isActive = !this.isActive;
  }

  constructor() { }

}
