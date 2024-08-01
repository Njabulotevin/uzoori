import axios from "axios";

export async function getProductById(id: string) {
  const { data } = await axios.get(
    `${process.env.SERVER_URL}/product/id/${id}`
  );
  return data;
}

export async function getMerchantProducts(){
    // do something
}


export async function getAllProducts(){
    // do something
}