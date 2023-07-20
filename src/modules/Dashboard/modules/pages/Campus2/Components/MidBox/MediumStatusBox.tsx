import Loading from '../Loading/Loading'
import './MediumStatusBox.css'
import Edit from '../../Assets/Edit.svg'
interface StatusBoxProps {
    content: string | JSX.Element
    status?: boolean
    title?: string
    onClick?: (props: any) => void | boolean
    editOption?: boolean
}
const MediumStatusBox = ({ title = '', content = (<Loading />), status = true, onClick, editOption = false }: StatusBoxProps) => {
    return (<>
        <div className="mid-box">
            <div className={`medium-box ${!status ? 'button' : ''} `} onClick={!status ? onClick : () => { }}>
                <div className="title">{title}
                    {editOption && status &&
                        <div className='edit' onClick={onClick}>
                            <img src={Edit} alt="image" />
                        </div>
                    }</div>
                <div className="content">{
                    content
                }</div>
            </div>
        </div >
    </>)
}
export default MediumStatusBox