// Redux

import { Injectable } from '@angular/core';
import { Action, State } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';
import { HttpClientModule } from '@angular/common/http';




// ESTADO
export interface DestinosViajesState {
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
}

export function initializeDestinosViajesState() {
    return {
        items: [],
        loading: false,
        favorito: null
    };
}

// ACCIONES
export enum DestinoViajeActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] Vote Up',
    VOTE_DOWN = '[Destinos Viajes] Vote Down',
    INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action {
    type = DestinoViajeActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
    type = DestinoViajeActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje){}
}

export class VoteUpAction implements Action {
    type = DestinoViajeActionTypes.VOTE_UP;
    constructor(public destino: DestinoViaje){}
}

export class VoteDownAction implements Action {
    type = DestinoViajeActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViaje){}
}

export class InitMyDataAction implements Action {
    type = DestinoViajeActionTypes.INIT_MY_DATA;
    constructor(public destinos: string[]) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | InitMyDataAction;

// REDUCERS

export function reducerDestinosViajes(
    state: DestinosViajesState,
    action: DestinosViajesActions
): DestinosViajesState {
    switch (action.type) {
        case DestinoViajeActionTypes.NUEVO_DESTINO: {
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino ]
            };
        }
        case DestinoViajeActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach(x => x.setSelected(false));
            const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
            fav.setSelected(true);
        
            return {
                ...state,
                favorito: fav
            };
        }  
        
        case DestinoViajeActionTypes.VOTE_UP: {


            const d: DestinoViaje = (action as VoteUpAction).destino;
            console.log("redux vote up 1");
            d.voteUp();

            return { ...state };
        } 
        
        case DestinoViajeActionTypes.VOTE_DOWN: {

            const d: DestinoViaje = (action as VoteUpAction).destino;
            d.voteDown();
            return { ...state };
        } 

        case DestinoViajeActionTypes.INIT_MY_DATA: {
            const destinos: string[] = (action as InitMyDataAction).destinos;
            return {
                ...state,
                items: destinos.map((d) => new DestinoViaje(d, ''))
            }
        }
       
    }
    return state;
}

// EFFECTS
@Injectable()
export class DestinosViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(DestinoViajeActionTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction ) => new ElegidoFavoritoAction(action.destino))
    );

    constructor(private actions$: Actions) {}
}

