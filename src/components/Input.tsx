import {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    className?: string
    title: string
    callbackOnChange: (title: string) => void
    callbackOnKeyDown: () => void
    setError: (error: string | null) => void
}

export const Input = (props: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callbackOnChange(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null)
        if (e.key === 'Enter') {
            props.callbackOnKeyDown()
        }
    }

    return (
        <input
            className={props.className}
            value={props.title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            type="text"
        />
    )
}