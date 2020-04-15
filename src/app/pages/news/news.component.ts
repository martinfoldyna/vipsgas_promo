import { Component, OnInit } from '@angular/core';
import {News} from "../../@core/data/news";
import {AuthService} from "../auth/auth.service";
import {NewsService} from "./news.service";
import {GeneralService} from "../../@core/utils/general.service";

@Component({
  selector: 'ngx-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: News;
  allNews: Array<News>;
  constructor(
    private authService: AuthService,
    private newsService: NewsService,
    private generalService: GeneralService
  ) {
    this.news = {
      id: '',
      title: '',
      body: '',
    };
    this.allNews = new Array<News>();
  }

  ngOnInit() {
    this.getNews();
    console.log(new Date().toLocaleString().slice());
  }

  addArticle() {
    this.news.createdAt = Date.now();
    this.news.createdBy = {
      name: this.authService.getUser().name,
      photoURL: this.authService.getUser().photoURL
    }
    this.newsService.addNews(this.news);
    this.news = {
      id: '',
      title: '',
      body: ''
    }
  }

  getNews() {
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
    this.generalService.deleteItem('news', id).then(result => {
      console.log(result);
      this.getNews();
    }).catch(err => {
      console.log(err);
    })
  }

}
