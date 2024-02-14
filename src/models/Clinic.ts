export type Patologia = {
  chave: string
  nomePatologia: string
  causador: string
  descricao: string
  diagnostico: string
  prevalencia: {
    animal: {
      cachorro: boolean
      gato: boolean
    }
    regiao: {
      norte: boolean
      nordeste: boolean
      centrooeste: boolean
      sudeste: boolean
      sul: boolean
    }
  }
  tratamento: string
  prevencao: string
  prognostico: string
  sintomas: string[]
}

export type Sintoma = {
  chave: string
  nomeSintoma: string
}
