import React, { useState, FormEvent, useEffect } from 'react'
import * as db from '../../../../services/firebase'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast
} from '@chakra-ui/react'
import { Categoria, Farmaco } from '../../../../models/Drug'

const RegisterDrugTab = () => {
  const emptyFarmacoData: Farmaco = {
    chave: '',
    nomeFarmaco: '',
    tipo: '',
    categoria: []
  }

  const toast = useToast()

  const [farmacoData, setFarmacoData] = useState<Farmaco>(emptyFarmacoData)
  const [categoria, setCategoria] = useState<Categoria[]>([])
  const [selectedCategoria, setSelectedCategoria] = useState<string[]>([''])

  useEffect(() => {
    const fetchCategoria = async () => {
      const refCategoria = db.ref(db.database, 'categoriaFarmaco')
      db.onValue(refCategoria, (snapshot) => {
        const data = snapshot.val()
        const resultadoCategoria = Object.entries<Categoria>(data ?? {}).map(
          ([chave, valor]) => {
            return {
              chave: chave,
              id: valor.id,
              nomeCategoria: valor.nomeCategoria
            }
          }
        )
        setCategoria(resultadoCategoria)
      })
    }

    fetchCategoria()
  }, [])

  const createFarmacoData = async (event: FormEvent) => {
    event.preventDefault()
    console.log(selectedCategoria)
    if (selectedCategoria.length === 0) {
      setSelectedCategoria([''])
    }
    console.log(selectedCategoria)
    const newData = { ...farmacoData, categoria: selectedCategoria }
    const newKey = db.push(db.child(db.ref(db.database), 'farmacos')).key
    newData.chave = newKey!
    db.set(db.ref(db.database, `farmacos/${newKey}`), newData)
    setFarmacoData(emptyFarmacoData)
    setSelectedCategoria([])
    toast({
      title: 'Farmaco criada com sucesso!',
      status: 'success',
      position: 'bottom',
      duration: 9000,
      isClosable: true
    })
  }

  const categoriasFromTipo = (tipo: string): string[] => {
    switch (tipo) {
      case 'aminoglicosideos':
        return [
          'penicilinas',
          'cefalosporinas',
          'quinolomas',
          'aminopenicilinas-potencializadas',
          'nitroimidazolicos',
          'tetraciclinas'
        ]
      case 'quinolomas':
        return [
          'aminoglicosideos',
          'penicilinas',
          'cefalosporinas',
          'aminopenicilinas-potencializadas',
          'nitroimidazolicos',
          'lincosamidas'
        ]
      case 'penicilinas':
        return [
          'aminoglicosideos',
          'quinolomas',
          'cefalosporinas',
          'nitroimidazolicos'
        ]
      case 'cefalosporinas':
        return [
          'aminoglicosideos',
          'quinolomas',
          'penicilinas',
          'nitroimidazolicos'
        ]
      case 'nitroimidazolicos':
        return [
          'aminoglicosideos',
          'quinolomas',
          'cefalosporinas',
          'penicilinas'
        ]
      case 'trimetoprim':
        return ['sulfonamidas']
      case 'aminopenicilinas-potencializadas':
        return ['aminoglicosideos', 'quinolomas']
      case 'tetraciclinas':
        return ['aminoglicosideos']
      case 'sulfonamidas':
        return ['trimetoprim']
      case 'macrolideos':
        return ['macrolideos']
      case 'lincosamidas':
        return ['quinolomas']
      default:
        return []
    }
  }

  const categoriasStringToKey = (tipos: string[]): string[] => {
    const categoriasKeys: string[] = []

    tipos.forEach((tipo) => {
      categoria.forEach((categoria) => {
        if (categoria.id === tipo) {
          categoriasKeys.push(categoria.chave)
        }
      })
    })

    return categoriasKeys
  }

  const handleTipoChange = (tipo: string) => {
    const categoriasChaves = categoriasStringToKey(categoriasFromTipo(tipo))
    setSelectedCategoria(categoriasChaves)
  }

  useEffect(() => {
    handleTipoChange(farmacoData.tipo)
  }, [farmacoData.tipo])

  return (
    <>
      <form onSubmit={createFarmacoData}>
        <FormControl>
          <FormLabel>Nome do Farmaco</FormLabel>
          <Input
            value={farmacoData.nomeFarmaco}
            onChange={(e) =>
              setFarmacoData({
                ...farmacoData,
                nomeFarmaco: e.target.value
              })
            }
            type="text"
          />
          <FormLabel>Tipo do Farmaco</FormLabel>
          <Select
            value={farmacoData.tipo}
            onChange={(e) =>
              setFarmacoData({
                ...farmacoData,
                tipo: e.target.value
              })
            }
          >
            {categoria.map((c) => (
              <option key={c.chave} value={c.id}>
                {c.nomeCategoria}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button marginTop={'1rem'} type="submit">
          Criar Farmaco
        </Button>
      </form>
    </>
  )
}

export default RegisterDrugTab
