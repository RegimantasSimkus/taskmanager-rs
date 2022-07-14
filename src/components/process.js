import { invoke } from "@tauri-apps/api/tauri";
import React from "react";

class Process extends React.Component
{
    constructor(props)
    {
        super(props);

        this.terminate_proc = this.terminate_proc.bind(this);
        this.get_proc_name = this.get_proc_name.bind(this);
        this.get_proc_count = this.get_proc_count.bind(this);

        this.state = {
            deleted: false,
            collapsed: true
        };
    }

    terminate_proc()
    {
        invoke('kill_process', {name: this.get_proc_name()}).then(() => {
            this.setState({deleted: true});
        })
    }

    get_proc_count()
    {
        return this.props.proc.length;
    }

    get_proc_name()
    {
        let proc = this.props.proc;
        return proc[0].name;  
    }

    render()
    {
        if (this.state.deleted)
            return (<tr className="deleted"></tr>);
        else
            return (
            <tr className="process">
                <td>
                    <a className={"collapse"} id={this.state.collapsed ? "" : "active"} onClick={() => { if (this.get_proc_count() <= 1) return; this.setState({collapsed: !this.state.collapsed}) }}>{this.get_proc_count() <= 1 ? "" : <img width="18px" height="18px" src="/assets/collapse.png"/>}</a>
                    {this.get_proc_name() + (this.get_proc_count() > 1 ? (" (" + this.get_proc_count() + ")") : "")}
                    <div>
                        {this.props.proc.map((data) => {

                            if (this.state.collapsed || this.props.proc.len <= 1)
                                return;
                            
                            return (
                                <ul>
                                    {data.name}        
                                </ul>
                            )
                        })}
                    </div>
                </td>
                <td id="actions">
                    <a onClick={this.terminate_proc}>Terminate</a>
                </td>
            </tr>
            );
    }
}

export default Process;