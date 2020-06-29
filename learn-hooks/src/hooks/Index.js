import React from 'react';
import LearnUseState from './LearnUseState'
import LearnUseContext from './LearnUseContext'
import { LearnUseEffect, LearnUseEffectTimes, LearnUseEffectTimesFun } from './LearnUseEffect'
import LearnUseRef from './LearnUseRef'
import LearnForwardRef from './LearnForwardRef'
import LearnUseImperativeHandle from './LearnUseImperativeHandle'
import LearnUseMemo from './LearnUseMemo'

function Index() {
    return (
        <div className="App">
            <h3>我是App组件</h3>

            <LearnUseState />

            <LearnUseContext />

            {/* <LearnUseEffect /> */}
            {/* <LearnUseEffectTimes /> */}
            <LearnUseEffectTimesFun />

            <LearnUseRef />

            <LearnForwardRef />

            <LearnUseImperativeHandle />

            <LearnUseMemo />
        </div>
    );
}

export default Index;
