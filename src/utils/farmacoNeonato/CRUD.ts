import { getDatabase } from 'firebase/database'
import { emptyFarmaco, Farmaco } from '../../models/Neonato/Farmaco'
import * as db from '../../services/firebase'

//Create
export function CreatePreg(newFarmaco: string, tipo: string, classe: string) {
  const oldData = updateBeforeCreatePreg(tipo, classe)
  const updatedData = [...oldData, newFarmaco]
  db.set(
    db.ref(db.database, `neonato/farmacos/preg/${tipo}/${classe}`),
    updatedData
  )
}

function updateBeforeCreatePreg(tipo: string, classe: string) {
  const oldData: string[] = []
  const refFarmacos = db.ref(
    db.database,
    `neonato/farmacos/preg/${tipo}/${classe}`
  )
  db.onValue(refFarmacos, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      oldData.push(childSnapshot.val())
    })
  })
  return oldData
}
export function CreateNeo(newFarmaco: string, tipo: string, classe: string) {
  const oldData = updateBeforeCreateNeo(tipo, classe)
  const updatedData = [...oldData, newFarmaco]
  db.set(
    db.ref(db.database, `neonato/farmacos/neo/${tipo}/${classe}`),
    updatedData
  )
}

function updateBeforeCreateNeo(tipo: string, classe: string) {
  const oldData: string[] = []
  const refFarmacos = db.ref(
    db.database,
    `neonato/farmacos/neo/${tipo}/${classe}`
  )
  db.onValue(refFarmacos, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      oldData.push(childSnapshot.val())
    })
  })
  return oldData
}
interface FarmacoData {
  [key: string]: {
    [key: string]: string[]
  }
}
//Read
export function ReadPreg(
  callback: (data: FarmacoData) => void,
  errorCallback: (error: any) => void
) {
  const dba = getDatabase()
  const refFarmacos = db.ref(dba, 'neonato/farmacos/preg')
  const farmacos: FarmacoData = {}

  db.onValue(
    refFarmacos,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const tipo = childSnapshot.key
        const data = childSnapshot.val()
        farmacos[tipo] = data
      })
      callback(farmacos)
    },
    (error) => {
      errorCallback(error)
    }
  )
}

export function ReadNeo(
  callback: (data: FarmacoData) => void,
  errorCallback: (error: any) => void
) {
  const dba = getDatabase()
  const refFarmacos = db.ref(dba, 'neonato/farmacos/neo')
  const farmacos: FarmacoData = {}

  db.onValue(
    refFarmacos,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const tipo = childSnapshot.key
        const data = childSnapshot.val()
        farmacos[tipo] = data
      })
      callback(farmacos)
    },
    (error) => {
      errorCallback(error)
    }
  )
}
//Update
export function UpdatePreg() {
  //
}
export function UpdateNeo() {
  //
}
//Delete
export function DeletePreg(num: string, tipo: string, classe: string) {
  db.remove(
    db.ref(db.database, `neonato/farmacos/preg/${tipo}/${classe}/${num}`)
  )
}
export function DeleteNeo(num: string, tipo: string, classe: string) {
  db.remove(
    db.ref(db.database, `neonato/farmacos/neo/${tipo}/${classe}/${num}`)
  )
}
