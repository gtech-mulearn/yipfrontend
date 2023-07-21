import open from '../../Assets/open.svg'
import close from '../../Assets/close.svg'
import './InfoTab.css'
import SmallStatus from '../SmallBox/SmallStatus'
export interface InfoTabProps {
    title: string
    openLayer: boolean
    closer: () => void
    children: JSX.Element
}
export interface Button1Props {
    title: string
    run: () => void
}
const InfoTab = ({ title, openLayer, closer, children }: InfoTabProps) => {
    return (
        <div className={`info-tab info-tab-${openLayer ? 'open' : 'close'}`}>
            <div className="sub-layer-1">
                {title}
            </div>
            <div className="sub-layer-2">
                {children}
                <SmallStatus value={openLayer ? close : open} style='image' run={closer} />
            </div>
        </div>
    )
}
export default InfoTab