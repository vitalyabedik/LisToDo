import React, {useState} from 'react';

import './App.css';

import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'


function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    const addTask = (newTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const removeTask = (taskId: string) => {
        const newTasks = tasks.filter(el => el.id !== taskId)
        setTasks([...newTasks])
    }
    const filterTasks = (filter: FilterType) => {
        setFilter(filter)
    }
    const filteredTasks = () => {
        let filteredTasks = tasks

        switch (filter) {
            case ('active'):
                return filteredTasks = tasks.filter(el => !el.isDone);
            case ('completed'):
                return filteredTasks = tasks.filter(el => el.isDone);
            default:
                return tasks
        }
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const task = tasks.find(el => el.id === taskId)
        if (task) {
            task.isDone = taskStatus
            setTasks([...tasks])
        }
    }


    const filteredTasksData = filteredTasks()

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTasksData}
                addTask={addTask}
                removeTask={removeTask}
                filterTasks={filterTasks}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
