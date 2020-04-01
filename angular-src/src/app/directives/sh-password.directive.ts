import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appShPassword]'
})
export class ShPasswordDirective 
{
  private shown = false;
  constructor(private el: ElementRef) 
  {
    this.setup();
  }
  
  change(span: HTMLElement) 
  {
    this.shown = !this.shown;
    if (this.shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = '<i  style="position:absolute; right:8px;top:8px;color:grey;" class="fa fa-eye-slash"></i>';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = '<i  style="position:absolute; right:8px;top:8px;color:grey;" class="fa fa-eye"></i>';
    }
  }
  
  setup() 
  {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = '<i style="position:absolute; right:8px;top:8px;color:grey;" class="fa fa-eye"></i>';
    span.addEventListener('click', (event) => {
      this.change(span);
    });
    parent.appendChild(span);
  }
}
