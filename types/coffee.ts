// interface Coffee {
//     id: number;
//     name: string;
//     price: number;
//     description: string;
//     imageUrl: string;
//     isAvailable: boolean;
//     rating: number;
//     reviews: Review[];
// }

// interface Review {
//     id: number;
//     userId: number;
//     coffeeId: number;
//     rating: number;
//     comment: string;
//     createdAt: Date;
//     user: User;
// }

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     phone: number;
//     password: string;
//     coffeeOrders: CoffeeOrder[];
//     reviews: Review[];
// }

// interface CoffeeOrder {
//     id: number;
//     userId: number;
//     coffeeId: number;
//     quantity: number;
//     orderDate: Date;
//     coffee: Coffee;
// }


export interface Coffee {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    sizes?: Size[];

}

// enum sizeType {
//     small,
//     medium,
//     large
// }


export interface Size {
    size: string;
    price: number,
    // available: boolean
}