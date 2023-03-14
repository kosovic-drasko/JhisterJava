import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPotrosnja } from '../potrosnja.model';

@Component({
  selector: 'jhi-potrosnja-detail',
  templateUrl: './potrosnja-detail.component.html',
})
export class PotrosnjaDetailComponent implements OnInit {
  potrosnja: IPotrosnja | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ potrosnja }) => {
      this.potrosnja = potrosnja;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
