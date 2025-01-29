import { render, screen } from '@testing-library/react'
import Note from '../components/Note'
import userEvent from '@testing-library/user-event'
import { test } from 'vitest'

test('Note component', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />)

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  screen.debug(element)
  //   expect(element).toBeDefined()
})

test('Clicking the button calls event handler', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')

  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  note.important = false

  render(<Note note={note} toggleImportance={mockHandler} />)

  const button2 = screen.getByText('make important')

//   screen.debug(button2)
  await user.click(button2)

  console.log("mock length", mockHandler.mock.results)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
