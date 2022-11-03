import * as React from "react";
import { Link } from "gatsby";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { StaticImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";

const storage = getStorage();

export const Test = () => {
  const auth = getAuth(app);
  const [img, setImg] = useState();
  getDownloadURL(ref(storage, "Ann"))
    .then((url) => {
      setImg(url);
    })
    .catch((error) => {
      // Handle any errors
    });
  return (
    <Wrapper>
      <Name>Anna Zhuk</Name>
      {img && <img src={img} width="500" />}
      <Menu>
        <Link to="/works">
          <MenuText>Works</MenuText>
        </Link>
        <Link to="/projects">
          <MenuText>Projects</MenuText>
        </Link>
        <Link to="/about">
          <MenuText>About</MenuText>
        </Link>
      </Menu>

      <Insta href="https://www.instagram.com/anna_ricci3/">
        <StaticImage src="../images/instagram.svg" alt="A dinosaur" />
      </Insta>
    </Wrapper>
  );
};

const Name = styled.span`
  margin-top: 2rem;
  line-height: 1.2;
  font-size: 7rem;
`;

const Menu = styled.nav`
  display: flex;
  width: 400px;
  justify-content: space-between;
  flex-direction: row;
`;

const MenuText = styled.span`
  line-height: 2;
  letter-spacing: 2px;
  font-size: 1.4rem;
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Insta = styled.a`
  margin-top: 20px;
`;

export default Test;
