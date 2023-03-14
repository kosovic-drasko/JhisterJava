import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PotrosnjaComponent } from '../list/potrosnja.component';
import { PotrosnjaDetailComponent } from '../detail/potrosnja-detail.component';
import { PotrosnjaRoutingResolveService } from './potrosnja-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const potrosnjaRoute: Routes = [
  {
    path: '',
    component: PotrosnjaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    // ,
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PotrosnjaDetailComponent,
    resolve: {
      potrosnja: PotrosnjaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(potrosnjaRoute)],
  exports: [RouterModule],
})
export class PotrosnjaRoutingModule {}
