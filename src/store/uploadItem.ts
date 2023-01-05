import create from "zustand";
import { UploadItem } from "../Types";



export const defaultUploadItem: UploadItem[] = [
]

interface UploadItemStore {
    item: UploadItem[];
    setItem: (filters: UploadItem[]) => void;
    itemEditing: boolean;
    selectedItem: UploadItem | null;
    setSelectedItem: (item: UploadItem) => void;
    discardItem: () => void;
}

export const uploadItemStore = create<UploadItemStore>(set => ({
    item: defaultUploadItem,
    itemEditing: false,
    selectedItem: null,
    setItem(item: UploadItem[]) {
        set(() => ({ item }));
    },
    setSelectedItem(item: UploadItem) {
        set(() => ({ selectedItem: item, itemEditing: true }));
    },
    discardItem() {
        set(() => ({ selectedItem: null, itemEditing: false }))
    },
}));
