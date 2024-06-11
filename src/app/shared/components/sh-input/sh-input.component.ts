import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-sh-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShInputComponent),
      multi: true,
    },
  ],
  imports: [ReactiveFormsModule],
  templateUrl: './sh-input.component.html',
  styleUrl: './sh-input.component.css',
})
export class ShInputComponent implements ControlValueAccessor {
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() min?: number = 1;

  public value: any;
  public changed: (value: any) => void = () => {};
  public touched: () => void = () => {};
  public isDisabled!: boolean;

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    if (this.changed) {
      this.changed(value);
    }
    if (this.touched) {
      this.touched();
    }
  }
}
