import { test, expect } from '@playwright/test'

test.describe('Bloglist app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3004/api/testing/reset')
    await request.post('http://localhost:3004/api/users', {
      data: {
        name: 'Krimier',
        username: 'kims',
        password: 'password',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Log in to application' })
    await expect(heading).toBeVisible()
  })

  test('login form can be shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    const inputUser = page.getByText('username:')
    const inputPass = page.getByText('password:')
    await expect(inputUser).toBeVisible()
    await expect(inputPass).toBeVisible()
  })

  test.describe('Login', () => {
    test('user can log in with valid credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('textbox', { name: 'username:' }).fill('kims')
      await page.getByRole('textbox', { name: 'password:' }).fill('password')
      await page.getByRole('button', { name: 'Login' }).click()
      const heading = await page.getByText('logged in')
      await expect(heading).toBeVisible()
    })

    test('log in fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page
        .getByRole('textbox', { name: 'username:' })
        .fill('wrongUsername')
      await page
        .getByRole('textbox', { name: 'password:' })
        .fill('wrongPassword')
      await page.getByRole('button', { name: 'Login' }).click()
      const heading = page.getByText('logged in')
      await expect(heading).not.toBeVisible()
    })

    test.describe('when logged in', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByRole('textbox', { name: 'username:' }).fill('kims')
        await page.getByRole('textbox', { name: 'password:' }).fill('password')
        await page.getByRole('button', { name: 'Login' }).click()
      })

      test('a blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByRole('textbox', { name: 'title' }).fill('Test blog')
        await page.getByRole('textbox', { name: 'author' }).fill('Krimier')
        await page.getByRole('textbox', { name: 'url' }).fill('http://test.com')
        await page.getByRole('button', { name: 'Create' }).click()
        const blog = page.getByText('Test blog by Krimier')
        await expect(blog).toBeVisible()
      })

      test('the blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByRole('textbox', { name: 'title' }).fill('Test blog')
        await page.getByRole('textbox', { name: 'author' }).fill('Krimier')
        await page.getByRole('textbox', { name: 'url' }).fill('http://test.com')
        await page.getByRole('button', { name: 'Create' }).click()
        await page
          .getByText('Test blog by Krimier')
          .getByRole('button', { name: 'Details' })
          .first()
          .click()
        await page.getByRole('button', { name: 'Like' }).click()
        await page.waitForTimeout(2000)
        const likes = await page.getByText('Likes').all()
        await expect(likes[0]).toContainText('1')
      })

      test('a blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByRole('textbox', { name: 'title' }).fill('Test blog')
        await page.getByRole('textbox', { name: 'author' }).fill('Krimier')
        await page.getByRole('textbox', { name: 'url' }).fill('http://test.com')
        await page.getByRole('button', { name: 'Create' }).click()
        await page.waitForTimeout(2000)
        await page.getByRole('button', { name: 'Details' }).click()
        const cookies = await page.context().cookies()
        console.log(cookies)
        page.on('dialog', async (dialog) => {
          console.log(`Dialog message: ${dialog.message()}`)
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'Remove' }).click()
        const blog = page.getByText('Test blog by Krimier')
        await expect(blog).not.toBeVisible()
      })

      test('blogs are ordered by likes', async ({ page }) => {
        const blogs = [
          {
            title: 'Test blog 1',
            author: 'Krimier',
            url: 'http://test.com',
            likes: 3,
          },
          {
            title: 'Test blog 2',
            author: 'Krimier',
            url: 'http://test.com',
            likes: 5,
          },
        ]

        await page.getByRole('button', { name: 'New Blog' }).click()
        for (const blog of blogs) {
          await page.getByRole('textbox', { name: 'title' }).fill(blog.title)
          await page.getByRole('textbox', { name: 'author' }).fill(blog.author)
          await page.getByRole('textbox', { name: 'url' }).fill(blog.url)
          await page.getByRole('button', { name: 'Create' }).click()
        }
        await page.waitForSelector(`text=${blogs[0].title}`)
        await page.waitForSelector(`text=${blogs[1].title}`)
        const detailsButtons = await page
          .getByRole('button', { name: 'Details' })
          .all()
        for (let i = 0; i < detailsButtons.length; i++) {
          await detailsButtons[i].click()
          await page.waitForTimeout(500)
          const likeButton = page.getByRole(' button', { name: 'Like' })

          for (let j = 0; j < blogs[i].likes; j++) {
            await likeButton.click()
            await page.waitForTimeout(500)
          }
          await page.getByRole('button', { name: 'Hide' }).click()
        }

        const blogTitles = await page.locator('.blog-title').allTextContents()
        expect(blogTitles).toEqual([blogs[1].title, blogs[0].title])
      })

      test("remove button can't be seen by other users", async ({
        page,
        request,
      }) => {
        await request.post('http://localhost:3004/api/users', {
          data: {
            name: 'User2',
            username: 'user2',
            password: 'password',
          },
        })

        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByRole('textbox', { name: 'title' }).fill('Test blog')
        await page.getByRole('textbox', { name: 'author' }).fill('Krimier')
        await page.getByRole('textbox', { name: 'url' }).fill('http://test.com')
        await page.getByRole('button', { name: 'Create' }).click()
        await page.getByRole('button', { name: 'Logout' }).click()
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByRole('textbox', { name: 'username:' }).fill('user2')
        await page.getByRole('textbox', { name: 'password:' }).fill('password')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.getByRole('button', { name: 'Details' }).click()
        const removeButton = page.getByRole('button', { name: 'Remove' })
        await expect(removeButton).not.toBeVisible()
      })
    })
  })
})
