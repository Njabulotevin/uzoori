export interface Iuser {
        id: string,
        createdAt: string,
        updatedAt: string,
        deletedAt: null | string,
        name: string,
        username: string,
        email: string,
        accountType: string,
        addressLine1 : string,
        addressLine2 : string,
        city : string,
        postalCode : string,
        province : string,
        firstContactNumber : string,
        secondContactNumber : string,
        productImage : string[],
        [key : string] : unknown
        
}