const Persons = ({ persons, deletePerson}) => {
    return (
        <div>
            {persons.map(person => 
            <div key={person.name}>
                {person.name} {person.number}
                <button onClick={() => {
                    confirm(`Delete ${person.name} ?`) 
                        ? deletePerson(person.id)
                        : console.log('cancelled deletion')
                    
                    }}>delete</button>
            </div>
            
            )}
      </div>
    )
}

export default Persons