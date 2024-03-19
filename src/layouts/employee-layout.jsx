import {Outlet} from "react-router-dom";

function EmployeeLayout() {
    return (
        <div>
            <div className={'flex'}>
                <div className={'w-[20em]'}>
                    Sidebar
                </div>
                <div className={'w-full'}>
                    <div>Header</div>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>

        </div>
    );
}

export default EmployeeLayout;