import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from '../App';

import {Button} from './Button/Button';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan/EditableSpan';

type PropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    removeTodolist: (todolistID: string) => void
    updateTodolistTitle: (todolistID: string, newTitle: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, id: string) => void
    filterTasks: (todolistID: string, filter: FilterType) => void
    changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    updateTaskTitle: (todolistID: string, taskId: string,  newTitle: string) => void
    filter: FilterType
}

export const Todolist: React.FC<PropsType> = (props) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const updateTodolistTitleHandler = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistID, newTitle)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle)
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(props.todolistID, id)
    }
    const updateTaskHandler = (taskId: string, newTitle: string) => {
        props.updateTaskTitle(props.todolistID, taskId, newTitle)
    }
    const clickAllHandler = () => {
        props.filterTasks(props.todolistID, 'all')
    }
    const clickActiveHandler = () => {
        props.filterTasks(props.todolistID, 'active')
    }
    const clickCompletedHandler = () => {
        props.filterTasks(props.todolistID, 'completed')
    }
    const onChangeCheckboxHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID, id, e.currentTarget.checked)
    }


    return (
        <div>
            <EditableSpan oldTitle={props.title} onChange={updateTodolistTitleHandler}/>
            <Button name={'✖️'} callback={removeTodolistHandler}/>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {
                    props.tasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <input onChange={(e) => onChangeCheckboxHandler(task.id, e)}
                                       type="checkbox"
                                       checked={task.isDone}/>
                                <EditableSpan oldTitle={task.title} onChange={(newTitle) => updateTaskHandler(task.id, newTitle)}/>
                                <Button name={'✖️'} callback={() => removeTaskHandler(task.id)}/>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <Button className={props.filter === 'all' ? 'activeFilter' : ''} name={'All'} callback={clickAllHandler}/>
                <Button className={props.filter === 'active' ? 'activeFilter' : ''} name={'Active'} callback={clickActiveHandler}/>
                <Button className={props.filter === 'completed' ? 'activeFilter' : ''} name={'Completed'} callback={clickCompletedHandler}/>
            </div>
        </div>
    )
}