import { render, screen } from '@testing-library/react'
import NoteForm from '../components/NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  const container = render(<NoteForm createNote={createNote} />).container

  //   const inputs = screen.getAllByRole('textbox')
  const input = screen.getByPlaceholderText('write note content here')
  //   const input = container.querySelector('#note-input')

  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)

  //   console.log(createNote.mock.calls[0][0])

  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
