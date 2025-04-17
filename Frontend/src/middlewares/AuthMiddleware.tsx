import { ReactNode } from "react"
import { useAppSelector } from "../redux/hooks"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/layout/LoadingSpinner"

type Props = {
    children: ReactNode
}

export const AuthMiddleware = ({ children }: Props) => {
    const { authStatus } = useAppSelector(state => state.auth)

    if (authStatus === 'authenticated') {
        return children
    }

    if (authStatus === 'not_verified') {
        <LoadingSpinner size={60} color="primary" />
    }
    
    else {
        return <Navigate to='/signin' />
    }
}