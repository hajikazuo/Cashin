import { Route, Routes } from "react-router-dom"
import { Auth } from "../pages/Account"
import { Home } from "../pages/Home"
import MainLayout from "../components/layout/MainLayout"
import LayoutLogin from "../components/layout/LayoutLogin"
import { Transactions } from "../pages/Transactions"
import { Categories } from "../pages/Categories"
import { NewTransaction } from "../pages/Transactions/add"
import { UpdateTransaction } from "../pages/Transactions/update"
import { NewCategory } from "../pages/Categories/Add"
import { UpdateCategory } from "../pages/Categories/update"

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
                    path="/transacoes/listar"
                    element={<Transactions />}
                />

                <Route
                    path="/transacoes/adicionar"
                    element={<NewTransaction />}
                />

                <Route
                    path="/transacoes/editar/:id"
                    element={<UpdateTransaction />}
                />

                <Route
                    path="/categorias/listar"
                    element={<Categories />}
                />

                <Route
                    path="/categorias/adicionar"
                    element={<NewCategory />}
                />

                <Route
                    path="/categorias/editar/:id"
                    element={<UpdateCategory />}
                />
            </Route>

        </Routes >
    )
}