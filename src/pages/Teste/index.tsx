import * as db from '../../services/firebase'

const Teste = () => {
  let Key: string | null = '123'
  function criarData() {
    const newKey = db.push(db.child(db.ref(db.database), 'users')).key
    Key = newKey
    db.set(db.ref(db.database, `users/${newKey}`), {
      username: 'teste'
    })
  }

  function deletarData() {
    db.remove(db.ref(db.database, `users/${Key}`))
  }

  function editarData() {
    db.update(db.ref(db.database, `users/${Key}`), { username: 'atualizado' })
  }

  return (
    <>
      {/* <h1 onClick={criarData}>clique em mim pra criar</h1>
      <h1 onClick={deletarData}>clique em mim pra deletar</h1>
      <h1 onClick={editarData}>clique em mim pra remover</h1> */}
    </>
  )
}

export default Teste
