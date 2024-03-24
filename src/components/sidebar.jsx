import PropTypes from "prop-types";
import LogoOnlyImage from "../assets/images/logo-only-image.png";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Sidebar(props) {

    const sidebarItems = props.items;
    const [dashboardItem, setDashboardItem] = useState({});
    const [activeItem, setActiveItem] = useState('dashboard');
    const urls = {
        Dashboard: '/admin/dashboard',
        Inventory: '/admin/inventory',
        Employee: '/admin/employee',
    }

    useEffect(() => {
        if(activeItem === 'Dashboard') {
            setDashboardItem({Dashboard: true, Inventory: false, Employee: false, Logout: false});
        }else if(activeItem === 'Inventory') {
            setDashboardItem({Dashboard: false, Inventory: true, Employee: false, Logout: false});
        }else if(activeItem === 'Employee') {
            setDashboardItem({Dashboard: false, Inventory: false, Employee: true, Logout: false});
        }else if(activeItem === 'Logout') {
            setDashboardItem({Dashboard: false, Inventory: false, Employee: false, Logout: true});
        }else {
            setDashboardItem({Dashboard: true, Inventory: false, Employee: false, Logout: false});
        }
    }, [activeItem]);

    console.log(dashboardItem);

    return (
        <div>
            <div className={'w-[15em] bg-secondary h-[100vh] px-5 py-10 2xl:py-20 2xl:w-[18em]'}>
                <div className={'flex justify-evenly items-center'}>
                    <img src={LogoOnlyImage} alt="Logo"
                         className={'h-12 w-12 rounded-full shadow-sm'}/>
                    <h1 className={'text-xl font-semibold 2xl:text-2xl'}>FLOWER HUB</h1>
                </div>
                <div className={'mt-12 space-y-10 ps-8 2xl:mt-20'}>
                    {Object.keys(sidebarItems).map((key, index) => {
                        const item = sidebarItems[key];
                        return (
                            <div key={index} className={dashboardItem[item.name] ? 'flex gap-3 justify-start items-center scale-110 font-semibold'
                                : 'flex gap-3 justify-start items-center'} onClick={() => setActiveItem(item.name)}>
                                <Link to={urls[item.name]} key={index} className={'flex gap-3 justify-start items-center'}>
                                    <item.icon className={'!text-3xl 2xl:!text-4xl'}/>
                                    <div className={'text-sm 2xl:text-lg'}>{item.name}</div>
                                </Link>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    items: PropTypes.array.isRequired
};

export default Sidebar;