import { Iproduct } from '@/app/models/product'
import React,{ useEffect, useState } from 'react'
import { useGetUserProductsQuery } from '../productApiSlice'




export default function useUserProducts( id : string ) {
  const [userProducts, setUserProducts] = useState<Iproduct[]>([])

  const { data, isLoading, isSuccess } = useGetUserProductsQuery({ id: id })

  useEffect(() => {
    try {
      if (data) {
        console.log(data.data)
        setUserProducts(data.data as Iproduct[])
      }
    } catch (err) {
      console.log(err)
    }
  }, [data, isSuccess])

  return { userProducts }
}
