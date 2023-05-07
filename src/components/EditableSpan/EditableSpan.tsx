import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<PropsType> = (props) => {
    const [editable, setEditable] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState(props.oldTitle)

    const activateEditMode = () => {
        setEditable(true)
    }

    const activateViewMode = () => {
        setEditable(false)
        props.onChange(updatedTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.currentTarget.value)
    }

    return (
        !editable
            ? <span onDoubleClick={activateEditMode} >{props.oldTitle} </span>
            : <input value={updatedTitle} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
    );
};
