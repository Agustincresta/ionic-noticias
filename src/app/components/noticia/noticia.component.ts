import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input ()noticia: Article;
  @Input ()i: Number;
  @Input () enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService,
              private toastController: ToastController,
              private platform: Platform) { }

  ngOnInit() {
    
  }

  abrirNoticia(){
    
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let guardarBorrarBtn;
    
    if ( this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrado de favorito');
          this.dataLocalService.borrarNoticia( this.noticia ),
          this.presentToast("Noticia borrada de favoritos")
        }
      }
    }else{
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticia( this.noticia )
          this.presentToast("Noticia agregada a favoritos")
        }
      }
    }


    const actionSheet = await this.actionSheetController.create({

      buttons: [{
        text: 'compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');

          this.compartirNoticia();
          
        }
      }, guardarBorrarBtn
      , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  compartirNoticia(){

    if (this.platform.is('cordova')) {
      this.socialSharing.share( 
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      )
    }else{
      if (navigator.share) {
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log("no se pudo compartir")
      }
    }
    
  }
}
