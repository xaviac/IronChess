import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, Injectable, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import Dexie from 'dexie';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';

// Sacamos esta dependencia, para inyeccion avanzada...
//import { DestinosApiClient } from './models/destinos-api-client.model';

import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { DestinosViajesState, reducerDestinosViajes, initializeDestinosViajesState, DestinosViajesEffects, InitMyDataAction } from './models/destinos-viajes-state.model';
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component'
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';

// Importamos HttpClientModule ...
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DestinoViaje } from './models/destino-viaje.model';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// mapas
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
// Animaciones
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EspiameDirective } from './espiame.directive';
import { TrackearClickDirective } from './trackear-click.directive'



//
// app config - variables de inicializacion...
// 

export interface AppConfig {
  apiEndpoint: String;
} 

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000',
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// -> Importante añadir el providers del valor...

// Fin de appconfig


// Agregarmos las rutas hijas de vuelos
export const childrenRoutersVuelos: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: VuelosMainComponentComponent},
  {path: 'mas-info', component: VuelosMasInfoComponentComponent},
  {path: 'destino/:id', component: VuelosDetalleComponentComponent},  
];


// Rutas en la barra de direciones...
const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent },
  {path: 'destino/:id', component: DestinoDetalleComponent },
  {path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard]
  },
  { path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [ UsuarioLogueadoGuard ],
    children: childrenRoutersVuelos
  }
];

// Fin rutas...



// redux init----

export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes

};

let reducersInitialState = {
  destinos: initializeDestinosViajesState()
};

//redux fin init

// init app init - Vamos a inicializar la aplicacion....

export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}
 
  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});

    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });

    const response: any = await this.http.request(req).toPromise();

    this.store.dispatch(new InitMyDataAction(response.body));

  }
  
}



// fin app init...


// init dexie db

export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {}
}


@Injectable({
  providedIn: 'root'
})

export class MyDatabase extends Dexie { 
  destinos: Dexie.Table<DestinoViaje, number>;
  translations: Dexie.Table<Translation, number>;

  constructor() {

    super('MyDatabase');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl'
    });

    this.version(2).stores({
      destinos: '++id, nombre, imagenUrl',
      translations: '++id, lang, key, value'
    });

  }
}

export const db = new MyDatabase();

// finde dexie db

// i18n init -- Cargador de traducciones...

class TranslationLoader implements TranslateLoader {

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    alert('app.module - line 166');
    const promise = db.translations
                      .where('lang')
                      .equals(lang)
                      .toArray()
                      .then(results => {
                                        if (results.length === 0) {
                                          console.log('linea 179');
                                          return this.http
                                            .get<Translation[]>(APP_CONFIG_VALUE.apiEndpoint + '/api/translation?lang=' + lang)
                                            .toPromise()
                                            .then(apiResults => {
                                              db.translations.bulkAdd(apiResults);

                                              return apiResults;
                                            });
                                        }
                                        console.log('linea189');
                                        return results;
                                      }).then((traducciones)=> {
                                        console.log("Traducciones cargadas");
                                        console.log(traducciones);
                                    
                                        return traducciones;
                                      }).then((traducciones) => {
                                        console.log('linea 198')
                                        return traducciones.map((t) => ({[t.key]: t.value}));
                                      });
    return from(promise).pipe(flatMap((elems) => from(elems)));
  }

}


  function HttpLoaderFactory(http: HttpClient){
    return new TranslationLoader(http);
  }


// i18n fin

@NgModule({
  declarations: [
    AppComponent,
    //AngularWishlistComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    EspiameDirective,
    TrackearClickDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    NgxMapboxGLModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslationLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    //DestinosApiClient,
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE } , // PROVIDER de inicializacion...
    AppLoadService, { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true},
    MyDatabase
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
