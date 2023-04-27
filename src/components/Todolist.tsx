import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from '../App';
import {Button} from './Button/Button';
import {Input} from './Input';

type PropsType = {
    title: string
    tasks: TaskType[]
    addTask: (newTitle: string) => void
    removeTask: (id: string) => void
    filterTasks: (filter: FilterType) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterType
}

export const Todolist = (props: PropsType) => {
    const [error, setError] = useState<string | null>(null)

    // вынести в инпут
    const [title, setTitle] = useState('')

    const onChangeInputHandler = (title: string) => {
        setTitle(title)
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    const clickAllHandler = () => {
        props.filterTasks('all')
    }
    const clickActiveHandler = () => {
        props.filterTasks('active')
    }
    const clickCompletedHandler = () => {
        props.filterTasks('completed')
    }
    const onChangeCheckboxHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(id, e.currentTarget.checked)
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                            <div>
                                <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                    <input onChange={(e) => onChangeCheckboxHandler(task.id, e)} type="checkbox" checked={task.isDone}/>
                                    <span>{task.title} </span>
                                    <Button name={'✖️'} callback={() => removeTaskHandler(task.id)}/>
                                </li>
                            </div>

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