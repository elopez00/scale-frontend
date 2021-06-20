import React from 'react'

/**
 * This function gets all the children from the component's properties
 * to sort and index them into an object that can later be easily processed
 * and rendered. 
 * 
 * @param {Array} children children prop of component
 * @param {Array} components components to look for
 * @returns {Object} object whose props are the found subcomponents and other
 */
export default function findAll(children, components) {
    let index = 0;
    const types = {
        other: []
    };

    // populate types map
    components.forEach(component =>
        types[component.displayName || component.name] = []
    )

    // loop through all the react children
    React.Children.forEach(children, child => {
        const childType = child?.type?.displayName || child?.type?.name;
        if (types[childType]) {
            types[childType].push({ child, index });
        } else {
            types.other.push({ child, index });
        }

        index++
    }) 

    return types;
}