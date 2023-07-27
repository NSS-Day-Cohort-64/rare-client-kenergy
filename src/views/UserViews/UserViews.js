import { Route, Routes } from "react-router-dom";
import { UserHome } from "../../components/home/UserHome";
import { MyPosts } from "../../components/posts/UserPosts/UserMyPosts";
import { CategoryList } from "../../managers/CategoryManager";
import { TagManagerAndCreator } from "../../UserTags/TagManager.js";

export const UserViews = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />

      <Route path="/categoryManager" element={<CategoryList />} />

      <Route path="/tagManager" element={<TagManagerAndCreator />} />

      <Route path="/MyPosts" element={<MyPosts />} />
    </Routes>
  );
};

/*
    <Route path="INSERT PROFILE PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT ALL POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT MY POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    
*/
