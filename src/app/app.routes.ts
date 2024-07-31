import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/new', component: ArticleFormComponent },
  { path: 'articles/edit/:id', component: ArticleFormComponent }
  
];
