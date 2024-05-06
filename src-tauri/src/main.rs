// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn save_data(file_path: String, data: String) -> Result<(), String> {
    let app_dir = tauri::api::path::data_dir().ok_or("Could not find the data directory")?;
    let file_path = app_dir.join(file_path);
    std::fs::write(file_path, data).map_err(|e| e.to_string())
}

#[tauri::command]
fn load_data(file_path: String) -> Result<String, String> {
    let app_dir = tauri::api::path::data_dir().ok_or("Could not find the data directory")?;
    let file_path = app_dir.join(file_path);
    std::fs::read_to_string(file_path).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, save_data, load_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
