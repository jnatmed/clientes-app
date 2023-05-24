document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hola mundo</h1>
`;

const app = document.querySelector<HTMLDivElement>('#app');
const home = document.querySelector<HTMLAnchorElement>('#home');
const contactanos = document.querySelector<HTMLAnchorElement>('#contactanos');
const ayuda = document.querySelector<HTMLAnchorElement>('#ayuda');

home?.addEventListener('click', () => {
	app!.innerHTML = `<h1> Hola desde Home </h1>`;
	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	contactanos!.classList.remove('active');
	ayuda!.classList.remove('active');
	home!.classList.add('active');
});

contactanos?.addEventListener('click', () => {
	app!.innerHTML = `<div class="input-group animate__fadeIn">
  <span class="input-group-text">First and last name</span>
  <input type="text" aria-label="First name" class="form-control">
  <input type="text" aria-label="Last name" class="form-control">
</div>`;

	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	// TODO: optimizar
	home!.classList.remove('active');
	ayuda!.classList.remove('active');
	contactanos!.classList.add('active');
});

ayuda?.addEventListener('click', () => {
	app!.classList.add('animate__animated');
	app!.classList.add('animate__bounce');
	app!.innerHTML = `<h1> Hola desde Ayuda</h1>`;
	// TODO: optimizar
	home!.classList.remove('active');
	contactanos!.classList.remove('active');
	ayuda!.classList.add('active');
});
