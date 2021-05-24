import React from 'react'
import renderer from 'react-test-renderer'
import Loading from '../loading'

describe('<Loading />', () => {
    it('has 2 children', () => {
        const tree = renderer.create(<Loading />).toJSON()
        expect(tree.children.length).toBe(2)
    })
})