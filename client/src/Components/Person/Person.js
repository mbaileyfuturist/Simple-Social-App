import classes from './Person.module.css'

const Person = props => {

    return(
        <div className={classes.personContainer}>
            <p>{props.firstName + ' ' + props.lastName}</p>
            <p>Age: {props.age}</p>
            <p>{props.address + ' ' + props.city + ' ' + props.state}</p>
        </div>
    )
}

export default Person