export interface CategoriesWithProducts {
    catId : number;
    name:string;
    image:string;
    listProducts:CategoriesAndProdcuts[];
}

export interface CategoriesAndProdcuts {
    id: number;
    isActive: boolean;
    image: string;
    name: string;
    subTitle: string;
    qty: number | null;
    price: number;
    priceDiscount: number;
    createdAt: string;
    updatedAt: string;
    isAuctionPaied: boolean;
    isFavourite: boolean;
    country: string;
    regionName: string;
    productShippingOptions: ProductShippingOptions[];
    isFreeDelivery: boolean;
    isMerchant: boolean;
    isFixedPriceEnabled: boolean;
    isAuctionEnabled: boolean;
    isNegotiationEnabled: boolean;
    priceDisc: number;
    isCashEnabled: boolean | null;
    auctionStartPrice: number;
    disccountEndDate: string;
    sendOfferForAuction: boolean | null;
    auctionClosingTime: string | null;
    auctionMinimumPrice: number | null;
    auctionNegotiateForWhom: string;
    auctionNegotiatePrice: number | null;
    highestBidPrice: number | null;
    sendYourAccountInfoToAuctionWinner: boolean | null;
}

export interface ProductShippingOptions {
    shippingOptionId: number;
    shippingOptionName: string;
}