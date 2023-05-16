import React from 'react'
import { getCurrentPageUtils } from '../../utils/utils'
import ClubSetup from './ClubSetup'
import SchoolSetup from './SchoolSetup'
import UserSetup from './UserSetup'

const Setup = () => {
    let content = <></>
    switch (getCurrentPageUtils().content) {
        case 'Users': content = (<UserSetup />)
            break
        case 'Model School': content = (<SchoolSetup />)
            break
        case 'YIP Club': content = (<ClubSetup />)
            break
        default: content = (<></>)
    }
    return content
}

export default Setup