import { Iproduct } from '@/app/models/product'
import { iProduct } from '@/app/models/user'
import React from 'react'
import { BsTagFill } from 'react-icons/bs'
import { PublicProductPost } from '../../content/view/ProductPost'
import useUserProducts from '../hooks/useUserProducts'

export default function UserProducts({ id }: { id: string }) {
    const { userProducts } = useUserProducts(id)


    if (userProducts.length === 0) {
        return <div className="">
            <div className="flex flex-col gap-4 mx-auts w-full items-center">
                <div
                    style={{
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="bg-[url('/emptyFeeds.svg')] dark:bg-[url('/emptyFeeds_black.svg')] w-[300px] h-[300px]"
                ></div>
                <h4 className="text-gray-700 text-base dark:text-gray-100 font-semibold">
                    No products found!
                </h4>
                <p className="text-gray-700 text-xs dark:text-gray-100 font-semibold">
                    {" "}
                    User haven&apos;t added any product yet.
                </p>

            </div>
        </div>
    } else {

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {userProducts.map((product: Iproduct, key) => {
                    return (
                        <div key={key} className="border-b border-gray-200 dark:border-gray-600 pb-4 h-[100%]">
                            <PublicProductPost id={product.id} userId={id} disableScroll={true} imgDimention="w-[100%] h-[160px]" media={product.productImage.map(image => image.imageUrl as string)} product={product} content={{
                                message: product.description,
                                price: product.price,
                                name: product.name,
                            }} />
                        </div>)
                })}
            </div>
        )
    }
}
