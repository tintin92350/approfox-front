import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './UI/button/button.component';
import { TextboxComponent } from './UI/textbox/textbox.component';
import { InfoBoxComponent } from './UI/MessageBox/info-box/info-box.component';
import { SuccessBoxComponent } from './UI/MessageBox/success-box/success-box.component';
import { WarningBoxComponent } from './UI/MessageBox/warning-box/warning-box.component';
import { ErrorBoxComponent } from './UI/MessageBox/error-box/error-box.component';
import { CvComponent } from './Resources/cv/cv.component';
import { TagBadgeComponent } from './Resources/tagBadge/tag-badge.component';
import { HasRoleDirective } from './directives/has-role.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [
        ButtonComponent,
        TextboxComponent,
        InfoBoxComponent,
        SuccessBoxComponent,
        WarningBoxComponent,
        ErrorBoxComponent,
        TagBadgeComponent,
        HasRoleDirective
    ],
    exports: [
        ButtonComponent,
        TextboxComponent,
        InfoBoxComponent,
        SuccessBoxComponent,
        WarningBoxComponent,
        ErrorBoxComponent,
        TagBadgeComponent,
        HasRoleDirective
    ]
})
export class SharedModule {}
