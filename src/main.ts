
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
	app!.innerHTML = `
	<div class="">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium similique aliquid error quas, ipsa quos nihil non amet repudiandae est veritatis officiis quaerat recusandae animi temporibus dignissimos, incidunt ad quam?
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, nulla ad. Dolorem numquam quos magnam nam et nulla deserunt illum, ab maxime, facilis dicta recusandae sequi reiciendis! Ipsam, facilis debitis?
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, nulla hic ipsum adipisci animi distinctio et aut saepe laudantium nobis earum perspiciatis, nisi doloribus! Reprehenderit obcaecati laboriosam natus soluta consequuntur?
  </div>
	`;
	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	clientes!.classList.remove('active');
	crearCliente!.classList.remove('active');
	home!.classList.add('active');
});

clientes?.addEventListener('click', () => {
	app!.innerHTML = `<h1> Aqui muestro la lista de clientes </h1>`;

	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	home!.classList.remove('active');
	crearCliente!.classList.remove('active');
	clientes!.classList.add('active');
});

crearCliente?.addEventListener('click', () => {

	const form = document.createElement('form');
	const divgroup = document.createElement('div');
	divgroup.className = 'input-group mb-3';
	const spanName = document.createElement('span');
	spanName.className = 'input-group-text';
	spanName.innerHTML = 'First name';
	const inputName = document.createElement('input');
	inputName.id = 'first_name';
	const btnenviar = document.createElement('button');
	btnenviar.innerHTML = 'Enviar Datos'
	inputName.className = 'form-control';
	divgroup.appendChild(spanName);
	divgroup.appendChild(inputName);
	form.appendChild(divgroup);
	form.appendChild(btnenviar);

	app!.innerHTML = '';
	app!.appendChild(form);

	btnenviar?.addEventListener('click', (e : Event) => {
		console.log("ALGO..");
		const first_name = document.querySelector<HTMLInputElement>('#first_name');
		console.log(first_name?.value);
		var data = new FormData();
		data.append('first_name', `${first_name?.value}` );
		// data.append('pwd', 'password');
		// data.append('organization', 'place');
		// data.append('requiredkey', 'key');
		console.log(data);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://127.0.0.1:5173/?#', true);
		xhr.onload = function () {
			// do something to response
			console.log(this.responseText);
		};
		xhr.send(data);
	});

	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	home!.classList.remove('active');
	clientes!.classList.remove('active');
	crearCliente!.classList.add('active');
});


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

