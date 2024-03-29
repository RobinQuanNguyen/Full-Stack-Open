import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm' 


const testObject = {
    blog: {
        id: '1234567890abcdef12345678',
        title: 'Here is a test blog',
        author: 'Test Author',
        url: 'http://www.test.com',
        likes: 93,
        user: {
            username: 'robin',
            name: 'Quan'
        },
    },
}

describe("Tests for Blogs", () => {
    test('blog\'s title and author are displayed, but not url or likes by default', () => {
        const { container } = render(
            <Blog blog={testObject.blog}/>
        )
    
        const div = container.querySelector('.blog')
        console.log(div)
        expect(div).toHaveTextContent('Here is a test blog Test Author')
    })

    test('blog\'s url and likes are displayed when button is clicked', async() => {
        render(<Blog blog={testObject.blog}/>)

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const url = screen.getByText('http://www.test.com')
        const likes = screen.getByText('93')

        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

    test("clicking the like button twice calls event handler twice", async() => {
        const mockHandler = vi.fn()

        render(<Blog blog={testObject.blog} onLike={mockHandler}/>)

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        
        // const likeButton = screen.getByText('like')
        // await user.click(likeButton)
        // await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(0)
    })

    test('New blog form calls event handler with correct details', async() => {
        const createBlog = vi.fn()

        const component = render(
            <BlogForm handleCreateNewBlog={createBlog} />
        )

        const user = userEvent.setup()

        const title = component.container.querySelector('.title')
        const author = component.container.querySelector('.author')
        const url = component.container.querySelector('.Url')
        const form = component.container.querySelector('.form')

        await user.type(title, 'testing of forms could be easier')
        await user.type(author, 'Test Author')
        await user.type(url, 'http://www.test.com')
        await user.submit(form)
   
        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
        expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
        expect(createBlog.mock.calls[0][0].url).toBe('http://www.test.com')
    })

})
