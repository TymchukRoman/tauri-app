// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use chrono::prelude::*;
use std::fs;
const PATH: &str = "TauriApp";

#[tauri::command]
fn save_data(file_path: String, data: String) -> Result<(), String> {
    let app_dir = tauri::api::path::data_dir().ok_or("Could not find the data directory")?;
    let file_path = app_dir.join(PATH).join(file_path);

    if let Some(parent) = file_path.parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }

    println!("{}", file_path.display());
    std::fs::write(file_path, data).map_err(|e| e.to_string())
}

#[tauri::command]
fn load_data(file_path: String) -> Result<String, String> {
    let app_dir = tauri::api::path::data_dir().ok_or("Could not find the data directory")?;
    let file_path = app_dir.join(PATH).join(file_path);
    std::fs::read_to_string(file_path).map_err(|e| e.to_string())
}

#[tauri::command]
fn create_backup() -> Result<(), String> {
    let app_dir = tauri::api::path::data_dir().ok_or("Could not find the data directory")?;
    let app_data_dir = app_dir.join(PATH).join("data");
    let backup_dir = app_dir.join(PATH).join("backups");

    if !backup_dir.exists() {
        fs::create_dir_all(&backup_dir).map_err(|e| e.to_string())?;
    }

    let now: DateTime<Utc> = Utc::now();
    let backup_subdir = backup_dir.join(now.format("%Y%m%d%H%M%S").to_string());
    fs::create_dir_all(&backup_subdir).map_err(|e| e.to_string())?;

    for entry in fs::read_dir(&app_data_dir).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();
        if path.is_file() {
            let file_name = path.file_name().ok_or("Invalid file name")?;
            let dest_path = backup_subdir.join(file_name);
            fs::copy(&path, &dest_path).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            save_data,
            load_data,
            create_backup
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
