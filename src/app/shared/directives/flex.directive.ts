import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[flex]'
})
export class FlexDirective {
  @Input() shink: number = 1;
  @Input() grow: number = 1;
  @Input() flex: string;

  @HostBinding('style.flex')
  get style() {
    return `${this.grow} ${this.shink} ${this.flex === '' ? '0' : this.flex}%`;
  }
}
