import PropTypes from "prop-types";
import LogoOnlyImage from "../assets/images/logo-only-image.png";

function Sidebar(props) {

    const sidebarItems = props.items;

    return (
        <div>
            <div className={'w-[18em] bg-secondary h-[100vh] px-5 py-10 2xl:py-20'}>
                <div className={'flex justify-evenly items-center'}>
                    <img src={LogoOnlyImage} alt="Logo"
                         className={'h-12 w-12 rounded-full shadow-sm'}/>
                    <h1 className={'text-xl font-semibold 2xl:text-2xl'}>FLOWER HUB</h1>
                </div>
                <div className={'mt-12 space-y-10 ps-8 2xl:mt-20'}>
                    {Object.keys(sidebarItems).map((key, index) => {
                        const item = sidebarItems[key];
                        return (
                            <div key={index} className={'flex gap-3 justify-start items-center'}>
                                <item.icon className={'!text-3xl 2xl:!text-4xl'}/>
                                <div className={'text-sm 2xl:text-lg'}>{item.name}</div>
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