const Input = props => {

    return(
        <input type={props.type} value={props.value} onBlur={props.onBlur} className={props.className} onChange={props.onChange} placeholder={props.placeholder}/>
    )
}

export default Input