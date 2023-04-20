import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { CardResponse } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'

  constructor(private http: HttpClient) { }


  getCards(name:string | null, offset=0){

    const params:any = {
      num:100,
      offset,
    }

    if(name) params.fname = name

    return this.http.get<CardResponse[]>(this.API_URL, {params}).pipe(
      map((res:any) => res.data ),
      tap((res:any) => console.log("holaaa"))
    )
  }


  getCard(id:string){
    const params = {id}
    return this.http
            .get(this.API_URL, {params})
            .pipe(
              map((res:any) => res.data[0]  ),
              tap( (res:any) => console.log(res) ))
  }


}
