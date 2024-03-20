import {Outlet} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminImage from "../assets/images/administrator.png";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar.jsx";


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
                <Sidebar items={sidebarItems}/>
                <div className={'w-full px-10'}>
                    <div className="w-full flex justify-end py-2">
                        <div className={'flex gap-4 items-center py-1 px-5 border-2 border-secondary3 rounded-lg bg-primary'}>
                            <img src={AdminImage} alt="Profile Pic" 
                                className={"w-10 h-10 rounded-full shadow-md p-1 bg-white 2xl:w-12 2xl:h-12"}/>
                            <div className={"text-lg font-semibold 2xl:text-xl"}>Administrator</div>
                        </div>
                    </div>
                    <main className={'mt-2 2xl:mt-5'}>
                        <Outlet />
                    </main>
                </div>
            </div>

        </div>
    );
}

export default EmployeeLayout;