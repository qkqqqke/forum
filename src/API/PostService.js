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

    static async getUserByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        return response;
    }

    static async getPostsWithUsersByPosts(posts) {
        const usersId = posts.filter((post, index, arr) =>
            arr.findIndex(el => el.userId === post.userId) === index
        ).map(post => post.userId)

        const usersReq = await Promise.all(usersId.map(id => {
            return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        }))

        const users = usersReq.map((userReq) => userReq.data)
        return posts.map((post) => {
            return {
                ...post,
                user: users[users.findIndex(user => user.id === post.userId)]
            }
        })
    }

}

