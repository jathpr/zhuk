import styled from "@emotion/styled";
import { getAuth } from "firebase/auth";
import React from "react";
import { app } from "../firebase";
import { Footer } from "../components/footer";
import text from "../text.json";
import { StaticImage } from "gatsby-plugin-image";
import "../gatsby.css";

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/zhuk-photon.appspot.com/o/Ann?alt=media&token=bd12ab6a-15df-4ce5-94df-f239fbf253e1";

export const Test = () => {
  const auth = getAuth(app);
  return (
    <>
      <Wrapper>
        <Name>{text.logo}</Name>
        <StaticImage
          src={LOGO_URL}
          width={500}
          height={500}
          alt="Anna looks on you"
        />
      </Wrapper>
      <Footer width="400px" />
    </>
  );
};

const Name = styled.span`
  margin-top: 2rem;
  line-height: 1.2;
  font-size: 4rem;

  @media (min-width: 470px) {
    font-size: 7rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Test;
