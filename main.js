document.addEventListener("DOMContentLoaded", function() { 
document.querySelector("#categoria").value = "selecionado"
});
function addCategoria(selectElement) {
	
	if (document.querySelector(".box-add-cate")) return;
		
	let form = document.querySelector(".formulario");
	const valorSelecionado = selectElement.value;
	
	if (valorSelecionado === 'criarCategoria') {
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
		selectElement.value = "selecionado";
		});
		
		let salvarCategoria = document.getElementById("salvarCategoria");
		salvarCategoria.addEventListener('click', newCategoria);
		
		}
		
}

function newCategoria() {
	let addSelect = document.getElementById("categoria");
	let novaCategoria = document.getElementById("nomeNovaCategoria").value;
	let novaOpcao = document.createElement("option");
	novaOpcao.value = novaCategoria;
	novaOpcao.textContent = novaCategoria;
	novaOpcao.selected = true;
	
	if (novaCategoria.trim() === "") return;
	
	addSelect.appendChild(novaOpcao);
	
	document.querySelector(".box-add-cate").remove();
		
	}

const dadosDoFormulario = document.querySelector("#adicionarTransicao");

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

const transacoes = [];

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
	if (descricao.trim().length <= 0) {
		alert("adicione uma descrição!")
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
		adicionarHistorico(novaTransacao);
		
		tipoSelecionado = null;
		
		document.getElementById("btnReceita").classList.remove("ativo-receita");
		document.getElementById("btnDespesa").classList.remove("ativo-despesa");
		
		
		document.querySelector(".formulario").reset();
	
	atualizarGrafico()	
	salvarStorage()
	
		
	}

function calcularGastosPorCategoria() {
	const categorias = [...new Set(transacoes.map(t => t.categoria))]
	
	const dadosReceita = categorias.map(cat => transacoes.filter(t => t.categoria === cat && t.tipo === "receita").reduce((soma, t) => soma + t.valor, 0));
	
	const dadosDespesa = categorias.map(cat => transacoes.filter(t => t.categoria === cat && t.tipo === "despesa").reduce((soma, t) => soma + t.valor, 0)
	);
	
	return {labels: categorias, dadosReceita, dadosDespesa};
	} 
	
let meuGrafico = null;

function atualizarGrafico() {
	const { labels, dadosReceita, dadosDespesa } = calcularGastosPorCategoria()
	
	if (meuGrafico) {
		meuGrafico.data.labels = labels;
		meuGrafico.data.datasets[0].data = dadosReceita;
		meuGrafico.data.datasets[1].data = dadosDespesa;
		meuGrafico.update();
	} else {
		const ctx = document.getElementById('graficoDeGastos');
		 meuGrafico = new Chart(ctx, {
			type: 'bar',
			data: {
			  labels,
			  datasets: [{
				label: 'Receita',
				data: dadosReceita,
				backgroundColor: 'rgba(75, 192, 100, 0.7)'
				
			  },
			  {
				 label: 'Despesa',
				 data: dadosDespesa,
				  backgroundColor: 'rgba(255, 99, 132, 0.7)'
				  }
			  ]
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
	
	}	

	
function atualizarCards() {
	let totalReceita = transacoes.filter(t => t.tipo === "receita").reduce((soma, t) => soma + t.valor, 0);
	
	let totalDespesa = transacoes.filter(t => t.tipo === "despesa").reduce((soma, t) => soma + t.valor, 0);
	
	let saldo = totalReceita - totalDespesa;
	
	document.querySelector(".valorReceita").textContent = 
	totalReceita.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
	//`R$ ${totalReceita.toFixed(2).replace("." , ",")}`;
	document.querySelector(".valorDespesa").textContent = `R$ ${totalDespesa.toFixed(2).replace("." , ",")}`;
	document.querySelector(".valorSaldo").textContent = `R$ ${saldo.toFixed(2).replace("." , ",")}`;
	
	
	}

const grafico = document.querySelector('#adicionarTransicao');
grafico.addEventListener('click', adicionarTransacao);

 
function adicionarHistorico(transacao) {
	let historicoTransacoes = document.querySelector("#historicoTransacoes");
	let dadosTransacao = document.createElement("div");
	dadosTransacao.classList.add("dadoDaTransacao");
	
	
	if (transacao.tipo == "receita") {
		dadosTransacao.style.backgroundColor = "#b6f2b6"
		}
	else {
		dadosTransacao.style.backgroundColor = "#f2b6b6";
		}	
	dadosTransacao.innerHTML = `
	<div class="registroHistorico">
		${transacao.categoria}<br>
		${transacao.descricao} <span>${transacao.valor}</span>
	</div>`;
	
	historicoTransacoes.appendChild(dadosTransacao);
	
	
	let apagar = document.createElement("button");
	apagar.innerHTML = ' X ';
	apagar.classList.add("apagarHistorico");
	
	dadosTransacao.appendChild(apagar);
	
	apagar.addEventListener('click', function(event) {
		let index = transacoes.indexOf(transacao);
//transacoes = TODAS, transacao = indice do ELEM.ESPECIFICO do item clicado		
		if (index !== -1) {
	//Se retorna algo
			transacoes.splice(index, 1);
			//item atual, remove 1
		}
		
		dadosTransacao.remove(); 
		atualizarCards(); // recalcula os totais
		atualizarGrafico();
		})
	salvarStorage();
	
	}
function salvarStorage() {
	const memoriaDasTransacoes = [];
	
	transacoes.forEach(function(conta) {
		memoriaDasTransacoes.push({descricao: conta.descricao, categoria: conta.categoria, valor: conta.valor, tipo: conta.tipo})	
		});
	
	localStorage.setItem("dadosDoHistorico", JSON.stringify(memoriaDasTransacoes));
	
	}
function carregarDoStorage() {
	try {
	const dadosCarregados = JSON.parse(localStorage.getItem("dadosDoHistorico")) || [];
	
	dadosCarregados.forEach(function(dado) {
		transacoes.push(dado);
		adicionarHistorico(dado)
		});
	} catch(e)	{
		alert("Erro ao carregar dados:", e)
		}
		
		atualizarCards();
		atualizarGrafico();
	}
carregarDoStorage()	
