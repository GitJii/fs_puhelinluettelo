import React from 'react'

const Person = ({ person}) => {

    return (
        <table>
            <tbody>
                <tr>
                    <td className='person'>
                        {person.name} {person.number}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Person