import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { DestinosApiClient } from './../../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../../models/destinos-viajes-state.model';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinosApiClient ]
})

export class ListaDestinosComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];  // Variable para guardar cada vez que tenemos una actualizacion en Current...

/*
  DestinosApiClient: any;
  public get destinosApiClient(): DestinosApiClient {return this._destinosApiClient;}
  public set destinosApiClient(value: DestinosApiClient) { this._destinosApiClient = value; }

*/

  constructor(
    public destinosApiClient: DestinosApiClient,
    private store: Store<AppState> 
    ) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];  // Inicializamos la variable updates...

  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {

    console.log("lista-destinos // Agregado...")

    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    //this.store.dispatch(new NuevoDestinoAction(d));
  }

  // Version con reactiva, CURRENT

  elegido(e: DestinoViaje){
    this.destinosApiClient.elegir(e);
    //this.store.dispatch(new ElegidoFavoritoAction(e));
  }

}
