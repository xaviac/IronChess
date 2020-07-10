export class DestinoViaje {

	private selected: boolean;
	public servicios: string[];


	constructor(public nombre: string, public u: string, public votes:number = 21){
		console.log("Clase detino viaje");
		console.log(nombre, u);
		this.servicios = ['Piscina', 'Desayuno']
	}

	// metodos
	// Si esta seleccionado devuelve true
	isSelected(): boolean {
		return this.selected;
	}

	// Si no esta seleccionado selecciona...
	setSelected(s: boolean){
		this.selected = s;

	}

	// Incrementa votos...
	voteUp(){

		console.log(typeof(this.votes))
		//this.votes = 1;
		console.log("En la calse voteup 2")
	}

	// Decrementa votos...
	voteDown(){
		this.votes--;
	}

}
