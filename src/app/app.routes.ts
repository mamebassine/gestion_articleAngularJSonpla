import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component'; // Assurez-vous d'importer ce composant

export const appRoutes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/new', component: ArticleFormComponent },
  // { path: 'articles/edit/:id', component: ArticleFormComponent },

  { path: 'articles/edit/:id', component: ArticleFormComponent }, // Modification

  { path: 'articles/:id', component: ArticleDetailComponent } // Route pour voir les détails d'un article
];
