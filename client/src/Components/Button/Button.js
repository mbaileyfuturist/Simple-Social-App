const Button = props => {

    return(
        <button type={props.type} onClick={props.onClick} className={props.className} disabled={props.disabled}>{props.value}</button>
    )
}

export default Button