import { useEffect } from "react"
import { useAuth } from "./hooks/auth"
import { MainRoutes } from "./routes"

const App = () => {
  const { handleAuthenticateUser } = useAuth()

  useEffect(() => {
    handleAuthenticateUser()
  }, [])

  return (
      <MainRoutes/>
  )
}

export default App;