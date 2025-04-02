
export interface Item {
    _id: string;
    name: string;
    image: any;
    price: number;
    quantity: number;
    size: string;
    cubeQuantity: number;
}
export interface order {
    _id: string;
    reference: string;
    status: string;
    items: Item[];
    total: number;
}