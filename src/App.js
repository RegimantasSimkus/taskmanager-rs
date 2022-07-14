import logo from './logo.svg';
import './App.css';
import {invoke} from '@tauri-apps/api/tauri';
import React from 'react';
import ProcList from './components/proclist.js';

class App extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className="TaskManager">
                <ProcList/>
            </div>
        );
    }
}

export default App;
