interface Product {
    id:number;
    name:string;
    description:string;
    slug:string;
    price:number;
    images: Image[];
    reviews: Review[];
    categories: Category[];
    collections: Collection[];
}

interface Review {
    id:number;
    headline:string;
}

interface Category {
    id:number;
    name:string;
}

interface Collection {
    id: number
    name: string;
}

interface Image {
    width : number;
    height:number;
    url: string;
}
