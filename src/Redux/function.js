import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

const cookies = new Cookies();

// get user data from cookie
const getuserdata = () => {
  let data = localStorage.getItem("user");
  let devtechusercookie = cookies.get("devtechusercookie");
  let bytes = CryptoJS.AES.decrypt(data, devtechusercookie);
  let originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalText;
};
const getdatatoprint = (val) => {
  let data = localStorage.getItem(val);
  let devtechusercookie = cookies.get("devtechusercookie");
  let bytes = CryptoJS.AES.decrypt(data, devtechusercookie);
  let originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalText;
};

export { getuserdata, getdatatoprint };

{
  /* <Button onClick={() => window.print()}>Print Page</Button>; */
}
