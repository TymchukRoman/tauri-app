
import { invoke } from "@tauri-apps/api/tauri";

export const invokeGreet = async (name: string): Promise<string> => {
    return await invoke("greet", { name })
}

export const invokeSave = async (data) => {
    return await invoke("save_data", { file_path: "./test.txt" })
}
