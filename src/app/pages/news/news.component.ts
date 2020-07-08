import { Component, OnInit } from '@angular/core';
import {News} from "../../@core/data/news";
import {AuthService} from "../auth/auth.service";
import {NewsService} from "./news.service";
import {GeneralService} from "../../@core/utils/general.service";
import {TinyMceConfig} from "../../@core/data/tinyMceConfig";
import {NbToastrService} from "@nebular/theme";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: News;
  allNews: Array<News>;
  deletingArticle: boolean = false;

  constructor(
    public authService: AuthService,
    private newsService: NewsService,
    private generalService: GeneralService,
    private toastr: NbToastrService
  ) {
    this.news = {
      title: '',
      body: '',
    };
    this.allNews = new Array<News>();
  }

  newsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.loadNews();
  }

  addArticle() {
    this.news.createdAt = Date.now();
    this.news.createdBy = this.authService.getUser();
    console.log(this.news);
    this.newsService.addNews(this.news).then(response => {
      this.toastr.success('', 'Nový příspěvek byl úspěšně přidán.')
      this.newsForm.reset();
    }).catch(err => {
      this.toastr.warning(err, 'Chyba');
    });

    this.loadNews()
  }

  loadNews() {
    this.newsService.getNews().subscribe(news => {
        this.allNews = news.map(a => {
          const data = a.payload.doc.data() as News;
          const id = a.payload.doc.id;
          return { id, ...data };
        });

        console.log(this.allNews);
    });
  }

  deleteArticle(id) {
    this.deletingArticle = true;
    this.generalService.deleteItem('news', id).then(result => {
      this.deletingArticle = false;
      this.toastr.success('', 'Příspěvek byl úspěšně smazán.')
      this.loadNews();
    }).catch(err => {
      this.toastr.danger(JSON.stringify(err), 'Chyba');
    })
  }

}
