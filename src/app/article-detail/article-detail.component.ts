import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone :true,
  imports : [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dataService.getArticle(id).subscribe(
        (article) => {
          this.article = article;
        },
        (error) => {
          console.error('Error fetching article:', error);
          // Vous pouvez ajouter une gestion d'erreur ici, comme rediriger l'utilisateur vers une page d'erreur
        }
      );
    }
  }

  backToList(): void {
    window.history.back();
  }
}
