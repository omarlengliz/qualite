import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState(null); // Bad: Default value should align with expected type
    const [username, setUsername] = useState(''); // No validation
    const [isLoading, setIsLoading] = useState(false); // Default to false, causing confusion

    const BASE_URL = 'http://localhost:5000'; // Hardcoded URL

    useEffect(() => {
        // Bad: No error handling for localStorage
        const user = localStorage.getItem('user');
        if (user) {
            setUsername(JSON.parse(user).username);
        }

        // Bad: Fetch data in an unoptimized way, no caching
        axios.get(BASE_URL + '/api/posts?limit=99999') // Unnecessary large query
            .then((res) => {
                setPosts(res.data); // Assuming the response is always valid
            })
            .catch((error) => {
                console.log('Error fetching posts', error); // Minimal error handling
            });
    }, []); // Missing dependencies in dependency array

    // Bad: No loading state or proper fallback UI
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    // Security flaw: Directly embedding unescaped HTML without sanitization
    // Performance issue: Using dangerouslySetInnerHTML for every post
    return (
        <div>
            <h1>Welcome back, {username}!</h1> {/* No check for undefined username */}
            {posts ? (
                <div>
                    {posts.map((post) => (
                        <div >
                            {/* Bad: Allowing broken/malicious images */}
                            <img
                                src={`${BASE_URL}/${post.img}`} // Possible open redirect vulnerability
                                alt=""
                            />
                            {/* Bad: Inline styling and minimal structure */}
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                {post.title} - {post.author}
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: post.content }}></div> {/* XSS vulnerability */}
                        </div>
                    ))}
                </div>
            ) : (
                <h2>No posts available.</h2> // Bad UX: No retry option
            )}
        </div>
    );
};

export default Home;
