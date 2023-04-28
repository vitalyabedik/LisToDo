import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from '../App';
import {Button} from './Button/Button';
import {Input} from './Input';

type PropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    removeTodolist: (todolistID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, id: string) => void
    filterTasks: (todolistID: string, filter: FilterType) => void
    changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    filter: FilterType
}

export const Todolist = (props: PropsType) => {
    const [error, setError] = useState<string | null>(null)

    // вынести в инпут
    const [title, setTitle] = useState('')

    const onChangeInputHandler = (title: string) => {
        setTitle(title)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistID, title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(props.todolistID, id)
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
            <h3>{props.title}<Button name={'✖️'} callback={removeTodolistHandler}/></h3>
            <div>
                <Input
                    className={error ? 'error' : ''}
                    title={title}
                    callbackOnChange={(title) => onChangeInputHandler(title)}
                    callbackOnKeyDown={addTaskHandler}
                    setError={setError}
                />
                <Button name={'+'} callback={addTaskHandler}/>
            </div>
            {error && <div className={error ? 'errorMessage' : ''}>{error}</div>}
            <ul>
                {
                    props.tasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <input onChange={(e) => onChangeCheckboxHandler(task.id, e)}
                                       type="checkbox"
                                       checked={task.isDone}/>
                                <span>{task.title} </span>
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