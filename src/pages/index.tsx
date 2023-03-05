import styled from "@emotion/styled";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React from "react";
import { useState } from "react";
import { app } from "../firebase";
import { Footer } from "../components/footer";
import text from "../text.json";

const storage = getStorage();

export const Test = () => {
  const auth = getAuth(app);
  const [img, setImg] = useState<string>();
  getDownloadURL(ref(storage, "Ann"))
    .then((url) => {
      setImg(url);
    })
    .catch((error) => {

    });
  return (
    <Wrapper>
      <Name>{text.logo}</Name>
      {img && <img src={img} width="500" alt="Anna looks on you" />}
      <Footer />
    </Wrapper>
  );
};



const Name = styled.span`
  margin-top: 2rem;
  line-height: 1.2;
  font-size: 7rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Test;
