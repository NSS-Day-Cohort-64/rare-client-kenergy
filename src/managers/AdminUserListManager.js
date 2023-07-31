import React, { useState, useEffect } from "react";
import { getAllUsers } from "../APIManager.js";
import "./AdminUserListManager.css";
import { Link } from "react-router-dom";

export const UserListManager = () => {
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        bio: "",
        username: "",
        password: "",
        profile_image_url: "",
        created_on: "",
        active: "",
        is_admin: ""
    });

    const fetchData = async () => {
        const importUsers = await getAllUsers();
        setUsers(importUsers);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const sortedUsers = users.sort((a, b) => a.username.localeCompare(b.username));

    const handleToggleActive = async (id, active, first_name, last_name, email, bio, username, password, profile_image_url, created_on, is_admin) => {
        try {
            const response = await fetch(`http://localhost:8088/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    bio: bio,
                    username: username,
                    password: password,
                    profile_image_url: profile_image_url,
                    created_on: created_on,
                    active: !active,
                    is_admin: is_admin
                }),
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error("Failed to update user's active status:", response);
            }
        } catch (error) {
            console.error("Error updating user's active status:", error);
        }
    };

    const handleToggleAdmin = async (id, active, first_name, last_name, email, bio, username, password, profile_image_url, created_on, is_admin) => {
        try {
            const response = await fetch(`http://localhost:8088/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    bio: bio,
                    username: username,
                    password: password,
                    profile_image_url: profile_image_url,
                    created_on: created_on,
                    active: active,
                    is_admin: !is_admin
                }),
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error("Failed to update user's active status:", response);
            }
        } catch (error) {
            console.error("Error updating user's active status:", error);
        }
    };

    return (
        <div className="user-list-container">
            <h2 className="title">User List</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <div className="user-container">
                            <div className="user-info">
                                <p>
                                    {user.username}: <Link to={`/Profile/${user.id}`}>{user.first_name} {user.last_name}</Link> {user.email}
                                </p>
                                </div>
                                <p>Active:</p>
                                <input
                                    type="checkbox"
                                    checked={user.active}
                                    onChange={() =>
                                        handleToggleActive(
                                            user.id,
                                            user.active,
                                            user.first_name,
                                            user.last_name,
                                            user.email,
                                            user.bio,
                                            user.username,
                                            user.password,
                                            user.profile_image_url,
                                            user.created_on,
                                            user.is_admin
                                        )
                                    }
                                />

                            <div className="admin-buttons">
                                <label>
                                    <input
                                        type="radio"
                                        name={`role_${user.id}`}
                                        value="user"
                                        checked={!user.is_admin}
                                        onChange={() =>
                                            handleToggleAdmin(
                                                user.id,
                                                user.active,
                                                user.first_name,
                                                user.last_name,
                                                user.email,
                                                user.bio,
                                                user.username,
                                                user.password,
                                                user.profile_image_url,
                                                user.created_on,
                                                user.is_admin
                                            )
                                        }
                                    />
                                    Author
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name={`role_${user.id}`}
                                        value="admin"
                                        checked={user.is_admin}
                                        onChange={() =>
                                            handleToggleAdmin(
                                                user.id,
                                                user.active,
                                                user.first_name,
                                                user.last_name,
                                                user.email,
                                                user.bio,
                                                user.username,
                                                user.password,
                                                user.profile_image_url,
                                                user.created_on,
                                                user.is_admin
                                            )
                                        }
                                    />
                                    Admin
                                </label>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}