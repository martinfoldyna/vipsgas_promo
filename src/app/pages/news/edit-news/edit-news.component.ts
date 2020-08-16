import { Component, OnInit } from "@angular/core";
import { News } from "../../../@core/data/news";
import { NbDialogRef, NbToastrService } from "@nebular/theme";
import { FormControl, FormGroup } from "@angular/forms";
import { NewsService } from "../news.service";
import { GeneralService } from "../../../@core/utils/general.service";

@Component({
  selector: "ngx-edit-news",
  templateUrl: "./edit-news.component.html",
  styleUrls: ["./edit-news.component.scss"],
})
export class EditNewsComponent implements OnInit {
  news: News;
  updatingNews: boolean = false;

  editNewsForm: FormGroup = new FormGroup({
    name: new FormControl(""),
  });

  constructor(
    public newsService: NewsService,
    public toastr: NbToastrService,
    public dialogRef: NbDialogRef<EditNewsComponent>
  ) {}

  ngOnInit(): void {}

  handleUpdate() {
    this.newsService
      .editNews(this.news)
      .then((res) => {
        console.log(res);
        this.toastr.success("", "Novinka byla upravena.");
        this.dialogRef.close();
      })
      .catch((err) => {
        console.log(err);
        this.toastr.danger("", "Během komunikace s databází došlo k chybě.");
      });
  }
}
