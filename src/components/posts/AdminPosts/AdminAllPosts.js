import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myPosts.css";

export const AdminPostsList = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const getPosts = () => {
        fetch(`http://localhost:8088/posts`)
            .then((response) => response.json())
            .then((postArray) => {
                postArray.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
                setPosts(postArray);
                setFilteredPosts(postArray);
            });
    };

    const getUsers = () => {
        fetch(`http://localhost:8088/users`)
            .then((response) => response.json())
            .then((userArray) => {
                setUsers(userArray);
            });
    };

    const getCategories = () => {
        fetch(`http://localhost:8088/categories`)
            .then((response) => response.json())
            .then((categoryArray) => {
                setCategories(categoryArray);
            });
    };

    useEffect(() => {
        getPosts();
        getUsers();
        getCategories();
    }, []);

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value, 10);
        setSelectedCategory(categoryId === 0 ? null : categoryId);
    };

    const handleUserChange = (event) => {
        const userId = parseInt(event.target.value, 10);
        setSelectedUser(userId === 0 ? null : userId);
    };

    useEffect(() => {
        let filteredPostsArray = [...posts];

        if (selectedCategory !== null) {
            filteredPostsArray = filteredPostsArray.filter(
                (post) => post.category_id === selectedCategory
            );
        }

        if (selectedUser !== null) {
            filteredPostsArray = filteredPostsArray.filter(
                (post) => post.user_id === selectedUser
            );
        }

        setFilteredPosts(filteredPostsArray);
    }, [selectedCategory, selectedUser, posts]);

    return (
        <div className="container">
            <h1 className="your-post-header">All Posts</h1>
            <div>
                <label htmlFor="categorySelect">Select Category:</label>
                <select
                    id="categorySelect"
                    onChange={handleCategoryChange}
                    value={selectedCategory || 0}
                >
                    <option value={0}>All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="userSelect">Select User:</label>
                <select
                    id="userSelect"
                    onChange={handleUserChange}
                    value={selectedUser || 0}
                >
                    <option value={0}>All Users</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            <ul className="post-list">
                {filteredPosts.map((post, index) => (
                    <li
                        key={post.id}
                        className={`post-card ${index === 0 ? "first-post" : ""}`}
                    >
                        <Link to={`AdminPostDetails/${post.id}`}>
                            <h3 className="post-title">{post.title}</h3>
                        </Link>
                        <p className="post-author">
                            <strong>Author:</strong> {post.user.first_name} {post.user.last_name}
                        </p>
                        <p className="post-category">
                            <strong>Category:</strong> {post.category.label}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};