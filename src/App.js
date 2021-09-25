import Header from "./components/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Tasks from "./components/Tasks";
import {useState, useEffect} from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

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
        <Router>
            <div className="container">
                <Header title="Task Tracker" onAdd={toggleAddForm} showAddTask={showAddTask}/>
                <Route path={'/about' } component={About} />
                <Route path={'/'} exact render={(props) => (
                        <>
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ?
                            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks yet..."}
                        </>
                    )}
                />
                <Footer/>
            </div>
        </Router>

    );
}

export default App;
