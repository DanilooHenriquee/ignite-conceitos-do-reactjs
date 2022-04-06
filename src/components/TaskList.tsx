import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  console.log(tasks);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle != '') {
      const id: number = Math.floor(Math.random() * (1000 - 1) + 1);
      const data = [...tasks, {id: id, title: newTaskTitle, isComplete: false}];
      setTasks(data);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let trueOrFalse: boolean;

    const data = tasks.map( (arr) => {
      if(arr.id === id){
        return {id: arr.id, title: arr.title, isComplete: !arr.isComplete};
      } else {
        return arr;
      }
    });
    setTasks(data);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    console.log("id do botao excluir: " + id);

    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].id === id) {

        console.log(tasks);

        tasks.splice(i, 1);
        // console.log(newTask);
        console.log(tasks); 
        // setTasks(tasks);
      }
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}