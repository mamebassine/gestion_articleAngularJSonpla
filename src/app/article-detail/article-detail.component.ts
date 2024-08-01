import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';
import { Comment } from '../comment.interface'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined; // Propriété pour stocker l'article récupéré
  comments: Comment[] = []; // Propriété pour stocker les commentaires récupérés

  constructor(
    private route: ActivatedRoute, // Permet d'accéder aux paramètres de la route
    private dataService: DataService // Service pour les opérations sur les articles et commentaires
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'article à partir des paramètres de la route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      // Appeler le service pour obtenir les détails de l'article
      this.dataService.getArticle(id).subscribe(
        (article) => {
          this.article = article; // Stocker l'article récupéré
          this.loadComments(id); // Charger les commentaires pour cet article
        },
        (error) => {
          console.error('Error fetching article:', error);
          // Gestion d'erreur, vous pouvez ajouter une redirection ou un message d'erreur ici
        }
      );
    }
  }

  // Méthode pour charger les commentaires associés à un article
  loadComments(postId: number): void {
    this.dataService.getComments(postId).subscribe(
      (comments) => {
        this.comments = comments; // Stocker les commentaires récupérés
      },
      (error) => {
        console.error('Error fetching comments:', error);
        // Gestion d'erreur, vous pouvez ajouter une redirection ou un message d'erreur ici
      }
    );
  }

  // Méthode pour revenir à la liste des articles
  backToList(): void {
    window.history.back(); // Retourner à la page précédente
  }
}



























