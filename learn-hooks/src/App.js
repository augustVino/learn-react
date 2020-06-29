import React from 'react';

/**
 * 使用 react 提供的hooks
 */
// import Index from './hooks/Index'

/**
 * 使用第三方hooks（ahooks）
 */
import Index from './useHooks/Index'

function App() {
    return (
        <div className="App">
            <Index />
        </div>
    );
}

export default App;
