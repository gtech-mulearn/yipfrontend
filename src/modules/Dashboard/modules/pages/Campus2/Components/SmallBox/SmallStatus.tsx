import './SmallStatus.css'
interface Props {
    value: string
    style: string
    run?: (props: any) => void,
    edit?: (props: any) => void,
    type?: "button" | "submit" | "reset" | undefined
}
import Edit from '../../Assets/Edit.svg'
const SmallStatus = ({ value, style, run, edit, ...props }: Props) => {
    return (
        <button className={`small-box small-${style}`} onClick={run ? run : () => { }} {...props} >
            {style === 'image' ? <img src={value} alt="image" /> : value}
            {edit ?
                <div className='edit'>
                    <img src={Edit} alt="image" onClick={edit} />
                </div>
                : <></>
            }
        </button>
    );
};
export default SmallStatus