import {Outlet} from "react-router-dom";
import LogoOnlyImage from "../assets/images/logo-only-image.png";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminImage from "../assets/images/administrator.png";
import { useLocation } from "react-router-dom";


function EmployeeLayout() {
    const location = useLocation();

    // const employee = location.state && location.state.employee;
    const employee = 'admin';

    let sidebarItems = employee === 'admin' ? [
        {name: 'Dashboard', icon: DashboardIcon},
        {name: 'Inventory', icon: InventoryIcon},
        {name: 'Employee', icon: BadgeIcon},
        {name: 'Logout', icon: LogoutIcon}
    ] : [
        {name: 'Dashboard', icon: DashboardIcon},
        {name: 'Inventory', icon: InventoryIcon},
        {name: 'Logout', icon: LogoutIcon}
    ];

    return (
        <div>
            <div className={'flex'}>
                <div className={'w-[18em] bg-secondary h-[100vh] px-5 py-10'}>
                    <div className={'flex justify-evenly items-center'}>
                        <img src={LogoOnlyImage} alt="Logo" 
                            className={'h-12 w-12 rounded-full shadow-sm'}/>
                        <h1 className={'text-xl font-semibold'}>FLOWER HUB</h1>
                    </div>
                    <div className={'mt-12 space-y-10 ps-8'}>
                        {Object.keys(sidebarItems).map((key, index) => {
                            const item = sidebarItems[key];
                            return (
                                <div key={index} className={'flex gap-3 justify-start items-center'}>
                                    <item.icon className={'!text-3xl'}/>
                                    <div className={'text-sm'}>{item.name}</div>
                                </div>
                            );
                        })}

                    </div>
                </div>
                <div className={'w-full px-10'}>
                    <div className="w-full flex justify-end py-2">
                        <div className={'flex gap-4 items-center py-1 px-5 border-2 border-secondary3 rounded-lg bg-primary'}>
                            <img src={AdminImage} alt="Profile Pic" 
                                className={"w-10 h-10 rounded-full shadow-md p-1 bg-white"}/>
                            <div className={"text-lg font-semibold"}>Administrator</div>
                        </div>
                    </div>
                    <main className={'mt-2'}>
                        <Outlet />
                    </main>
                </div>
            </div>

        </div>
    );
}

export default EmployeeLayout;