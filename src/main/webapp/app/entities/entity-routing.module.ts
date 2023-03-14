import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'potrosnja',
        data: { pageTitle: 'Potrosnja' },
        loadChildren: () => import('./potrosnja/potrosnja.module').then(m => m.PotrosnjaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
