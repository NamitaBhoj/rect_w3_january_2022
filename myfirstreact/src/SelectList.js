import React from 'react'
import { provinces, countries } from './index.js'

class SelectList extends React.Component {
    render () {
        const provincesList = provinces.length > 0 &&
                provinces.map((name, i) => {
                    return (
                        <option key={i} value={name.id}>{name.name}</option>
                    )
                }, this)

        const countriesList = countries.length > 0 &&
                countries.map((name, i) => {
                    return (
                        <option key={i} value={name.id}>{name.name}</option>
                    )
                }, this)
        return (
            <div>
                <select>
                    {provincesList}
                </select>
                <select>
                    {countriesList}
                </select>
            </div>
        )
    }
}

export default SelectList
