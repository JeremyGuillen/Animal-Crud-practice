import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
    imports: [CommonModule, NzLayoutModule],
    exports: [LayoutComponent],
    declarations: [LayoutComponent],
    providers: [],
})
export class LayoutModule { }
