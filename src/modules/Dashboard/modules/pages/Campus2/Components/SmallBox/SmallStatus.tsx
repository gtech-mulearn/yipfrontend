import './SmallStatus.css'
interface Props {
    value: string
    style: string
    run?: (props: any) => void,
    edit?: (props: any) => void
}
import Edit from '../../Assets/Edit.svg'
const SmallStatus = ({ value, style, run, edit }: Props) => {
    return (
        <div className={`small-box small-${style}`} onClick={run ? run : () => { }}>
            {style === 'image' ? <img src={value} alt="image" /> : value}
            {edit ?
                <div className='edit'>
                    <img src={Edit} alt="image" onClick={edit} />
                </div>
                : <></>
            }
        </div>
    );
};
export default SmallStatus