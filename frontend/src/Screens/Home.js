import React, { useEffect , useState } from 'react'
import axios from 'axios'
const Home = () => {
    const [posts, setPosts] = useState([])

    const [username, setUsername] = useState('')
    useEffect(() => {

        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if (!isLoggedIn) {
            window.location.href = '/login'
        }
        setUsername(JSON.parse (localStorage.getItem(("user"))).username ) 

        axios.get('http://localhost:5000/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error(error))

    }, [])
    
    if(username===''){
        return <h1>Loading...</h1>
    }
  return (
    
   <>
   <div className="flex justify-between items-center">
   <h1 className="text-2xl font-bold">Blog</h1>
   <h1 className="text-2xl font-bold">Welcome {username} </h1>
 </div>
    <div className='container mx-auto p-4 flex-col'>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Our Articles</h1>
            <a href="/add" className="bg-blue-200 text-white py-2 px-4 rounded">add +</a>
        </div>
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {posts.map(post => (
    <div key={post._id} className="border p-4 mb-4">
      <img src={`http://localhost:5000/${post.img}`} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-xl font-bold">{post.title}  By(<span className='text-lg text-gray-400'>{post.author}</span>) </h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          <p dangerouslySetInnerHTML={{ __html: post.content }} />

    </div>
  ))}
</div>
    </div>
    </>
  )
}

export default Home