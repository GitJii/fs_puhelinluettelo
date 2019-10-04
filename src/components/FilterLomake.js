import React from 'react'
import Person from './Person'

const FilterLomake = ({ selected,persons }) => {

    const showSelected = ''
        ? persons
        : persons.filter(person =>
            person.name.includes(selected)
        )

    const rivit = () =>
    showSelected.map(p =>
      <Person key={p.name} person={p} />
    )

    return rivit()
}

export default FilterLomake