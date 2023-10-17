
import { useState, useEffect, useRef } from "react"

export default function App(){

  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

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

  useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("cursoreact", JSON.stringify(tasks))
  }, [tasks])

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
  }

  function handleDeleteTask(item: string) {
    const removeTask = tasks.filter(task => task !== item)
    setTasks(removeTask)
  }

  function handleEdit(item: string) {
    
    inputRef.current?.focus();
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
          onChange={(e) => setInput(e.target.value)} 
          ref={inputRef}
        />
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