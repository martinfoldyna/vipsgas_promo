import { Component, OnInit } from '@angular/core';
import {Reference} from "../../../@core/data/reference";
import {ReferencesService} from "../references.service";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {TinyMceConfig} from "../../../@core/data/tinyMceConfig";
import {AuthService} from "../../auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-reference-dashboard',
  templateUrl: './reference-dashboard.component.html',
  styleUrls: ['./reference-dashboard.component.scss']
})
export class ReferenceDashboardComponent implements OnInit {


  newReference: Reference;
  allReferences: Array<Reference>;

  referenceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private referenceService: ReferencesService,
    private toastr: NbToastrService,
    private router: Router,
    public authService: AuthService
  ) {
    this.newReference = {
      title: '',
    }
    this.allReferences = new Array<Reference>();
  }

  ngOnInit() {
    this.loadReferences();
  }

  createNewReference() {
    console.log(this.newReference);
    if (this.newReference.content) {
      this.referenceService.createReference(this.newReference).then(response => {
        this.toastr.success('','Nová reference byla vytvořena.');
        this.loadReferences();
        this.referenceForm.reset();
      }).catch(err => {
        this.toastr.danger(err ? JSON.stringify(err) : 'Během vytváření reference došlo k chybě.', 'Chyba')
      })
    }
  }

  loadReferences() {
    this.referenceService.loadAllReferences().then(references => {
      if(references) {
        this.allReferences = references;
      } else {
        this.toastr.warning('Během načítání dat došlo k chybě.', 'Chyba');
      }
    })
  }


}
