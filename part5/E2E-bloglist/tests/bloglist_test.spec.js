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
          .click()

        await page.getByRole('button', { name: 'Like' }).click()

        await page.waitForTimeout(2000)

        const likes = await page.getByText('Likes')

        await expect(likes).toContainText('1')
      })
    })
  })
})
