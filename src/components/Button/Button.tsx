type PropsType = {
    className?: string
    name: string
    callback: () => void
}

export const Button: React.FC<PropsType> = (props) => {
    const onClickHandler = () => {
        props.callback()
    }

    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    )
}