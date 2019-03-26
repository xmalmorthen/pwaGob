import { Component } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const __PrefixTitle: String = 'Kioscos GobCol - ';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta) {

      this.setPageTitle().subscribe( event => {
        this.title.setTitle( __PrefixTitle + event.title );
        this.setMetaPage();
      });
  }

  private setPageTitle(): Observable<any> {
    return this.router.events
        .pipe(
          filter( event => event instanceof ActivationEnd ),
          filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
          map ( (event: ActivationEnd) => event.snapshot.data)
        );
  }

  private setMetaPage(): void {
    const metaTag: MetaDefinition = {
      name : 'description',
      content: this.title.getTitle()
    };

    this.meta.updateTag({ name: 'description', content: `PP Kioscos de servicio de Gobierno del Estado de Colima - Página [ ${this.title.getTitle()} ]` });
    this.meta.updateTag({ name: 'author', content: 'ICSIC Gobierno del Estado de Colima [ Xmal ]' });
    this.meta.updateTag({ name: 'keywords', content: `GobCol, Kioscos, Gobierno Colima, Colima, Trámites, Servicios, ${this.title.getTitle()}` });
  }
}
