export default function addRoboHashUrlToPosts(posts) {
    const data = posts.map((post) => {
        return { ...post, user: { ...post.user, imageUrl: `https://robohash.org/${post.user.id}` } }
    })
    return data
}