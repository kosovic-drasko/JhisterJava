import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';

import { IPotrosnja } from '../potrosnja.model';
import { ASC, DESC, SORT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, PotrosnjaService } from '../service/potrosnja.service';
import { SortService } from 'app/shared/sort/sort.service';

@Component({
  selector: 'jhi-potrosnja',
  templateUrl: './potrosnja.component.html',
})
export class PotrosnjaComponent implements OnInit {
  potrosnjas?: IPotrosnja[];
  isLoading = false;

  predicate = 'id';
  ascending = true;
  potrosnja?: number;

  constructor(
    protected potrosnjaService: PotrosnjaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService
  ) {}

  trackId = (_index: number, item: IPotrosnja): number => this.potrosnjaService.getPotrosnjaIdentifier(item);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.queryBackendPotrosnja();
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.potrosnjas = this.refineData(dataFromBody);
  }

  protected refineData(data: IPotrosnja[]): IPotrosnja[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IPotrosnja[] | null): IPotrosnja[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.potrosnjaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected queryBackendPotrosnja(): any {
    return this.potrosnjaService.potrosnja(50, 6).subscribe({
      next: (res: number | undefined) => {
        this.potrosnja = res;
        // this.predjenoKm=res;
        console.log('To je potrosnja:', this.potrosnja);
      },
    });
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
