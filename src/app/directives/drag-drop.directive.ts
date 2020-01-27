import { Directive, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() fileDropped: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.background-color') public background = '#EEE';
  @HostBinding('style.border-color') public border = '#CCC';
  @HostBinding('style.opacity') public opacity = '1';

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#EEE';
    this.border = '#CCC';
    this.opacity = '0.8';
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#E93D3D';
    this.border = '#B72626';
    this.opacity = '1';
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#EEE';
    this.border = '#26A2B7';
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }


}
