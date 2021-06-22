import React from 'react'

export const findByType = (children, component) => {
    const result = [];
    const type = [component.displayName] || [component.name];

    React.Children.forEach(children, child => {
        const childType = child?.type?.displayName || child?.type?.name;
        if (type.includes(childType)) result.push(child);
    })

    return result;
}