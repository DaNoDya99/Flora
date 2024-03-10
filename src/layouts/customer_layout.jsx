import {Outlet} from "react-router-dom";
import ResponsiveAppBar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function CustomerLayout() {
    return (
        <div className={'nunito-sans-light'}>
            <ResponsiveAppBar/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default CustomerLayout;