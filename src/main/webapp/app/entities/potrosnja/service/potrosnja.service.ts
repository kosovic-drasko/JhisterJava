import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPotrosnja, NewPotrosnja } from '../potrosnja.model';

export type PartialUpdatePotrosnja = Partial<IPotrosnja> & Pick<IPotrosnja, 'id'>;

export type EntityResponseType = HttpResponse<IPotrosnja>;
export type EntityArrayResponseType = HttpResponse<IPotrosnja[]>;

@Injectable({ providedIn: 'root' })
export class PotrosnjaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/potrosnjas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPotrosnja>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPotrosnja[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  potrosnja(): any {
    return this.http.get(`${this.resourceUrl}`);
  }

  getPotrosnjaIdentifier(potrosnja: Pick<IPotrosnja, 'id'>): number {
    return potrosnja.id;
  }

  comparePotrosnja(o1: Pick<IPotrosnja, 'id'> | null, o2: Pick<IPotrosnja, 'id'> | null): boolean {
    return o1 && o2 ? this.getPotrosnjaIdentifier(o1) === this.getPotrosnjaIdentifier(o2) : o1 === o2;
  }

  addPotrosnjaToCollectionIfMissing<Type extends Pick<IPotrosnja, 'id'>>(
    potrosnjaCollection: Type[],
    ...potrosnjasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const potrosnjas: Type[] = potrosnjasToCheck.filter(isPresent);
    if (potrosnjas.length > 0) {
      const potrosnjaCollectionIdentifiers = potrosnjaCollection.map(potrosnjaItem => this.getPotrosnjaIdentifier(potrosnjaItem)!);
      const potrosnjasToAdd = potrosnjas.filter(potrosnjaItem => {
        const potrosnjaIdentifier = this.getPotrosnjaIdentifier(potrosnjaItem);
        if (potrosnjaCollectionIdentifiers.includes(potrosnjaIdentifier)) {
          return false;
        }
        potrosnjaCollectionIdentifiers.push(potrosnjaIdentifier);
        return true;
      });
      return [...potrosnjasToAdd, ...potrosnjaCollection];
    }
    return potrosnjaCollection;
  }
}
