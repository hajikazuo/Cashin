import Breadcrumb from "../../components/layout/Breadcrumb"

export const Home = () => {
    return (
        <div>
             <Breadcrumb
                paths={[
                    { label: 'Home', href: '/home' },
                    { label: 'Bem-vindo' }
                ]}
            />
            HomePage
        </div>
    )
}