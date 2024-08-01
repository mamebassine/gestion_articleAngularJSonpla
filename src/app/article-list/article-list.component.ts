// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { DataService } from '../data.service';
// import { Article } from '../article.interface';

// @Component({
//   selector: 'app-article-list',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './article-list.component.html',
//   styleUrls: ['./article-list.component.css']
// })
// export class ArticleListComponent implements OnInit {
//   articles: Article[] = [];
//   article: Article = { title: '', body: '' }; // Article à créer ou modifier
//   isEdit: boolean = false; // Mode édition ou création


//   constructor(private dataService: DataService, private route: ActivatedRoute,
//     private router: Router) {}

//   ngOnInit(): void {
//     this.dataService.getArticles().subscribe((articles) => {
//       this.articles = articles;
//     });

//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.isEdit = true; // Activer le mode édition
//       this.dataService.getArticle(+id).subscribe(article => {
//         this.article = article; // Charger les détails de l'article à modifier
//       });
//     }
//   }

//   deleteArticle(id: number | undefined): void {
//     if (id !== undefined) {
//       this.dataService.deleteArticle(id).subscribe(() => {
//         this.articles = this.articles.filter(article => article.id !== id);
//       });
//     }
//   }

//   onSubmit(): void {
//     if (this.isEdit) {
//       // Mettre à jour l'article existant
//       this.dataService.updateArticle(this.article).subscribe(() => {
//         this.router.navigate(['/articles']); // Redirection après modification
//       });
//     } else {
//       // Créer un nouvel article
//       this.dataService.createArticle(this.article).subscribe((newArticle) => {
//         this.articles.unshift(newArticle);
//         this.router.navigate(['/articles']); // Redirection après création
//       });
//     }
    
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  article: Article = { title: '', body: '' }; // Article à créer ou modifier
  isEdit: boolean = false; // Mode édition ou création

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    // Charger tous les articles
    this.dataService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });

    // Vérifier si un ID est présent dans l'URL pour charger l'article correspondant
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true; // Activer le mode édition
      this.dataService.getArticle(+id).subscribe(article => {
        this.article = article; // Charger les détails de l'article à modifier
      });
    }
  }


  modifier(id: any): void {
    this.dataService.getArticle(id).subscribe(data => {
      this.article = data; // Remplacez 'article' par la propriété où vous stockez l'article récupéré
  
      // Optionnel: Naviguer vers la page de modification si nécessaire
    });
  }
  

  deleteArticle(id: number | undefined): void {
    if (id !== undefined) {
      this.dataService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      // Mettre à jour l'article existant
      this.dataService.updateArticle(this.article).subscribe(() => {
        this.router.navigate(['/articles']); // Redirection après modification
      });
    } else {
      // Créer un nouvel article
      this.dataService.createArticle(this.article).subscribe((newArticle) => {
        this.articles.unshift(newArticle);
        this.router.navigate(['/articles']); // Redirection après création
      });
    }
  }
}
