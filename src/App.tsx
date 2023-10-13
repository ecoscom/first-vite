
import { useState } from "react"

export default function App(){
  
    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")

    interface InfoAlunoProps{
      nome: string;
      idade: number;
    }

    const [infoAluno, setInfoAluno] = useState<InfoAlunoProps>()

    const [contador, setContador] = useState(0)
  
  function mostrarAluno(){
    setInfoAluno({
      nome: nome,
      idade: parseInt(idade),
    })
  }

  function diminuir() {
    setContador(contador-1)
  }

  function aumentar() {
    setContador(contador+1)
  }


  
  return(
    <div>
        <h1>Usando useState</h1>

        <input type="text" placeholder="Digite o nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        <br /><br />
        <input type="text" value={idade} onChange={(e) => setIdade(e.target.value)} />
    
    <br /><br />
    <button onClick={mostrarAluno}>Mostrar aluno</button>

    <hr />

    <h3>Aluno: {infoAluno?.nome}</h3>
    <h2>Idade: {infoAluno?.idade}</h2>
    
    <br />
    <hr />
    <br />

    <button onClick={diminuir}>-</button>{contador}<button onClick={aumentar}>+</button>
    </div>

    

  )
}