import {Outlet} from "react-router-dom";
import AuthBackgroundImage from "../assets/images/auth-background.jpg";

function EmployeeAuthLayout() {
    return (
        <div className={'nunito-sans-light'}>
            <div className={'flex'}>
                <div className={"w-[60%]"}>
                    <main>
                        <Outlet />
                    </main>
                </div>
                <div className={"w-[40%]"}>
                    <img src={AuthBackgroundImage}
                         alt="background image"
                         className={"object-cover w-full h-screen mt-1 opacity-75"}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmployeeAuthLayout;