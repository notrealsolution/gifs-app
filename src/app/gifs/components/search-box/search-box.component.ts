import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" (keyup.enter)="searchTag()" class="form-control" placeholder="Buscar gif..." #txtTagInput>
  `
})

export class SearchBoxComponent {

  public constructor( private gifsService: GifsService ){}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef <HTMLInputElement>;

  searchTag():void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag( newTag );
    this.tagInput.nativeElement.value = '';
  }

}
