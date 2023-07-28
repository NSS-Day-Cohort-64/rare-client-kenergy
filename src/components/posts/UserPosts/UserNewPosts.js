import { useEffect, useState } from "react"
import { createNewPost, getAllTags, getTheCategories } from "../../../APIManager"
import { useNavigate } from "react-router-dom"

export const CreateNewUserPost = () => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const userId = localStorage.getItem("auth_token")

    const [post, update] = useState({
        user_id: parseInt(userId),
        category_id: 0,
        title: "",
        publication_date: 0,
        image_url: "",
        content: "",
        approved: 1
    })

    const [allTags, setTags] = useState([])
    const [checkedPostTags, updateCheckedPostTags] = useState([])

    const [allCategories, setCategories] = useState([])

    useEffect(
        () => {
            getTheCategories()
                .then((categories) => {
                    setCategories(categories)
                })

            getAllTags()
                .then((tags) => {
                    setTags(tags)
                })

            getCurrentDate()
        },
        []
    )

    const selectPostTags = (event) => {
        const tagId = parseInt(event.target.value);
        const isChecked = event.target.checked;

        if (isChecked) {
            const selectedTag = allTags.find((tag) => tag.id === tagId);
            checkedPostTags.push(selectedTag);
        } else {
            // Remove the unselected tag object from the checkedPostTags array
            updateCheckedPostTags((prevCheckedTags) => prevCheckedTags.filter((tag) => tag.id !== tagId));
        }
    };


    const getCurrentDate = () => {
        const currentDate = new Date()
        const formattedDate = currentDate.toDateString().substring(4)
        const copy = { ...post }
        copy.publication_date = formattedDate
        update(copy)
    }

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        const createdPost = await createNewPost(post)
        navigate(`/posts/UserPosts/UserAllPosts/UserPostDetails/${createdPost.id}`)
    }


    return (
        <>
            <main className="container">
                <form className="box">New Post
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Title"
                            value={post.title}
                            onChange={
                                (evt) => {
                                    // This creates a copy variable of the post using the spread operator and then marks the appropriate property value to the input value and invokes update
                                    const copy = { ...post }
                                    copy.title = evt.target.value
                                    update(copy)
                                }
                            } />
                    </fieldset>
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Image Url"
                            value={post.image_url}
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.image_url = evt.target.value
                                    update(copy)
                                }
                            } />
                    </fieldset>
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Article content"
                            value={post.content}
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.content = evt.target.value
                                    update(copy)
                                }
                            } />
                    </fieldset>
                    <fieldset className="field">
                        <select
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.category_id = evt.target.value
                                    update(copy)
                                }
                            }>
                            <option value="0">Category Select</option>
                            {allCategories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset className="field">
                        {allTags.map((tag) => (
                            <div key={tag.id}>
                                <label className="checkbox" htmlFor="Tags">{tag.label}</label>
                                <input
                                    type="checkbox"
                                    id={tag.id}
                                    name={tag.label}
                                    value={tag.id}
                                    onChange={selectPostTags}
                                />
                            </div>
                        ))}
                    </fieldset>
                    <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Publish</button>
                </form>
            </main>
        </>
    )
}