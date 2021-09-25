import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState, useEffect} from "react";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

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

    const fetchSingleTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        return await res.json();
    }

    const addTask = async (task) => {
        const res = await fetch("http://localhost:5000/tasks/", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const data = await res.json();
        setTasks([...tasks, data])
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchSingleTask(id);
        const updTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder
        }
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json();

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }

    const toggleAddForm = () => {
        setShowAddTask(!showAddTask)
    }

    return (
        <div className="container">
            <Header title="Task Tracker" onAdd={toggleAddForm} showAddTask={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks yet..."}
        </div>
    );
}

export default App;
