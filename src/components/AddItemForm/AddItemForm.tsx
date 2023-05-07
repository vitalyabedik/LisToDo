import React, {useState} from 'react';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';

type PropsType = {
    callback: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (title: string) => {
        setTitle(title)
    }

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.callback(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onKeyDownHandler = () => {
        addItemHandler()
    }

    return (
        <div>
            <div>
                <Input
                    className={error ? 'error' : ''}
                    title={title}
                    callbackOnChange={(title) => onChangeInputHandler(title)}
                    callbackOnKeyDown={onKeyDownHandler}
                    setError={setError}
                />
                <Button name={'+'} callback={addItemHandler}/>
            </div>
            {error && <div className={error ? 'errorMessage' : ''}>{error}</div>}
        </div>
    );
};

