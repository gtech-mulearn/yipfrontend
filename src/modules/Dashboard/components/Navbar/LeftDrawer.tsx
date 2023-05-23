import YIPlogo from '../../../../newAssets/logo.png'
import { Link } from "react-router-dom"
import { buttons, urlProps } from '../../utils/navbarUtils'
import './LeftDrawer.scss'

export const LeftDrawer = () => {
    return (
        <div className="left-menu">
            <img src={YIPlogo} alt="logo" />
            <div className="menu-items">
                {
                    buttons.map((item: urlProps, index: number) =>
                        <div className="menu-item-container " key={index}>
                            <Link className="link-item" to={item.url}>
                                <li className="menu-item">
                                    <div className={`menu-icon ${window.location.pathname === item.url ? "active" : ""}`}>
                                        <i className={`fa-sharp fa-solid ${item.icon}`}></i>
                                    </div>
                                    <h5>{item.title}</h5>
                                </li>
                            </Link>
                        </div>
                    )
                }
            </div>
            <button
                className="logout"
                onClick={() => {
                    localStorage.removeItem('accessToken')
                    window.location.href = "/"
                }}
            >
                Logout
            </button>
        </div>
    )
}