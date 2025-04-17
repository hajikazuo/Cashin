import { Route, Routes } from "react-router-dom"
import { Auth } from "../pages/Account"
import { Home } from "../pages/Home"
import MainLayout from "../components/layout/MainLayout"
import LayoutLogin from "../components/layout/LayoutLogin"
import { Transactions } from "../pages/Transactions"
import { Categories } from "../pages/Categories"
import { NewTransaction } from "../pages/Transactions/add"
import { NewCategory } from "../pages/Categories/Add"

export const MainRoutes = () => {
    return (
        <Routes>
            <Route element={<LayoutLogin />}>
                <Route
                    path="/signin"
                    element={<Auth type="signin" />}
                />

                <Route
                    path="/signup"
                    element={<Auth type="signup" />}
                />
            </Route>

            <Route element={<MainLayout />}>
                <Route
                    path="*"
                    element={<Home />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/transacoes/list"
                    element={<Transactions />}
                />

                <Route
                    path="/transacoes/add"
                    element={<NewTransaction />}
                />

                <Route
                    path="/categorias/list"
                    element={<Categories />}
                />

                <Route
                    path="/categorias/add"
                    element={<NewCategory />}
                />
            </Route>

        </Routes >
    )
}