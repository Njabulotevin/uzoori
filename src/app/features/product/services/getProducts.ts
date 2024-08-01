import axios from "axios";

export async function getProductById(id: string) {
  const { data } = await axios.get(
    `https://3f5d-41-169-13-10.ngrok-free.app/product/id/${id}`
  );
  return data;
}

export async function getMerchantProducts(){
    // do something
}


export async function getAllProducts(){
    // do something
}