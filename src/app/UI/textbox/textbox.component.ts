import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {

  @Input() inputModel: string;
  @Input() maxLength: number;
  @Input() isNumeric: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() fullSize: boolean;
  @Input() disabled = false;

  @Output() inputModelChange = new EventEmitter<string>();

  totalCharLengthText: string;

  textCount: number;

  ngOnInit() {
    if (this.inputModel != null) {
      this.textCount = this.inputModel.length;
    }

    if (this.maxLength != null) {
    this.totalCharLengthText = (this.maxLength === 0) ? 'Unlimited' : (this.maxLength).toString();
    }
  }

  textChange() {
    this.inputModelChange.emit(this.inputModel);
    this.textCount = this.inputModel.length;
  }

  numberOnly(event: any): boolean {
    if (!this.isNumeric) {
      return true;
    }

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46 ) {
      return false;
    }

    return true;
  }


}
