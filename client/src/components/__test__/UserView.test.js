import { fireEvent, render } from '@testing-library/react'
import UserView from '../../view/UserView'

let getByTestId

beforeEach(() => {
    const component = render(<UserView/>)
    getByTestId = component.getByTestId
})

test('Change FirstName in input', () => {
    const input = getByTestId('inputFullName')
    fireEvent.change(input, {
        target: {
            value: 'FirstName'
        }
    })
    expect(input.placeholder).toBe('FirstName')
})

test('Change Lastname in input', () => {
    const input = getByTestId('inputLastName')
    fireEvent.change(input, {
        target: {
            value: 'LastName'
        }
    })
    expect(input.placeholder).toBe('LastName')
})

test('Change empty in input', () => {
    const input = getByTestId('inputEmpty')
    fireEvent.change(input, {
        target: {
            value: ''
        }
    })
    expect(input.placeholder).toBe('')
})

test('Change emptyTwo in input', () => {
    const input = getByTestId('inputEmptyTwo')
    fireEvent.change(input, {
        target: {
            value: ''
        }
    })
    expect(input.placeholder).toBe('')
})

test('Testing text in H2', () => {
    expect(getByTestId('textH2').textContent).toBe('Welcome.. ')
})