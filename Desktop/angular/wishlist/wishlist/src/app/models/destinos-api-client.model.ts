
import { DestinoViaje } from './destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes-state.model';
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { HttpClientModule, HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable()
export class DestinosApiClient {
	destinos:DestinoViaje[] = [];

	// Programacion reactiva, vamos a publicarle a current, cual es el actual destino que esta siendo elegido coomo favorito...
	// Buscamos que otros puedan suscribirse a las actualizaciones de este objeto, simulamos servidor...
	//current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

	constructor(
		private store: Store<AppState>,
		@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
		private http: HttpClient
	) {
		this.store
			.select(state => state.destinos)
			.subscribe((data)=> {
				console.log('destinos sub store');
				console.log(data);
				this.destinos = data.items;
			});

		this.store
			.subscribe((data) => {
				console.log('all store');
				console.log(data);
			});
       
	}

	add(d: DestinoViaje){
		const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', {nuevo: d.nombre}, {headers: headers});

		this.http.request(req).subscribe((data: HttpResponse<{}>) => {
			if (data.status === 200 ){

				// Base de datos
				const myDb = db;

				console.log("DB" + d.nombre)
				//var d = d.nombre;

				myDb.destinos.add(d);
				

				myDb.destinos.toArray().then(destinos => console.log(destinos))
				console.log("Todos los detstinos a la bd2!");

				//this.store.dispatch(new NuevoDestinoAction(d));
				
			}
		});

	}

	getAll(){
	  return this.destinos;
	}

	getById(id: string): DestinoViaje {
		return this.destinos.filter(function(d) {return id.toString() === id; })[0];
	}


	elegir(d: DestinoViaje) {
		this.store.dispatch(new ElegidoFavoritoAction(d))
	}
	


} 
