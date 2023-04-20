import { Component, OnInit } from '@angular/core';
import { CardResponse } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { debounceTime } from 'rxjs'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cards: CardResponse[]=[];
  offset=0

  cardTextFC = new FormControl('')
  search:string = ''

  constructor(private cardServices: CardService) { }

  ngOnInit(): void {

    this.cardTextFC.valueChanges.pipe(
      debounceTime(1000)
    )
    .subscribe( (res) =>{
        this.cards = []
        this.search=res
        this.offset=0
        this.searchCards(res)
    })

    this.searchCards(null)
  }

  onScroll(){
    if(this.cardTextFC.value==''){
      this.offset += 100
      this.searchCards(null)
    }else{
      this.offset += 100
      this.searchCards(this.search)
    }

  }

  searchCards(cardname: string | null){
    this.cardServices.getCards(cardname,this.offset).subscribe(res =>this.cards = [...this.cards, ...res])
  }

}
