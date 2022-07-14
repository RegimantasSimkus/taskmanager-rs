import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import Process from "./process";

class ProcList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            processes: []
        };
    }

    componentDidMount()
    {
        invoke('fetch_processes').then((procs) => JSON.parse(procs)).then((data) => {
            data.processes.sort((a, b) => {
                return a.name.localeCompare(b.name)
            });

            let procs = [];
            // stores the index of our desired proc
            let indices = [];
            data.processes.forEach((a) => {
                if (!indices[a.name])
                {
                    indices[a.name] = procs.length;
                    procs[indices[a.name]] = [];
                }
                
                procs[indices[a.name]].push(a);
            });

            this.setState({processes: procs})
        });
    }

    render() 
    {
        return (<div>
            <table className="proclist">
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>

                {this.state.processes.map((data) => {
                    return <Process proc={data}/>
                })}
            </table>
        </div>)
    }
}

export default ProcList;