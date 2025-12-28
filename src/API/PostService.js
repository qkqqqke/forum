import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;


    }

    static async getById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response;
    }

    static async getUserById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        return response;
    }

    static async getPostsWithUsersByPosts(posts) {
        const usersId = posts.filter((post, index, arr) =>
            arr.findIndex(el => el.userId === post.userId) === index
        ).map(post => post.userId)

        const usersReq = await Promise.all(usersId.map(id => {
            return PostService.getUserById(id);
        }))

        const users = usersReq.map((userReq) => userReq.data);
        
        const data = posts.map((post) => {
            return {
                ...post,
                user: users[users.findIndex(user => user.id === post.userId)]
            }
        })
        return data
    }

    static async getPostsByUserId(userId){
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`,{
            params: {
                userId
            }
        })
        return response;
    }

    static async setNewPostComment(postId, body){
        const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`,{
            body: body
        });
        return response;
    }
}

