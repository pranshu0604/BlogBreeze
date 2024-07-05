import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/Signup'
import { SignIn } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Landing } from './pages/Landing'
import { Publish } from './pages/Publish'
import NotFoundPage from './pages/NotFoundPage'
function App() {

  return (
    <div className='min-h-screen' 
    style={{ fontFamily: "'Chakra Petch', sans-serif", fontStyle: 'normal' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/publish' element={<Publish />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
