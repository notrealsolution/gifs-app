import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './lazyImage/lazyImage.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent
  ],
  exports:[
    LazyImageComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
