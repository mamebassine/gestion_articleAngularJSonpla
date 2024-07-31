// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-article-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './article-detail.component.html',
//   styleUrl: './article-detail.component.css'
// })
// export class ArticleDetailComponent {

// }




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';

@Component({
  selector: 'app-article-detail',
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
    this.dataService.getArticle(id).subscribe(article => {
      this.article = article;
    });
  }

  backToList(): void {
    window.history.back();
  }
}
