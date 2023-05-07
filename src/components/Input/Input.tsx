import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    className?: string
    title: string
    callbackOnChange: (title: string) => void
    callbackOnKeyDown: () => void
    // callbackOnBlur?: () => void
    setError: (error: string | null) => void
}

export const Input: React.FC<PropsType> = (props) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callbackOnChange(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null)
        if (e.key === 'Enter') {
            props.callbackOnKeyDown()
        }
    }
    //
    // const onBlurHandler = () => {
    //     props.callbackOnBlur()
    // }

    return (
        <input
            className={props.className}
            value={props.title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            // onBlur={onBlurHandler}
        />
    )
}