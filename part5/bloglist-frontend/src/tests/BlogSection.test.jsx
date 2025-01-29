import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogSection from '../components/BlogSection'
import { expect } from 'vitest'

test('the form call the event handler with correct details', async () => {
  const handleCreate = vi.fn()

  const user = {
    name: 'Krimier',
    username: 'kims',
  }

  render(<BlogSection handleCreate={handleCreate} user={user} />)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('URL')
  const createButton = screen.getByRole('button', { name: /create/i })

  await userEvent.type(title, 'Testing title')
  await userEvent.type(author, 'Testing author')
  await userEvent.type(url, 'https://testing.com/')

  await userEvent.click(createButton)

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate).toHaveBeenCalledWith({
    title: 'Testing title',
    author: 'Testing author',
    url: 'https://testing.com/',
    likes: 0,
  })
})
