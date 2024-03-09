import './App.css'
import { InputTask } from './components/input-task/InputTask'
import { TaskList } from './components/tasks/Tasks'
import { TodoBox } from './components/to-do-box/TodoBox'

function App() {

  return (
    <TodoBox>
      <InputTask></InputTask>
      <TaskList></TaskList>
    </TodoBox>
  )
}

export default App
