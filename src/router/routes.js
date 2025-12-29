import About from "../pages/About"
import Posts from "../pages/Posts"
import PostIdPage from "../pages/PostIdPage"
import Login from "../pages/Login"
import UserIdPage from "../pages/UserIdPage"
import NewPost from "../pages/NewPost"

export const priavteRoutes = [
    {path:'/about', component: <About/>},
    {path:'/posts', component: <Posts/>},
    {path:'/posts/:_page', component: <Posts/>},
    {path:'/post/:id', component: <PostIdPage/>},
    {path:'/post/new-post', component: <NewPost/>},
    {path:'/users/:id', component: <UserIdPage/>}
]

export const publicRoutes = [
    {path:'/login', component: <Login/>},
]