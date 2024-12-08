const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}> 
        <div> name: <input onChange={props.nameChange} /></div>
        <div> number: <input onChange={props.phoneChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
}

export default PersonForm