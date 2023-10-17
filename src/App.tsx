
import { useState, useEffect } from "react"

export default function App(){

  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([])
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("cursoreact")
    if(tarefasSalvas){
      setTasks(JSON.parse(tarefasSalvas))
    }
  }, [])

  function handleRegister(){
    if(!input){
      alert("Informe a tarefa")
      return;
    }
    if(editTask.enabled){
      handleSaveEdit()
      return;
    }
    setTasks(tarefas => [...tarefas, input])
    localStorage.setItem("cursoreact", JSON.stringify([...tasks, input]))
    setInput("")
  }

  function handleSaveEdit(){
    const findIndex = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks]
    allTasks[findIndex] = input
    setTasks(allTasks)
    setInput("")
    setEditTask({
      enabled: false,
      task: ""
    })
    localStorage.setItem("cursoreact", JSON.stringify(allTasks))
  }

  function handleDeleteTask(item: string) {
    const removeTask = tasks.filter(task => task !== item)
    setTasks(removeTask)
    localStorage.setItem("cursoreact", JSON.stringify(removeTask))
  }

  function handleEdit(item: string) {
    setInput(item)
    setEditTask({
      enabled: true,
      task: item
    })
  }

  return(
    <div>
        <h1>Lista de tarefas</h1>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleRegister}>
          {editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}
        </button>
        <hr />

        {tasks.map((item, index) => (
          <section key={index}>
            <span>{item}</span>
            <button onClick={ () => handleDeleteTask(item)}>Excluir</button>
            <button onClick={() => handleEdit(item)}>Editar</button>
          </section>
        ))}
    </div>

    

  )
}