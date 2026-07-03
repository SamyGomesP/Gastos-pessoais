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
			<input type="text" id="nomeNovaCategoria">
			<button type="button" id="salvarCategoria">Salvar</button>
			<button type="button" id="fecharCategoria">Fechar</button>
		</div>`;
	form.appendChild(boxAddCateg);
	
	document.querySelector("#fecharCategoria").addEventListener('click', () => { 
	document.querySelector(".box-add-cate").remove();
	});
	
	
	let salvarCategoria = document.getElementById("salvarCategoria");
	salvarCategoria.addEventListener('click', newCategoria);

function newCategoria() {
	let addSelect = document.getElementById("categoria");
	let novaCategoria = document.getElementById("nomeNovaCategoria").value;
	let novaOpcao = document.createElement("option");
	novaOpcao.value = novaCategoria;
	novaOpcao.textContent = novaCategoria;
	
	if (novaCategoria.trim() === "") return;
	
	addSelect.appendChild(novaOpcao);
	
	document.querySelector(".box-add-cate").remove();
	
	}
	
}

const dadosDoFormulario = document.querySelector("#adicionarTransicao");

//dadosDoFormulario.addEventListener('click', dadosParaAnalise);

let tipoSelecionado = null;


const btnReceita = document.getElementById("btnReceita");
const btnDespesa = document.getElementById("btnDespesa");

btnReceita.addEventListener('click', () => {
	tipoSelecionado = "receita";
	btnReceita.classList.add("ativo-receita");
	btnDespesa.classList.remove("ativo-despesa");
	});
	
btnDespesa.addEventListener('click', () => {
	tipoSelecionado = "despesa";
	btnDespesa.classList.add("ativo-despesa");
	btnReceita.classList.remove("ativo-receita");
	});

let transacoes = [];

function adicionarTransacao() {
	let descricao = document.getElementById("descricao").value;
	let valor = parseFloat(document.getElementById("valor").value);
	let categoria = document.querySelector("#categoria").value;
	
	if (!tipoSelecionado) {
		alert("Escolha se é Receita ou Despesa!")
		return;
		}
	if (isNaN(valor) || valor <= 0) {
		alert("Digite um número válido");
		return;
		}
	let novaTransacao = {
		descricao,
		valor,
		categoria,
		tipo: tipoSelecionado //receita ou despesa
		
		}
		transacoes.push(novaTransacao);
		atualizarCards();
		adicionarHistorico()
	}
	
function atualizarCards() {
	let totalReceita = transacoes.filter(t => t.tipo === "receita").reduce((soma, t) => soma + t.valor, 0);
	
	let totalDespesa = transacoes.filter(t => t.tipo === "despesa").reduce((soma, t) => soma + t.valor, 0);
	
	let saldo = totalReceita - totalDespesa;
	
	document.querySelector(".valorReceita").textContent = `R$ ${totalReceita.toFixed(2)}`;
	document.querySelector(".valorDespesa").textContent = `R$ ${totalDespesa.toFixed(2)}`;
	document.querySelector(".valorSaldo").textContent = `R$ ${saldo.toFixed(2)}`;
	}

const grafico = document.querySelector('#adicionarTransicao');
grafico.addEventListener('click', adicionarTransacao);

 
function adicionarHistorico() {
	let opcaoRadio = document.querySelector('input[name="tipoTransacao"]:checked');
	let descricaoDaTransacao = document.getElementById("descricao").value;
	let valorTransacao = parseFloat(document.getElementById("valor").value);
	let opcaoSelect = document.querySelector("#categoria");
	let historicoTransacoes = document.querySelector("#historicoTransacoes")

	let dadosTransacao = document.createElement("div");
	dadosTransacao.classList.add("dadoDaTransacao");
	dadosTransacao.innerHTML = `
	<div class="registroHistorico">
		${opcaoSelect.value}
		<button type="button" id="apagarHistorico">lixo</button><br> 
		${descricaoDaTransacao} <span>${valorTransacao}</span>
	</div>`;
	
	historicoTransacoes.appendChild(dadosTransacao);
	
	
	}
	
/*	

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
	
*/	
