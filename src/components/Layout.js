import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
    return (
        <div className="d-flex">
            <div style={{ width: "115px" }}>
                <SideBar />
            </div>

            <div className="flex-grow-1 p-3">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
