import { TUser, TProduct, TPurchase } from "./types"

export const arrayDeUser: TUser[] = [
    {
        id: 'zeroum',
        email: 'emaildo@gmeidev.com',
        password: 'senhadagota'
    }, {
        id: 'zerodois',
        email: 'miminviacarta@gmeioso.com',
        password: 'senhadoquere'
    }
];

export const arrayDeProduct: TProduct[] = [
    {
        id: 'zerotrei',
        name: 'aumufada',
        price: 2,
        category: 'compravel'
    }, {
        id: 'zerocatro',
        name: 'pipoca',
        price: 1,
        category: 'consumivel'
    }
];

export const arrayDePurchase: TPurchase[] = [
    {
        userId: 'zerotrei',
        productId: 'zeroZeroUm',
        quantity: 3,
        totalPrice: arrayDeProduct[0].price * 3
    }, {
        userId: 'zerocatro',
        productId: 'zeroZeroDois',
        quantity: 5,
        totalPrice: arrayDeProduct[1].price * 5
    }
];