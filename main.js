const grafico = document.querySelector("#adicionarTransicao");
		grafico.addEventListener('click', graficoDeGastos);
		
		const criarCategoria = document.querySelector("#criarCategoria");
		criarCategoria.addEventListener('click', addCategoria);
		
		function addCategoria() {
			if (document.querySelector(".box-add-cate")) return;
			let form = document.querySelector(".formulario");
			
			
			let boxAddCateg =  document.createElement("div");
			boxAddCateg.classList.add("box-add-cate");
			boxAddCateg.innerHTML = ` 		
				<div class="box-categoria">
					Criar categoria
					<input type="text" id="novaCategoria">
					<button id="salvarCategoria">Salvar</button>
					<button id="fecharCategoria">Fechar</button>
				</div>`;
			form.appendChild(boxAddCateg);
			
			document.querySelector("#fecharCategoria").addEventListener('click', () => { 
			document.querySelector(".box-add-cate").remove();
			});
			
		}
	
		
	
		function graficoDeGastos() {
			const ctx = document.getElementById('graficoDeGastos');
			
			new Chart(ctx, {
				type: 'pie',
				data: {
				  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				  datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					borderWidth: 1
				  }]
				},
				options: {
				  scales: {
					y: {
					  beginAtZero: true
					}
				  }
				}
  });
			
			
			}
