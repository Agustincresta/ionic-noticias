import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
 
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
 
  private _storage: Storage | null = null;
 
  noticias: Article[] = [];
 
  constructor(private storage: Storage) {
 
    this.cargarFavoritos();
 
  }
  async guardarNoticia(noticia: Article) {
  const existe = this.noticias.find(noti => noti.title === noticia.title);
 
    if (!existe) {
 
      this.noticias.unshift(noticia);
      
      this._storage.set('favoritos', this.noticias);

    }
   
  }
 
  async cargarFavoritos() {
    let storageData = await this.storage.create();
    this._storage = storageData;
    const favoritos = await this._storage.get('favoritos');
 
    if (favoritos) {
 
      this.noticias = favoritos;
 
    }
  } 

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title != noticia.title);

    this._storage.set('favoritos', this.noticias);
  }
 
}