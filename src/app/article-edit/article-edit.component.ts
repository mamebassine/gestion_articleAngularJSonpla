import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-edit',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: Article = { title: '', body: '' };
  errorMessage: string = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getArticle(+id).subscribe(
        article => {
          this.article = article;
        },
        error => {
          this.errorMessage = 'Erreur lors du chargement de l\'article.';
        }
      );
    }
  }

  onSubmit(): void {
    if (this.article.title && this.article.body) {
      this.dataService.updateArticle(this.article).subscribe(
        () => {
          this.router.navigate(['/articles']);
        },
        error => {
          this.errorMessage = 'Erreur lors de la mise à jour de l\'article.';
        }
      );
    }
  }
}
