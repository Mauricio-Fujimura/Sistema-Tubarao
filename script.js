import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const nomeinput = document.getElementById("nomeproduto");
const quantidadeinput = document.getElementById("quantidadeproduto");
const precoinput = document.getElementById("addprecoproduto");
const refinput = document.getElementById("addrefproduto");
const addestoque = document.getElementById("botaocriarproduto");
const secaovender = document.getElementById("botaovender");
const secaoestoque = document.getElementById("botaoestoque");
const secaohistorico = document.getElementById("botaohistorico");
const secaocaixa = document.getElementById("botaocaixa");
const editaprodutovenda = document.getElementById("editarprodutovenda");
const confirmaeditvenda = document.getElementById("confirmaredit");
const modalestoque = document.getElementById("botaoaddestoque");
const botaoencerrarvenda = document.getElementById("encerrarvenda");
const botaodinheiro = document.getElementById("pagamentodinheiro");
const botaocartao = document.getElementById("pagamentocartao");
const botaopix = document.getElementById("pagamentopix");
const botaoadicionarvenda = document.getElementById("adicionarvenda");

function mostrar(id) {
  document.querySelectorAll(".mostra").forEach((el) => {
    el.classList.remove("mostra");
    el.classList.add("secao");
  });
  let parte = document.getElementById(id);
  if (!parte) return;
  parte.classList.remove("secao");
  parte.classList.add("mostra");
}

function mostramodal(tipo) {
  document
    .querySelectorAll(".ativo")
    .forEach((el) => el.classList.remove("ativo"));
  let modal = document.getElementById(tipo);
  modal.classList.add("ativo");
}

function fecharmodal() {
  document.querySelectorAll(".ativo").forEach((el) => {
    el.classList.remove("ativo");
  });
}

async function referenciaexiste(refe) {
  const snapshot = await getDocs(collection(db, "produtos"));
  let existe = false;
  snapshot.forEach((doc) => {
    if (doc.data().ref === refe) {
      existe = true;
    }
  });
  return existe;
}

async function gerarreferencia() {
  let referenciaexiste;
  let existe = true;

  while (existe) {
    referencia = Math.floor(1000 + Math.random() * 9000);
    existe = await referenciaexiste(referencia);
  }
  return referencia;
}

async function criarproduto() {
  const nome = nomeinput.value;
  const quantidade = Number(quantidadeinput.value);
  const preco = Number(precoinput.value);
  const ref = Number(refinput.value);
  const existe = await referenciaexiste(ref);

  if (!nome || !quantidade || !preco) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  if (isNaN(quantidade) || isNaN(preco)) {
    alert("Quantidade e preço devem ser números!");
    return;
  }

  if (quantidade < 0 || preco < 0) {
    alert("Quantidade e preço devem ser positivos!");
    return;
  }

  if (!ref) {
    ref = await gerarreferencia();
  }

  if (existe) {
    alert("A referência já existe. Tente outra.");
    return;
  }

  await addDoc(collection(db, "produtos"), {
    nome: nome,
    quantidade: quantidade,
    preco: preco,
    ref: ref,
  });

  alert("Produto criado com sucesso!");
  nomeinput.value = "";
  quantidadeinput.value = "";
  precoinput.value = "";
  refinput.value = "";

  console.log("Produto criado:", { nome, quantidade, preco, ref });
}

secaovender.addEventListener("click", () => mostrar("vendas"));
editaprodutovenda.addEventListener("click", () => mostramodal("editvendas"));
botaoencerrarvenda.addEventListener("click", () =>
  mostramodal("modalencerravenda"),
);
botaodinheiro.addEventListener("click", () => mostramodal("encerradefinitiva"));
botaocartao.addEventListener("click", () => mostramodal("encerradefinitiva"));
botaopix.addEventListener("click", () => mostramodal("encerradefinitiva"));
addestoque.addEventListener("click", () => criarproduto());
confirmaeditvenda.addEventListener("click", () => fecharmodal());
secaoestoque.addEventListener("click", () => mostrar("estoque"));
modalestoque.addEventListener("click", () => mostramodal("adicionarproduto"));
secaohistorico.addEventListener("click", () => mostrar("historico"));
secaocaixa.addEventListener("click", () => mostrar("caixa"));
