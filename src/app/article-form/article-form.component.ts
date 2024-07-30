// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-article-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './article-form.component.html',
//   styleUrl: './article-form.component.css'
// })
// export class ArticleFormComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../article.interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  isEdit = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.dataService.getArticle(Number(id)).subscribe(article => {
        this.articleForm.patchValue(article);
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.articleForm.invalid) {
      return;
    }
    if (this.isEdit) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.dataService.updateArticle({ ...this.articleForm.value, id }).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    } else {
      this.dataService.createArticle(this.articleForm.value).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    }
  }
}
