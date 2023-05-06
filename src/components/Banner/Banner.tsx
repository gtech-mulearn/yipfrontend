import { useState, useEffect } from "react"
import BannerImg from "../../assets/Study abroad-pana.png"
import { fetchInstitutionStatusCount } from "../../service/bannerService"

const Banner = (props: any) => {
    const [count, setCount]: any = useState([])

    useEffect(() => {
        fetchInstitutionStatusCount(setCount, props.currentOption)
    }, [props.currentOption, props.dataUpdate])
    return (
        <div className="banner-container">
            <div className="welcome-banner">
                <div className="statistics">
                    {
                        Object.keys(count).slice(0, 6).map((item: any, index: number) => (
                            <div className={`box ${index < 3 ? '' : 'light-'}blue-box`}>
                                <h3>{count[item]}<div className="count"><div className="count-in">{count.total}</div></div></h3>
                                <p>{item}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="welcome-image-container">
                    <img id="banner-img" src={BannerImg} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Banner