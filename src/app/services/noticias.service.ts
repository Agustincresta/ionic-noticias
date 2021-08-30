import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key' : apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = "";
  categoriaPage = 0;
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl+query+`&apiKey=${apiKey}`

    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(query)}`;
    //return this.httpClient.get<T>(query, {headers});

    return this.http.get<any>(url);
  }

  /*private ejecutarQuery<T>(query: string){
    query = apiUrl + query;

    return this.http.get<T>(query, { headers });
  }*/

  getTopHeadlines(){
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&page=${this.headlinesPage}`);
    
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=ar&apiKey=bd6288978b914f139181bb3562a82f40`)
  }


  getTopHeadlinesCategoria( categoria: string ) {

    if (this.categoriaActual === categoria ) {
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&category=${ categoria }&page=${ this.categoriaPage }`);
    //return this.http.get(`https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=bd6288978b914f139181bb3562a82f40`)
  }
}

