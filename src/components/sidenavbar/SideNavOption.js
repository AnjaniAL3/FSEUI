import React from 'react'

function SideNavOption({ active,text, Icon }) {
    return (
        <div className={`sidenavOption ${active && 'sidenavOption--active'}`}>
            <Icon />
            <h4>{text}</h4>
        </div>
    )
}

export default SideNavOption
