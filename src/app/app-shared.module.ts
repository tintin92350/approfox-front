import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './UI/button/button.component';
import { TextboxComponent } from './UI/textbox/textbox.component';
import { InfoBoxComponent } from './UI/MessageBox/info-box/info-box.component';
import { SuccessBoxComponent } from './UI/MessageBox/success-box/success-box.component';
import { WarningBoxComponent } from './UI/MessageBox/warning-box/warning-box.component';
import { ErrorBoxComponent } from './UI/MessageBox/error-box/error-box.component';
import { CvComponent } from './Resources/cv/cv.component';
import { TagComponent } from './Resources/tag/tag.component';

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
        ErrorBoxComponent,
        TagComponent
    ],
    exports: [
        ButtonComponent,
        TextboxComponent,
        InfoBoxComponent,
        SuccessBoxComponent,
        WarningBoxComponent,
        ErrorBoxComponent,
        TagComponent
    ]
})
export class SharedModule {}
