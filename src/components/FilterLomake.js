import React from 'react'
import Person from './Person'

const FilterLomake = ({ selected, persons, deletePerson }) => {

    const showSelected = (selected === '')
        ? persons
        : persons.filter(person =>
            person.name.includes(selected)
        )

    const rivit = () =>
        showSelected.map(p =>
            <div key={p.name}>
                <Person person={p} />
                <button onClick={() => deletePerson(p.id)}>Delete</button>
            </div>
        )
    return rivit()
}

export default FilterLomake