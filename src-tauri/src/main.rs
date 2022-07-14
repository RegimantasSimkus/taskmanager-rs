#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[warn(unused_must_use)]

use json::object;
use sysinfo::*;

#[derive(Debug, Clone)]
struct Process
{
    name: String
}

impl Process
{
    pub fn new() -> Process
    {
        Process
        {
            name: "Yo".to_string()
        }
    }
}

#[tauri::command]
fn fetch_processes() -> String {

    let mut system: sysinfo::System = sysinfo::System::new();
    system.refresh_all();

    let mut data = object!{
        processes: []
    };

    for (pid, proc) in system.processes() {
        data["processes"].push(object!{
            name: proc.name(),
            exe: proc.exe().to_str()
        });
    }

    return data.to_string();
}

#[tauri::command]
fn kill_process(name: &str)
{
    let mut system: sysinfo::System = sysinfo::System::new();
    system.refresh_all();

    for proc in system.processes_by_exact_name(name) {
        proc.kill();
    }
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        fetch_processes,
        kill_process,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
