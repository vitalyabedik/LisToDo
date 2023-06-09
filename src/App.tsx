import React, {useState} from 'react';
import {v1} from 'uuid';

import './App.css';

import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
type TasksType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const App: React.FC = () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    const addTodolist = (newTitle: string) => {
        let newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: newTitle,
            filter: 'all'
        }
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    const addTask = (todolistID: string, newTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
    }
    const filterTasks = (todolistID: string, filter: FilterType) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter} : t))
    }
    const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
    }
    const updateTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)})
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map(t => {
                    const filteredTasks = () => {
                        let tasksForTodolist = tasks[t.id]

                        switch (t.filter) {
                            case ('active'):
                                return tasksForTodolist.filter(el => !el.isDone);
                            case ('completed'):
                                return tasksForTodolist.filter(el => el.isDone);
                            default:
                                return tasksForTodolist
                        }
                    }
                    const filteredTasksForTodolist = filteredTasks()

                    return (
                        <Todolist
                            key={t.id}
                            todolistID={t.id}
                            title={t.title}
                            tasks={filteredTasksForTodolist}
                            removeTodolist={removeTodolist}
                            updateTodolistTitle={updateTodolistTitle}
                            addTask={addTask}
                            removeTask={removeTask}
                            filterTasks={filterTasks}
                            changeTaskStatus={changeTaskStatus}
                            updateTaskTitle={updateTaskTitle}
                            filter={t.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
