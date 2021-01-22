import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { EmailPipe } from '../pipes/email.pipe';
import { TruncateNamesPipe } from '../pipes/truncate-names.pipe';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    EmailPipe,
    TruncateNamesPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    EmailPipe,
    TruncateNamesPipe
  ],
})
export class SharedModule { }
