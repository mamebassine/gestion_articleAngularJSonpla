// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-article-form',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './article-form.component.html',
// //   styleUrl: './article-form.component.css'
// // })
// // export class ArticleFormComponent {

// // }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from '../data.service';
// import { Article } from '../article.interface';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-article-form',
//   imports : [FormsModule],
//   standalone : true,
//   templateUrl: './article-form.component.html',
//   styleUrls: ['./article-form.component.css']
// })
// export class ArticleFormComponent implements OnInit {
//   article: Article = { title: '', body: '' };
//   isEdit: boolean = false;

//   constructor(
//     private dataService: DataService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.isEdit = true;
//       this.dataService.getArticle(+id).subscribe(article => {
//         this.article = article;
//       });
//     }
//   }

//   onSubmit(): void {
//     if (this.isEdit) {
//       this.dataService.updateArticle(this.article).subscribe(() => {
//         this.router.navigate(['/articles']);
//       });
//     } else {
//       this.dataService.createArticle(this.article).subscribe(() => {
//         this.router.navigate(['/articles']);
//       });
//     }
//   }
// }







import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  article: Article = { title: '', body: '' }; // Article à créer ou modifier
  isEdit: boolean = false; // Mode édition ou création

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis les paramètres de la route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true; // Activer le mode édition
      this.dataService.getArticle(+id).subscribe(article => {
        this.article = article; // Charger les détails de l'article à modifier
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
      this.dataService.createArticle(this.article).subscribe(() => {
        this.router.navigate(['/articles']); // Redirection après création
      });
    }
  }
}
