import Blogs from './Blogs'
import Togglable from './Togglable'
import BlogSection from './BlogSection'
const Home = () => {
  return (
    <div>
      <div>
        <Togglable
          buttonLabel1={'New Blog'}
          buttonLabel2={'Cancel'}>
          <BlogSection />
        </Togglable>
      </div>
      <Blogs />
    </div>
  )
}

export default Home
