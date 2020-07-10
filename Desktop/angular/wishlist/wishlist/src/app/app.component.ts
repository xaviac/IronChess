import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-wishlist';

  /* Creamos la vaiable time que es un observador, estamos creando un reloj que se ve en pagina Web. Lo que necesita el estar pendiente cuando ser realiza un next, que se realiza cada 1 segundo. Este observable es relametn un observable del String */

  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()),1000);
    return null;
  });

  constructor(public translate: TranslateService) {
    console.log('***************** iniciamos Translate - app.component.ts - line 22');
    translate.getTranslation('en').subscribe(x => console.log('x: ' + JSON.stringify(x)));
    translate.setDefaultLang('es');
  };

  destinoAgregado(d) {
    //alert(d.nombre)
  }


}
