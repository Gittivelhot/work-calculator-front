import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = ({user}) => {
    return user ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoutes