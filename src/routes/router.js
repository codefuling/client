import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main/Main";
import TodoContainer from "../pages/todo/TodoContainer";
import AdminLayout from "../pages/layout/AdminLayout";
import MyPage from "../pages/myPage/MyPage";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import PageNotFound from "../pages/error/PageNotFound";


const router = createBrowserRouter([
    {
        path: '/',
        element : <Layout />,
        children: [
            {
                path: '/',
                element: <Main />
            },
            {
                path: '/todo',
                element: <TodoContainer />
            },
            {
                path: '/signIn',
                element: <SignIn />
            },
            {
                path: '/signUp',
                element: <SignUp />
            }
        ]
    },
    {
        path: '/my',
        element : <AdminLayout />,
        children: [
            {
                path: '/my',
                element: <MyPage />
            },
        ]
    },
    {
        path: '*',
        element : <PageNotFound />
    }
])

export default router;