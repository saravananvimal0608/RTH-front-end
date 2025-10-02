import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="d-flex flex-column mt-5 p-3 shadow rounded bg-light">
            <NavLink
                to="/listallproperty"
                className={({ isActive }) =>
                    `text-decoration-none mb-3 p-2 rounded ${isActive ? "bg-primary text-white fw-bold shadow-sm" : "text-dark"
                    }`
                }
            >
                List All Property
            </NavLink>

            <NavLink
                to="/master"
                className={({ isActive }) =>
                    `text-decoration-none mb-3 p-2 rounded ${isActive ? "bg-primary text-white fw-bold shadow-sm" : "text-dark"
                    }`
                }
            >
                Master Page
            </NavLink>
        </div>
    );
};

export default SideBar;
