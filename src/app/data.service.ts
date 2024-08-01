






import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Article } from './article.interface';
import { Comment } from './comment.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments'; // URL pour les commentaires

  constructor(private http: HttpClient) {}

  // Récupère la liste de tous les articles
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      catchError(this.errorHandler) // Gestion des erreurs
    );
  }

  // Récupère un article par son ID
  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.errorHandler) // Gestion des erreurs
    );
  }

  // Crée un nouvel article
  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article).pipe(
      catchError(this.errorHandler) // Gestion des erreurs
    );
  }

  // Met à jour un article existant
  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${article.id}`, article).pipe(
      catchError(this.errorHandler) // Gestion des erreurs
    );
  }

  // Supprime un article par son ID
  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.errorHandler) // Gestion des erreurs
    );
  }

  // Récupère les commentaires pour un article donné
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsUrl}?postId=${postId}`).pipe(
      catchError(this.errorHandler) // Gestion des erreurs
    );
  }

  // Méthode pour gérer les erreurs
  private errorHandler(error: any): Observable<never> {
    console.error('An error occurred:', error); // Affichage de l'erreur dans la console
    return of(); // Retourne un Observable vide en cas d'erreur
  }
}




























// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Article } from './article.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 

//   constructor(private http: HttpClient) {}

//   getArticles(): Observable<Article[]> {
//     return this.http.get<Article[]>(this.apiUrl);
//   }

//   getArticle(id: number): Observable<Article> {
//     return this.http.get<Article>(`${this.apiUrl}/${id}`);
//   }

//   createArticle(article: Article): Observable<Article> {
//     return this.http.post<Article>(this.apiUrl, article);
//   }

//   updateArticle(article: Article): Observable<Article> {
//     return this.http.put<Article>(`${this.apiUrl}/${article.id}`, article);
//   }

//   deleteArticle(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }
