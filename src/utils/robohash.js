export function addRoboHashUrlToPosts(posts) {
    const data = posts.map((post) => {
        return { ...post, user: { ...post.user, imageUrl: `https://robohash.org/${post.user.id}` } }
    })
    return data;
}

export function addRoboHashUrlToComments(comments) {
    const data = comments.map((com) => {
        return { ...com, imageUrl: `https://robohash.org/${com.email}`};
    })
    return data;
}