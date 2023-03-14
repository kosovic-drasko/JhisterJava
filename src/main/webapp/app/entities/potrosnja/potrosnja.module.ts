import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PotrosnjaComponent } from './list/potrosnja.component';
import { PotrosnjaDetailComponent } from './detail/potrosnja-detail.component';
import { PotrosnjaRoutingModule } from './route/potrosnja-routing.module';

@NgModule({
  imports: [SharedModule, PotrosnjaRoutingModule],
  declarations: [PotrosnjaComponent, PotrosnjaDetailComponent],
})
export class PotrosnjaModule {}
