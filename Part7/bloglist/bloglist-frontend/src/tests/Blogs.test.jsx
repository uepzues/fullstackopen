import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogs from '../components/Blogs'
import { test, expect, vi } from 'vitest'

const blog = {
  title: 'Testing title',
  author: 'Testing author',
  url: 'https://testing.com/',
  likes: 9,
  user: {
    name: 'Krimier',
    username: 'kims',
  },
}

test('blog is rendered', () => {
  render(<Blogs blogs={[blog]} />)

  //   screen.debug()

  const title = screen.getByText('Testing title')

  const author = screen.queryByText('Testing author')

  expect(title).toBeDefined()

  expect(author).toBeDefined()
})

test('details are not rendered', () => {
  const mockHandleLike = vi.fn()
  const mockHandleRemove = vi.fn()

  render(
    <Blogs
      blogs={[blog]}
      handleLike={mockHandleLike}
      handleRemove={mockHandleRemove}
    />
  )
  //   screen.debug()
  const element = screen.getByTestId('blogDetails')

  const urlDiv = screen.queryByText('Url: https://testing.com/')

  expect(element).toHaveStyle('display: none')

  expect(urlDiv).not.toBeVisible()
})

test('details button is clicked, details are shown', async () => {
  const mockHandleLike = vi.fn()
  const mockHandleRemove = vi.fn()

  render(
    <Blogs
      blogs={[blog]}
      handleLike={mockHandleLike}
      handleRemove={mockHandleRemove}
    />
  )

  const viewButton = screen.getByTestId('view-button')

  expect(viewButton).toHaveTextContent(/details/i)

  await userEvent.click(viewButton)

  expect(viewButton).toHaveTextContent(/hide/i)

  //   screen.debug()

  const urlDiv = screen.getByText('Url: https://testing.com/')

  const likesDiv = screen.queryByText('Likes: 9')

  expect(likesDiv).toBeVisible()

  expect(urlDiv).toBeVisible()

  await userEvent.click(viewButton)

  expect(viewButton).toHaveTextContent(/details/i)

  expect(urlDiv).not.toBeVisible()
})

test('like button is clicked twice', async () => {
  const mockHandleLike = vi.fn()
  const mockHandleRemove = vi.fn()

  render(
    <Blogs
      blogs={[blog]}
      handleLike={mockHandleLike}
      handleRemove={mockHandleRemove}
    />
  )

  const viewButton = screen.getByTestId('view-button')

  await userEvent.click(viewButton)

  const likeButton = screen.getByRole('button', { name: /like/i })

  await userEvent.click(likeButton)

  expect(mockHandleLike).toHaveBeenCalledTimes(1)

  await userEvent.click(likeButton)

  expect(mockHandleLike).toHaveBeenCalledTimes(2)
})
