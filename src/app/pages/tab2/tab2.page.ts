import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  @ViewChild(IonInfiniteScroll, { static: true }) InfiniteScroll: IonInfiniteScroll;

  @ViewChild(IonContent) content: IonContent;

  categorias = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  noticias: Article [] = [];
  constructor(private noticiasService: NoticiasService,) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    console.log(this.segment.value)

    this.cargarNoticias( this.categorias[0] )
  }

  cambioCategoria( event){
    this.InfiniteScroll.disabled = false

    this.noticias = [];

    this.cargarNoticias( event.detail.value )
    this.content.scrollToTop()
  }

  cargarNoticias( categoria:string, event? ){

    this.noticiasService.getTopHeadlinesCategoria( categoria ).subscribe(
      data => {
        
        const cat = JSON.parse(data.contents);
        this.noticias.push(...cat.articles);
        console.log()
        if (cat.articles.length == 0) {
          event.target.disabled = true;
          return;
        }

        if (event) {
          event.target.complete();
          return;
        }
      }
    )
  }

  loadData( event ){
    this.cargarNoticias( this.segment.value, event );
  }
}
