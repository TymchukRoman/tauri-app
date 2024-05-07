
import { invoke } from "@tauri-apps/api/tauri";

export const invokeGreet = async (name: string): Promise<string> => {
    return await invoke("greet", { name })
}

export const invokeSave = async (data: Record<string, string>) => {
    invoke("save_data", data)
        .then(() => console.log('Data saved successfully!'))
        .catch(err => console.error('Failed to save data:', err));;
}

export const setCosts = async (data: any) => {
    const invokationData = { filePath: "data/costs.txt", data: JSON.stringify(data) };
    invokeSave(invokationData);
}

export const getCosts = async (): Promise<string> => {
    return invoke("load_data", { filePath: "data/costs.txt" })
}

export const setGlobal = async (data: any) => {
    const invokationData = { filePath: "data/global.txt", data: JSON.stringify(data) };
    invokeSave(invokationData);
}

export const getGlobal = async (): Promise<string> => {
    return invoke("load_data", { filePath: "data/global.txt" })
}