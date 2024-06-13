const { test, describe, expect, beforeEach } = require('@playwright/test')
describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await page.goto('http://localhost:5173')

        
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('log in to application')
        await expect(locator).toBeVisible()
        
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.fill('input[name="Username"]', 'test_user_2')
            await page.fill('input[name="Password"]', 'test_password')

            await page.getByRole('button', { name: 'login' }).click()

            const locator = await page.getByText('just_a_bot logged in')
            await expect(locator).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.fill('input[name="Username"]', 'wrong_test_user_2')
            await page.fill('input[name="Password"]', 'wrong_test_password')

            await page.getByRole('button', { name: 'login' }).click()

            const locator = await page.getByText('wrong username or password')
            await expect(locator).toBeVisible()
        })

    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.fill('input[name="Username"]', 'test_user_2')
            await page.fill('input[name="Password"]', 'test_password')

            await page.getByRole('button', { name: 'login' }).click()
        })


    

        test('A blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()

            await page.fill('input[name="Title"]', 'test_title')
            await page.fill('input[name="Author"]', 'test_author')
            await page.fill('input[name="Url"]', 'test_url')

            await page.getByRole('button', { name: 'save' }).click()

            const locator = await page.getByText('a new blog test_title by test_author added')
            await expect(locator).toBeVisible()
        })

        test('A blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()

            await page.fill('input[name="Title"]', 'test_title')
            await page.fill('input[name="Author"]', 'test_author')
            await page.fill('input[name="Url"]', 'test_url')

            await page.getByRole('button', { name: 'save' }).click()

            await page.reload();

            await page.getByRole('button', { name: 'view' }).last().click() // new blog will be at the end of the list
            await page.getByRole('button', { name: 'like', exact: true }).click()

            const locator = await page.getByText('test_url\n1')
            await expect(locator).toBeVisible()
        })

        test('A blog can be deleted', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).last().click() // new blog will be at the end of the list
            await page.getByRole('button', { name: 'remove', exact: true }).click()

            page.on('dialog', async dialog => {
                console.log(dialog.message());
                await dialog.accept(); // accepts the dialog
              });

            const locator = await page.getByText('test_title test_author')
            await expect(locator).not.toBeVisible()
        })

        test('Blogs can be sorted by likes', async ({ page }) => {
            await page.getByRole('button', { name: 'Sort by likes' }).click()
            
            const locator = await page.getByText('Check for blog 1 Random_1')
            const locator2 = await page.getByText('Hii, this is a new node. Just kidding =)) duck')

            await expect(locator).toBeVisible()
            await expect(locator2).toBeVisible()

        })

    })
   
})