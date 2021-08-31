import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {

  }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData( event){
    
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadlines().subscribe
    (resp => {
      
        const noti = JSON.parse(resp.contents);
        if (noti.articles.length==0){
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.noticias.push(...noti.articles);
        console.log(this.noticias)
 
        if (event) {
          console.log("articles")
          event.target.complete(); 
        }
    });
  }

}
