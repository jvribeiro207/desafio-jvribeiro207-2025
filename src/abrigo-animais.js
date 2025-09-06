class AbrigoAnimais {

    constructor() {
    this.animais = {
      "Rex":    { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      "Mimi":   { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      "Fofo":   { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      "Zero":   { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      "Bola":   { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      "Bebe":   { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      "Loco":   { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    this.todosBrinquedos = new Set(//set para mapear todos brinquedos
      Object.values(this.animais).flatMap(a => a.brinquedos)
    );
  }

  validaBrinquedos(lista) {//valida lista de brinquedos
    return lista.every(b => this.todosBrinquedos.has(b));
  }

  satisfaz(pessoa, brinquedosAnimal) {//função auxiliar que checa se a pessoa satisfaz ordem dos brinquedos do animal
    let i = 0;
    for (let b of pessoa) {
      if (b === brinquedosAnimal[i]) {
        i++;
        if (i === brinquedosAnimal.length) return true;
      }
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let pessoa1 = brinquedosPessoa1.split(",").map(s => s.trim().toUpperCase());
    let pessoa2 = brinquedosPessoa2.split(",").map(s => s.trim().toUpperCase());
    let ordem = ordemAnimais.split(",").map(s => s.trim());

    if (!this.validaBrinquedos(pessoa1) || !this.validaBrinquedos(pessoa2)) {//valida brinquedos
      return { erro: "Brinquedo inválido" };
    }

    for (let nome of ordem) {//valida animais
      if (!(nome in this.animais)) {
        return { erro: "Animal inválido" };
      }
    }

    let adotados = {};
    let cont1 = 0, cont2 = 0;

    for (let nome of ordem) {
      let animal = this.animais[nome];
      let cond1 = this.satisfaz(pessoa1, animal.brinquedos);
      let cond2 = this.satisfaz(pessoa2, animal.brinquedos);

      if (nome === "Loco") {//implementa lógica do Loco
        if (Object.keys(adotados).length > 0) {
          if (cont1 < 3) { adotados[nome] = "pessoa 1"; cont1++; continue; }
          if (cont2 < 3) { adotados[nome] = "pessoa 2"; cont2++; continue; }
        }
        adotados[nome] = "abrigo";
        continue;
      }

      if (cond1 && cond2) {
        adotados[nome] = "abrigo";
      } else if (cond1 && cont1 < 3) {
        adotados[nome] = "pessoa 1"; cont1++;
      } else if (cond2 && cont2 < 3) {
        adotados[nome] = "pessoa 2"; cont2++;
      } else {
        adotados[nome] = "abrigo";
      }
    }

    let lista = Object.keys(this.animais)
      .filter(nome => ordem.includes(nome))
      .sort()
      .map(nome => `${nome} - ${adotados[nome] || "abrigo"}`);

    return { lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
