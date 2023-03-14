import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PotrosnjaService } from '../service/potrosnja.service';

import { PotrosnjaComponent } from './potrosnja.component';

describe('Potrosnja Management Component', () => {
  let comp: PotrosnjaComponent;
  let fixture: ComponentFixture<PotrosnjaComponent>;
  let service: PotrosnjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'potrosnja', component: PotrosnjaComponent }]), HttpClientTestingModule],
      declarations: [PotrosnjaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(PotrosnjaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PotrosnjaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PotrosnjaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.potrosnjas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to potrosnjaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPotrosnjaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPotrosnjaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
