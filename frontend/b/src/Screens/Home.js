import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = '/login';
            return;
        }

        const user = localStorage.getItem('user');
        if (user) {
            setUsername(JSON.parse(user).username);
        }

        axios.get(`${BASE_URL}/api/posts`)
            .then(response => {
                setPosts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [BASE_URL]);

    if (isLoading || username === '') {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className="flex justify-between items-center px-4 py-6">
                <h1 className="text-2xl font-bold">Blog</h1>
                <h1 className="text-2xl font-bold">Welcome, {username}</h1>
            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Our Articles</h1>
                    <a href="/add" className="bg-blue-500 text-white py-2 px-4 rounded">Add +</a>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="border p-4">
                            <img
                                src={`${BASE_URL}/${post.img}`}
                                className="w-full h-64 object-cover mb-4"
                                alt={post.title}
                            />
                            <h2 className="text-xl font-bold">
                                {post.title} By (<span className='text-lg text-gray-400'>{post.author}</span>)
                            </h2>
                            <div
                                dangerouslySetInnerHTML={{ __html: (post.content) }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
