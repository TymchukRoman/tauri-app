
import { invoke } from "@tauri-apps/api/tauri";

export const invokeGreet = async (name: string): Promise<string> => {
    return await invoke("greet", { name })
}

export const invokeSave = async (data: any) => {
    const invokationData = { filePath: "data/costs.txt", data: JSON.stringify(data) }
    console.log(data)
    invoke("save_data", invokationData)
        .then(() => console.log('Data saved successfully!'))
        .catch(err => console.error('Failed to save data:', err));;
}

export const invokeLoad = (): Promise<string> => {
    return invoke("load_data", { filePath: "data/costs.txt" })
}
