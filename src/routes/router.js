import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main/Main";
import TodoContainer from "../pages/todo/TodoContainer";
import AdminLayout from "../pages/layout/AdminLayout";
import MyPage from "../pages/myPage/MyPage";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import PageNotFound from "../pages/error/PageNotFound";
import Detail from "../pages/payment/Detail";
import Success from "../pages/payment/Success";
import Failed from "../pages/payment/Failed";
import PaymentContrainer from "../pages/payment/PaymentContrainer";
import Message from "../pages/message/Message";


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
            },
            {
                path: '/message',
                element: <Message />
            },
            {
                path: '/payment',
                element: <PaymentContrainer />,  // 부모 컴포넌트
                children: [
                    {
                        index: true,  // 기본 경로일 때 Detail 보여줌
                        element: <Detail />
                    },
                    {
                        path: 'success',
                        element: <Success />
                    },
                    {
                        path: 'failed',
                        element: <Failed />
                    },
                ]
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