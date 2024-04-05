import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoodPageComponent} from "./components/mood-page/mood-page.component";
import {EditorPageComponent} from "./components/editor-page/editor-page.component";

const routes: Routes = [
  {
    path: '',
    component: MoodPageComponent
  },
  {
    path: 'edit',
    component: EditorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoodRoutingModule {
}
