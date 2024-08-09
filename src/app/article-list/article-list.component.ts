import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
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
  errorMessage: string = ''; // Message d'erreur pour le formulaire

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

  modifier(id: number | undefined): void {
    if (id !== undefined) {
      this.dataService.getArticle(id).subscribe(data => {
        this.article = data;
        this.isEdit = true;
      });
    } else {
      console.error('L\'ID est indéfini, impossible de modifier l\'article.');
    }
  }

  deleteArticle(id: number | undefined): void {
    if (id !== undefined) {
      this.dataService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      });
    } else {
      console.error('L\'ID est indéfini, impossible de supprimer l\'article.');
    }
  }

  onSubmit(articleForm: NgForm): void {
    this.errorMessage = ''; // Réinitialiser le message d'erreur

    if (articleForm.invalid) {
      this.errorMessage = 'Le formulaire contient des erreurs.';
      return;
    }

    // Validation des champs
    if (!this.validateTitle(this.article.title)) {
      this.errorMessage = 'Le titre ne doit contenir que des lettres et ne pas inclure de balises HTML.';
      return;
    }

    if (!this.validateBody(this.article.body)) {
      this.errorMessage = 'Le contenu ne doit contenir que des lettres, ne pas inclure de balises HTML et doit avoir moins de 500 mots.';
      return;
    }
  
    if (this.isEdit) {
      // Mettre à jour l'article existant
      this.dataService.updateArticle(this.article).subscribe((updatedArticle) => {
        // Mise à jour de l'article dans la liste des articles
        const index = this.articles.findIndex(a => a.id === updatedArticle.id);
        if (index !== -1) {
          this.articles[index] = updatedArticle;
        }
        this.article = { title: '', body: '' }; // Réinitialiser le formulaire
        this.isEdit = false; // Désactiver le mode édition
        this.router.navigate(['/articles']); // Redirection après modification
      });
    } else {
      // Créer un nouvel article
      this.dataService.createArticle(this.article).subscribe((newArticle) => {
        this.articles.unshift(newArticle);
        this.article = { title: '', body: '' }; // Réinitialiser le formulaire
        this.router.navigate(['/articles']); // Redirection après création
      });
    }
  }

  validateTitle(title: string): boolean {
    // Validation pour ne contenir que des lettres et ne pas inclure de balises HTML
    const titlePattern = /^[A-Za-z\s]+$/;
    const noHtmlTagsPattern = /<[^>]*>/;
    return titlePattern.test(title) && !noHtmlTagsPattern.test(title);
  }

  validateBody(body: string): boolean {
    // Validation pour ne contenir que des lettres, ne pas inclure de balises HTML et avoir moins de 500 mots
    const bodyPattern = /^[A-Za-z\s]+$/;
    const noHtmlTagsPattern = /<[^>]*>/;
    const wordLimit = 500;
    const wordCount = body.trim().split(/\s+/).length;

    return bodyPattern.test(body) &&
           !noHtmlTagsPattern.test(body) &&
           wordCount <= wordLimit;
  }
}
