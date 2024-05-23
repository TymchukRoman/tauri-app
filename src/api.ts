import { invoke } from "@tauri-apps/api/tauri";

export const invokeSave = async (data: Record<string, string>) => {
    invoke("save_data", data)
        .then(() => console.log("Data saved successfully!"))
        .catch(err => console.error("Failed to save data:", err));
};

export const invSetCosts = async (data: any) => {
    const invokationData = { filePath: "data/costs.txt", data: JSON.stringify(data) };
    invokeSave(invokationData);
};

export const invGetCosts = async (): Promise<string> => invoke("load_data", { filePath: "data/costs.txt" });

export const invSetGlobal = async (data: any) => {
    const invokationData = { filePath: "data/global.txt", data: JSON.stringify(data) };
    invokeSave(invokationData);
};

export const invGetGlobal = async (): Promise<string> => invoke("load_data", { filePath: "data/global.txt" });