import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReelsComponent } from './views/reels/reels.component';

const routes: Routes = [
  { path: 'reels', component: ReelsComponent },
  { path: '',   redirectTo: '/reels', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
