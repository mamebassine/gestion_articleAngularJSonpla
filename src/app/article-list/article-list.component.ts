import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

  deleteArticle(id: number | undefined): void {
    if (id !== undefined) {
      this.dataService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      });
    }
  }
}
