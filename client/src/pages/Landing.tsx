import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Landing = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/blogs')
    } else {
      navigate('/signin')
    }
  }, [navigate])

  return null
}
