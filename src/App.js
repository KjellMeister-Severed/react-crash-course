import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState, useEffect} from "react";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
    ])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks().then()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        return await res.json();
    }

    const addTask = (task) => {
        const id = tasks.length + 1;
        const newTask = {
            id, ...task
        }
        setTasks([...tasks, newTask])
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
    }

    const toggleAddForm = () => {
        setShowAddTask(!showAddTask)
    }

    return (
        <div  className="container">
            <Header title="Task Tracker" onAdd={toggleAddForm} showAddTask={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks yet..."}
        </div>
    );
}

export default App;
