export type Category = {
    id: string;
    name: string;
}

export type CategoryRequest = {
    name: string;
}

export type ApiGetCategories = Category[];


export type ApiGetCategory = Category;

export type ApiNewCategory  = string;

export type ApiUpdateCategory  = string;

export type ApiDeleteCategory  = string;
