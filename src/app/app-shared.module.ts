import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './UI/button/button.component';
import { TextboxComponent } from './UI/textbox/textbox.component';
import { InfoBoxComponent } from './UI/MessageBox/info-box/info-box.component';
import { SuccessBoxComponent } from './UI/MessageBox/success-box/success-box.component';
import { WarningBoxComponent } from './UI/MessageBox/warning-box/warning-box.component';
import { ErrorBoxComponent } from './UI/MessageBox/error-box/error-box.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule 
    ],
    declarations: [
        ButtonComponent,
        TextboxComponent,
        InfoBoxComponent,
        SuccessBoxComponent,
        WarningBoxComponent,
        ErrorBoxComponent
    ],
    exports: [
        ButtonComponent,
        TextboxComponent,
        InfoBoxComponent,
        SuccessBoxComponent,
        WarningBoxComponent,
        ErrorBoxComponent
    ]
})
export class SharedModule {}
