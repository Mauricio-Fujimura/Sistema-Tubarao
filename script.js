function mostrar(id) {
  parte = document.getElementById(id);
  parte.classList.remove("secao");
  parte.classList.add("mostra");
}

function mostramodal(tipo) {
  modal = document.getElementById(tipo);
  modal.classList.add("ativo");
}
