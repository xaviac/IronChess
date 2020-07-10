import { Component, OnInit, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from '../../app.module';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 3;

  // Para las sugerencias creamos la variable searchResults, como un array donde tendremos las sugerencias...
  searchResults: string[];

  // En el constructor injectamos los valores de inicializacion que creamos en app.module.ts, como variable privada. Ponemos forwardRef para evitar la referencia circular...

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', [Validators.compose([
        Validators.required,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])]],
      url: ['']
    });

     this.fg.valueChanges.subscribe((form: any)=>{
       console.log('Cambio el formulario: ');
     })
   }

  ngOnInit(): void { 

    // Vamos a detectar a medida que se escribe, vamos a obtenerlo y damos sugerencias...
    let elemNombre = <HTMLInputElement>document.getElementById('nombre'); // Seleccionamos el elemento que estamos vigilando...

    fromEvent(elemNombre, 'input')   // Nos ponemos a la escucha del evento input para el elemento que vigilamos...
      .pipe(                          // pipe, nos permite realizar acciones en seria, una detras de otra...
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),    // MAP recibe un lambda, recibimos cada evento del teclado, obtenemos el valor del todo el campo, no solo de la tecla pulsada, lo que pasamos al siguiente operador, filter es el valor de la cadena...
        filter(text => text.length > 2),    // Filtramos que el contendio del texto sera mayor a dos, si es asi, sigue en caso contario, no continua...a
        debounceTime(200), // Se queda en espera 2 decimas de segundo, para dar tiempo a que siga tecleando, si no se teclea pasa a la siguiente. Si se teclea se cancela el proceso y toma el nuevo valor...
        distinctUntilChanged(), // Si van llegando distintos valores, (el usuario escribe y borra y borra), esto espera cuando hay un cambio...
        switchMap((text: string ) => ajax(this.config.apiEndpoint + '/ciudades?q=' + text))   // Hacemos consulta al Webservice....
      ).subscribe(AjaxResponse => {                    // Cuando todo eso pasa tenemos la devolucion de la sugerencia...
         this.searchResults = AjaxResponse.response;
      }); 
  }

  guardar(nombre: string, url:string): boolean {
    console.log("paso");
    console.log(nombre);
    const d = new DestinoViaje(nombre, url);
    console.log("Tenemos el nuevo objeto destino y lo vamos a añadir a la coleccion....")
    this.onItemAdded.emit(d);
    
    return false;
  } 

  nombreValidator(control: FormControl): {[s: string]: boolean}{
    const l = control.value.toString().trim().length;
    if (l>0 && l<5) {
      return {invalidNombre: true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s: string]: Boolean} | null => {

      const l = control.value.toString().trim().length;
      if (l>0 && l< minLong) {
        return {minLongNombre: true};
      }

      return null;
    }
  }
}
