import { Route, Routes } from "react-router-dom"
import { UserHome } from "../../components/home/UserHome"
import { UserPostsList } from "../../components/posts/UserPosts/UserAllPosts"
import { UserSelectedPostDetails } from "../../components/posts/UserPosts/UserPostDetails"
import { CategoryList } from "../../managers/CategoryManager"
import { TagManagerAndCreator } from "../../UserTags/TagManager.js"
import { UserMyPosts } from "../../components/posts/UserPosts/UserMyPosts"
import { CreateNewUserPost } from "../../components/posts/UserPosts/UserNewPosts"
import { EditUserPost } from "../../components/posts/UserPosts/UserEditPost"
import { Profile } from "../../profile/Profile"


export const UserViews = () => {
    return (
        <Routes>
            <Route path="/posts/UserPosts/UserAllPosts" element={< UserPostsList />} />
            <Route path="/categoryManager" element={<CategoryList />} />
            <Route path="/tagManager" element={<TagManagerAndCreator />} />
            <Route path="/posts/UserPosts/UserAllPosts/UserPostDetails/:postId" element={<UserSelectedPostDetails />} />
            <Route path="/posts/UserPosts/UserMyPosts" element={<UserMyPosts />} />
            <Route path="/posts/UserPosts/NewUserPost" element={<CreateNewUserPost />} />
            <Route path="/posts/UserPosts/UserEditPost/:postId" element={<EditUserPost />} />
            <Route path="/Profile/:userId" element={<Profile />} />
    </Routes>
);
};

/*
    <Route path="INSERT PROFILE PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT ALL POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT MY POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    
*/
