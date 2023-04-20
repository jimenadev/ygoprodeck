import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CardResponse } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id!:string
  card$!: Observable<CardResponse>;
  constructor(private route: ActivatedRoute, private cardServices: CardService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ''

    this.card$ = this.cardServices.getCard(this.id)



  }

}
