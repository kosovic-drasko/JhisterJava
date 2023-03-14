import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PotrosnjaDetailComponent } from './potrosnja-detail.component';

describe('Potrosnja Management Detail Component', () => {
  let comp: PotrosnjaDetailComponent;
  let fixture: ComponentFixture<PotrosnjaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PotrosnjaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ potrosnja: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PotrosnjaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PotrosnjaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load potrosnja on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.potrosnja).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
