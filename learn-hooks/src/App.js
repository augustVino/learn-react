import React from 'react';
import LearnUseState from './hooks/LearnUseState'
import LearnUseContext from './hooks/LearnUseContext'
import { LearnUseEffect, LearnUseEffectTimes, LearnUseEffectTimesFun } from './hooks/LearnUseEffect'
import LearnUseRef from './hooks/LearnUseRef'
import LearnForwardRef from './hooks/LearnForwardRef'
import LearnUseImperativeHandle from './hooks/LearnUseImperativeHandle'
import LearnUseMemo from './hooks/LearnUseMemo'

function App() {
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

export default App;
