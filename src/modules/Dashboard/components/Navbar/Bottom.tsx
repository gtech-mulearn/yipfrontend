import { buttons, urlProps, getCurrentPageTitle } from "../../utils/navbarUtils"
import { useNavigate } from "react-router-dom"
import './BottomTab.scss'



export const BottomTab = () => {
    /**
     * Renders a bottom tab component.
     * @return {JSX.Element} The bottom tab component.
     */
    const navigate = useNavigate();

    return (
        <div className="bottom-tab-container">
            <div className="tab-nav">
                {/* Renders the title of the current page */}

                <div className="tab-nav-container">
                    <div className="tab-adjust-container">
                        {/* Renders navigation links */}
                        {buttons.map((button: urlProps, index: number) => (
                            <div key={index} onClick={() => navigate(button.url)} >
                                <div
                                    className={`tab ${window.location.pathname === button.url ? "active" : ""} `}
                                >
                                    <i className={`fa-sharp fa-solid ${button.icon}`}></i>
                                    <h3 className={`tab-text ${window.location.pathname === button.url ? "visible " : ""}`} >
                                        {button.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                        {/* Renders logout button */}
                        <div className="tab">
                            <a
                                href="/"
                                className="fa-solid fa-right-from-bracket"
                                onClick={() => {
                                    localStorage.removeItem("accessToken")
                                    window.location.href = "/"
                                }}
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
