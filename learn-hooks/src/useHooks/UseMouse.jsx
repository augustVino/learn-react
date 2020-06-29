import { useMouse } from 'ahooks';
import React from 'react';
export default () => {
    const mouse = useMouse();
    
    return  <div>Mouse Pos: {JSON.stringify(mouse)}</div>
};