import { buttons, urlProps } from "../../utils/navbarUtils"
import { Link } from "react-router-dom"
import './BottomTab.scss'

const getCurrentPageUtils = (): urlProps => {
    /**
* Returns an object containing the URL properties of the current page.
*
* @return {urlProps} An object containing the URL properties of the current page.
*/

    for (let i in buttons) if (window.location.pathname === buttons[i].url) return buttons[i]
    return {} as urlProps
}

export const BottomTab = () => {
    /**
     * Renders a bottom tab component.
     * @return {JSX.Element} The bottom tab component.
     */
    return (
        <div className="bottom-tab-container">
            <div className="tab-nav">
                {/* Renders the title of the current page */}
                <div className="tab-nav-container visible-mob">
                    {getCurrentPageUtils().title}
                </div>
                <div className="tab-nav-container">
                    {/* Renders navigation links */}
                    {buttons.map((button: urlProps, index: number) => (
                        <Link to={button.url} key={index}>
                            <div
                                className={`tab ${window.location.pathname === button.url ? "active" : ""
                                    } `}
                            >
                                <i className={`fa-sharp fa-solid ${button.icon}`}></i>
                                <h3
                                    className={`tab-text ${window.location.pathname === button.url ? "visible " : ""
                                        }`}
                                >
                                    {button.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                    {/* Renders logout button */}
                    <div className="tab red">
                        <a
                            href="/"
                            className="fa-solid fa-right-from-bracket"
                            onClick={() => {
                                localStorage.removeItem("accessToken")
                                window.location.href = "/"
                            }}
                        ></a>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
