import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Togglable'
import { test } from 'vitest'

describe('<Togglable/>', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show">
        <div className="testDiv">Togglable content</div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('Togglable content')
  })

  test('at start the children are not displayed', async () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, the children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
