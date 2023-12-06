import axios from "axios";
import { LocalStorage } from "quasar";

async function addItems () {
  const cartId = LocalStorage.getItem("cartIdBackend");
  try {
    const add = await axios.post(`https://elevar.api/cartService/addCartItem/${cartId}`, { produtoid: "1", quantidade: "1" });
  } catch (error) {
    console.log(error);
  }
}

export default addItems;
