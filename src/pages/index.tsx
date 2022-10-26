import * as React from "react"
import { Link } from "gatsby"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { getAuth} from "firebase/auth";

const storage = getStorage();


export const Test = () => {
    const auth = getAuth(app);
    const [img, setImg] = useState()
    getDownloadURL(ref(storage, 'Ann'))
  .then((url) => {
    setImg(url)
  })
  .catch((error) => {
    // Handle any errors
  });
    return <>Anna Zhuk<Link to="/about">About</Link>
{img && <img src={img} width="600"/>}
    </>;
}

export default Test
