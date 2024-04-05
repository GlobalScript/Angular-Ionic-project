import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NumerologyPageComponent} from "./components/numerology-page/numerology-page.component";
import {SquareComponent} from "./components/square/square.component";
import {DescriptionComponent} from "./components/description/description.component";

const routes: Routes = [
  {path: '', component: NumerologyPageComponent},
  {path: 'square/:date', component: SquareComponent},
  {path: 'description/:date', component: DescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NumerologyRoutingModule {
}
