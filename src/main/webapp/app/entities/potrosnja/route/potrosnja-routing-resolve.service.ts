import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPotrosnja } from '../potrosnja.model';
import { PotrosnjaService } from '../service/potrosnja.service';

@Injectable({ providedIn: 'root' })
export class PotrosnjaRoutingResolveService implements Resolve<IPotrosnja | null> {
  constructor(protected service: PotrosnjaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPotrosnja | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((potrosnja: HttpResponse<IPotrosnja>) => {
          if (potrosnja.body) {
            return of(potrosnja.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
