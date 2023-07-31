export const getUser = async (id) => {
  const response = await fetch(`http://localhost:8088/users/${id}`);
  const user = await response.json();
  return user;
};

export const getTheCategories = async () => {
  const response = await fetch(`http://localhost:8088/categories`);
  const categories = await response.json();

  return categories;
};

export const getAllTags = async () => {
  const response = await fetch(`http://localhost:8088/tags`);
  const tags = await response.json();

  return tags;
}

export const getAllUsers = async () => {
  const response = await fetch(`http://localhost:8088/users`);
  const users = await response.json();

  return users;
}

export const createNewPost = async (post, tagArray) => {
  try {
    // Make the API call to create the post
    const postResponse = await fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to create post");
    }

    // Get the new post object from the response
    const newPost = await postResponse.json();

    // Retrieve the post_id from the newPost object
    const postId = newPost.id;

    // Create an array of promises for tag post requests
    const tagPostPromises = tagArray.map(async (tag) => {
      // Modify the tag object to associate it with the post using the postId
      const tagPost = {
        post_id: postId,
        tag_id: tag.id
      };

      // Make the API call to create the tag post
      const tagResponse = await fetch("http://localhost:8088/post_tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagPost),
      });

      if (!tagResponse.ok) {
        throw new Error("Failed to create tag");
      }

      // Get the new tag post object from the response
      const newTagPost = await tagResponse.json();

      return newTagPost;
    });

    // Wait for all tag post requests to complete
    const createdTagPosts = await Promise.all(tagPostPromises);

    // Return the new post object along with the created tag posts
    return { ...newPost, tagPosts: createdTagPosts };
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error creating post and tags:", error);
    throw error;
  }
};

export const getPost = async (id) => {
  const response = await fetch(`http://localhost:8088/posts/${id}`)
  const postToEdit = await response.json()
  return postToEdit
}

export const editPost = async (post) => {
  const response = await fetch(`http://localhost:8088/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
}

export const getSubscriptions = async () => {
  const response = await fetch(`http://localhost:8088/subscriptions`);
  const subscriptions = await response.json();
  return subscriptions
}

export const createSubscription = async (newSubscription) => {
  const response = await fetch("http://localhost:8088/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSubscription)
  })
  const createdSubscription = await response.json()
  return createdSubscription
}

export const deleteSubscription = async (id) => {
  fetch(`http://localhost:8088/subscriptions/${id}`, {
    method: "DELETE"
  })
}
