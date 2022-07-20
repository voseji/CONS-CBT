import React from 'react';

const DashboardTitle = ({title, icon=null, children, ...rest}) => {
    return (
        <h1 className='dashboard_title' {...rest}>{icon} {title} {children}</h1>
    )
}

export default DashboardTitle;