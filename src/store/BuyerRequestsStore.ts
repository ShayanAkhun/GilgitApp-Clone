import create from "zustand";
import { UploadBuyerRequests } from "../Types";

export const defaultRequest: UploadBuyerRequests[] = [


]

interface RequestesStore {
    buyerstore: UploadBuyerRequests[];
    setbrStores: (filters: UploadBuyerRequests[]) => void;
    brStoresEditing: boolean;
    selectedbrStores: UploadBuyerRequests | null;
    setSelectedbrStores: (store: UploadBuyerRequests) => void;
    discardbrStores: () => void;
}


export const Buyerstore = create<RequestesStore>(set => ({
    buyerstore: defaultRequest,
    brStoresEditing: false,
    selectedbrStores: null,
    setbrStores(buyerstore: UploadBuyerRequests[]) {
        set(() => ({ buyerstore }));
    },
    setSelectedbrStores(store: UploadBuyerRequests) {
        set(() => ({ selectedbrStores: store, brStoresEditing: true }));
    },
    discardbrStores() {
        set(() => ({ selectedbrStores: null, brStoresEditing: false }))
    },
}));
