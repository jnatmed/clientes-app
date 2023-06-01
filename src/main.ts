import axios from 'axios';
import { formulario } from './interfaces';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium similique aliquid error quas, ipsa quos nihil non amet repudiandae est veritatis officiis quaerat recusandae animi temporibus dignissimos, incidunt ad quam?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, nulla ad. Dolorem numquam quos magnam nam et nulla deserunt illum, ab maxime, facilis dicta recusandae sequi reiciendis! Ipsam, facilis debitis?
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nulla hic ipsum adipisci animi distinctio et aut saepe laudantium nobis earum perspiciatis, nisi doloribus! Reprehenderit obcaecati laboriosam natus soluta consequuntur?
</div>
`;

const app = document.querySelector<HTMLDivElement>('#app');
const home = document.querySelector<HTMLAnchorElement>('#home');
const clientes = document.querySelector<HTMLAnchorElement>('#clientes');
const crearCliente = document.querySelector<HTMLAnchorElement>('#crearCliente');


home?.addEventListener('click', () => {

	app!.innerHTML = '';
	
	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	clientes!.classList.remove('active');
	crearCliente!.classList.remove('active');
	home!.classList.add('active');
});

clientes?.addEventListener('click', (e) => {
	e.preventDefault();
	
	axios.get('https://api-user-production.up.railway.app/usuarios')
	.then(function (response) {
		// handle success
		app!.innerHTML = '';

		let tabla = document.createElement("table");
		tabla.className = 'table table-bordered';
		let tblBody = document.createElement("tbody");
		let thead = document.createElement("thead");
		thead.innerHTML = `
			<tr>
			<th scope="col">Nombre</th>
			<th scope="col">Apellido</th>
			<th scope="col">Numero de Telefono</th>
			<th scope="col">Pais</th>
			<th scope="col">Localidad</th>
			<th scope="col">Codigo Postal</th>
			<th scope="col">Direccion</th>
			</tr>
		`;
		tabla.appendChild(thead);
		response['data'].forEach((element: any) => {
			let fila = document.createElement('tr');
			// let th = document.createElement('th');
			// th.scope = "row";
			// fila.appendChild(th);
			fila.appendChild(crearNodo(element.nombre));
			fila.appendChild(crearNodo(element.apellido));
			fila.appendChild(crearNodo(element.numeroTelefono));			
			fila.appendChild(crearNodo(element.pais));			
			fila.appendChild(crearNodo(element.localidad));			
			fila.appendChild(crearNodo(element.codPostal));
			fila.appendChild(crearNodo(element.direccion));			
			tblBody.appendChild(fila);
		});
		tabla.appendChild(tblBody);
		tabla.setAttribute("border", "2");

		app!.appendChild(tabla);
	})
	.catch(function (error) {
		// handle error
		console.log(error);
	})
	.finally(function () {
		// always executed
	});


	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	home!.classList.remove('active');
	crearCliente!.classList.remove('active');
	clientes!.classList.add('active');
});

crearCliente?.addEventListener('click', () => {

	app!.innerHTML = `
	<form >
		<div class="input-group mb-3">
			<span class="input-group-text">Nombre</span>
			<input id="first_name" type="text" aria-label="First name" class="form-control">
			<span class="input-group-text">Apellido</span>
			<input id="last_name" type="text" aria-label="Last name" class="form-control">
		</div>	
		<div class="input-group mb-3">
			<span class="input-group-text">N° Telefono</span>
			<input id="phone" type="text" aria-label="phone" class="form-control">
			<span class="input-group-text">Empresa</span>
			<input id="empresa" type="text" aria-label="empresa" class="form-control">
		</div>	
		<div class="input-group mb-3">
			<span class="input-group-text">Cuit/Cuil</span>
			<input id="cuil" type="text" aria-label="cuit cuil" class="form-control">
			<select id="pais" class="form-select" aria-label="Default select example">
				<option selected>Pais</option>
				<option value="argentina">argentina</option>
				<option value="brazil">Brazil</option>
				<option value="uruguay">Paraguay</option>
			</select>	
			</div>	
		<div class="input-group mb-3">
			<span class="input-group-text">Localidad</span>
			<input id="localidad" type="text" aria-label="localidad" class="form-control">
			<span class="input-group-text">Codigo Postal</span>
			<input id="cp" type="text" aria-label="cp" class="form-control">
			<span class="input-group-text">Direccion</span>
			<input id="direccion" type="text" aria-label="direccion" class="form-control">
		</div>	
		<button class="btn btn-outline-success mb-3" id="btnenviar">Enviar Datos</button>
	</form>
	`;	
	
	const btnenviar = $('#btnenviar');

	btnenviar?.addEventListener('click',  async (e : Event) => {
		e.preventDefault();

		let inputs = cargarInputs();
		let errores = validarInputs(inputs);
		
		if(errores.length == 0) {
			
			axios.get('https://api-user-production.up.railway.app/')
			.then(function (response) {
				// handle success
				console.log(response['data']);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
			});

			axios.post('https://api-user-production.up.railway.app/usuarios/', inputs )
			.then(function (response) {
				console.log(response['data']);
			})
			.catch(function (error) {
				console.log(error);
			});

		}else{	
			const divError = document.createElement('div');
			divError.className = 'alert alert-danger';
			divError.role = 'alert';	
			divError.innerHTML = errores;
			app!.appendChild(divError);
			}

	});

	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	home!.classList.remove('active');
	clientes!.classList.remove('active');
	crearCliente!.classList.add('active');
});

function $(idElement : any){
	return document.querySelector(idElement);
}


function cargarInputs(){
	return {
		nombre : $('#first_name').value.toLowerCase(),
		apellido : $('#last_name').value.toLowerCase(),
		numeroTelefono : $('#phone').value,
		pais : $('#pais').value.toLowerCase(),
		localidad : $('#localidad').value.toLowerCase(),
		codPostal : $('#cp').value,	
		direccion : $('#direccion').value.toLowerCase(),
	}	
}

function validarInputs(inputs : any) {
	const err : any = [];
	if(inputs.nombre.length == 0 || inputs.apellido.length == 0) {
		err.push("El primer nombre o apellido estan vacio");
	}	
	if(inputs.codPostal.length != 4) {
		err.push("el cuil debe tener una longitud de 11 digitos");
	}

	return err;
}

function crearNodo(nodoDato : any){
	let data = document.createElement('td');
	data.setAttribute("border", "2")
	data.innerHTML = nodoDato;
	return data;
}

/**
 first_name
 last_name
 phone
 empresa
 cuil
 pais
 localidad
 cp
 direccion
 */

