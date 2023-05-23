import AssemblySetup from './AssemblySetup'
import AssemblyTable from './AssemblyTable'
import '../../components/Layout.scss'
const AssemblyLayout = () => {
    return (
        <div className='dash-container'>
            <AssemblySetup title="Assembly" />
            <AssemblyTable />
        </div>
    )
}

export default AssemblyLayout