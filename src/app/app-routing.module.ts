import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'main', loadComponent: () => import('./main/main.component').then(m => m.MainComponent) },
  { path: 'product-list', loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'telemedicina', loadComponent: () => import('./telemedicina/telemedicina.component').then(m => m.TelemedicinaComponent) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
