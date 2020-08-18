import React from 'react'
// import { render, fireEvent } from '../testUtils'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<Home />, {})

    waitFor(() => {
      window.alert = jest.fn()
      fireEvent.click(getByText('Test Button'))
      expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
    })
  })
})
