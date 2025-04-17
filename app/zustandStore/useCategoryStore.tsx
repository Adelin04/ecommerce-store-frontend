import { create } from "zustand";
import axios from "axios";
import { ICategory } from "../interfaces/interfaces";
import { fetchCategories } from "../actions/productActions";

interface CategoryState {
    categories: Array<ICategory> | null,
    categorySelected: ICategory | null,
    isLoadingCategories: boolean
}

// Initialize a default state
const INITIAL_STATE: CategoryState = {
    categories: [],
    categorySelected: null,
    isLoadingCategories: false
}


export const useCategoryStore = create((set: any, get: any) => ({
    categories: INITIAL_STATE.categories,

    setCategories: async () => {
        set(() => ({ isLoadingCategories: true }));
        const fetchedCategories = await fetchCategories().then((data) => { return data });

        if (fetchedCategories !== null) {
            set(() => ({ categories: fetchedCategories }));
            
            //Set men as the default selected category
            set(() => ({ categorySelected: get().categories.filter((category: any) => category.gender.gender === 'men') }))
        }
        else set(() => ({ categories: null, isLoadingCategories: false }));


        set(() => ({ isLoadingCategories: false }));
    },

    setCategoryClicked: (categoryClicked: string) => {


        localStorage.setItem('gender', categoryClicked)
        set(() => ({ categorySelected: get().categories.filter((category: ICategory | any) => category?.gender.gender === categoryClicked?.toLowerCase()) }))


    }

}))