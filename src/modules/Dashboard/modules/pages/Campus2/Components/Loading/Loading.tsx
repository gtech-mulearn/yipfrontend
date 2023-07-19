import './Loading.css'
import { ThreeDots } from 'react-loader-spinner'
const Loading = () => {
    return (
        <div className="loader">
            <ThreeDots
                height="10"
                width="20"
                radius="20"
                color="#59b3fa"
                ariaLabel="three-dots-loading"
            />
        </div>
    )
}

export default Loading