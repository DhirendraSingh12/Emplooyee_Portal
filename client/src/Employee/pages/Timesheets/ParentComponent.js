import React, { useState } from 'react';
import Timesheets from './Timesheets';
import Schedule from './Schedule';
const ParentComponent = () => {
    const [totalHours, setTotalHours] = useState(0);
    const updateTotalHours = (hours) => {
        setTotalHours(hours);
    };
    return (
        <div>
            <Schedule totalHours={totalHours} />
            <Timesheets updateTotalHours={updateTotalHours} />
        </div>
    );
};

export default ParentComponent;
