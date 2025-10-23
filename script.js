function showResultWithDelay(html, delay = 2500) {
  const result = document.getElementById('resultado');
  result.style.opacity = 0;
  result.innerHTML = '<div class="loader"></div>';
  
  setTimeout(() => {
    result.innerHTML = html;
    result.style.opacity = 1;
  }, delay);
}

// Função para Teor Ideal
function calcularTeor() {
  const mg = parseFloat(document.getElementById('mg').value);
  const ca = parseFloat(document.getElementById('ca').value);

  if(isNaN(mg) || isNaN(ca)){
    showResultWithDelay('⚠️ Preencha todos os campos corretamente.');
    return;
  }

  let tipo = '', observacao = '';
  if(mg < 5 && ca < 20){
    tipo = 'Dolomítico';
    observacao = 'O solo apresenta baixos níveis de Mg e Ca. O Dolomítico aumenta ambos de forma equilibrada, essencial para a nutrição das plantas.';
  } else if(mg >= 5 && ca < 20){
    tipo = 'Calcítico';
    observacao = 'O solo tem Mg adequado mas baixo Ca. O Calcítico eleva o Ca sem aumentar muito o Mg.';
  } else if(mg < 5 && ca >= 20){
    tipo = 'Magnesiano';
    observacao = 'O solo possui Ca adequado, porém baixo Mg. O Magnesiano corrige essa deficiência sem alterar o Ca.';
  } else {
    tipo = 'Adequado';
    observacao = 'O solo já está equilibrado em Ca e Mg. Nenhuma aplicação adicional é necessária.';
  }

  const html = `
    <strong>Tipo de Calcário:</strong> ${tipo} <br>
    <strong>Observação:</strong> ${observacao} <br>
    <strong>Teor Atual:</strong> Ca ${ca}%, Mg ${mg}%
  `;

  showResultWithDelay(html);
}

// Função para Quantidade
function calcularQuantidade() {
  const tipo = document.getElementById('tipo').value;
  const area = parseFloat(document.getElementById('area').value);
  const unidadArea = document.getElementById('unidad-area').value;
  const recom = parseFloat(document.getElementById('recom').value);
  const unidadRecom = document.getElementById('unidad-recom').value;

  if(isNaN(area) || isNaN(recom)){
    showResultWithDelay('⚠️ Preencha todos os campos corretamente.');
    return;
  }

  let areaHa = (unidadArea === 'ha') ? area : area / 10000;
  let quantidadeTon = (unidadRecom === 'ton') ? recom : recom / 1000;
  const total = areaHa * quantidadeTon;

  let explicacao = '';
  if(tipo === 'Dolomitico'){
    explicacao = 'O Dolomítico corrige a deficiência de Mg e Ca no solo de maneira equilibrada, garantindo nutrição completa.';
  } else if(tipo === 'Calcitico'){
    explicacao = 'O Calcítico é indicado para aumentar o Ca mantendo o Mg estável.';
  } else {
    explicacao = 'O Óxido é usado em casos de necessidade rápida de correção do pH.';
  }

  const html = `
    <strong>Tipo de Calcário:</strong> ${tipo} <br>
    <strong>Área:</strong> ${area} ${unidadArea} <br>
    <strong>Quantidade recomendada:</strong> ${recom} ${unidadRecom} por unidade de área <br>
    <strong>Total a aplicar:</strong> ${total.toFixed(2)} toneladas<br>
    <strong>Explicação:</strong> ${explicacao}
  `;

  showResultWithDelay(html);
}

// FAQ
const faqData = {
  1: "O Dolomítico é excelente para solos com baixo Mg e Ca.",
  2: "O Calcítico aumenta principalmente o Ca sem afetar Mg.",
  3: "O Magnesiano corrige deficiências de Mg mantendo Ca.",
  4: "A análise de solo permite conhecer os níveis de nutrientes.",
  5: "A saturação por bases indica a quantidade de cátions essenciais.",
  6: "O pH do solo influencia na disponibilidade de nutrientes.",
  7: "A aplicação de calcário melhora o crescimento das plantas.",
  8: "O manejo correto do solo aumenta produtividade.",
  9: "A escolha do tipo de calcário depende da análise química.",
  10: "Agricultura de precisão otimiza recursos e resultados."
};

function gerarFAQ() {
  const select = document.getElementById('faq-select');
  const pergunta = select.value;
  const resposta = faqData[pergunta];
  showResultWithDelay(`<strong>Pergunta:</strong> ${pergunta}<br><strong>Resposta:</strong> ${resposta}`);
}
