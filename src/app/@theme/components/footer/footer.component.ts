import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      &copy; VIPS gas 2020, Vytvořil: Martin Foldyna, Design: <a href="https://akveo.page.link/8V2f" target="_blank">Akveo</a>
    </span>
    <div class="socials">
      <a href="/auth" class="ion ion-person"></a>
    </div>
  `,
})
export class FooterComponent {
}
