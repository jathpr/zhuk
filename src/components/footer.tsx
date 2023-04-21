import styled from "@emotion/styled";
import { Link } from "gatsby";
import text from "../text.json";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { readAboutData } from "../server/about";

const Navigation = ({ width }: { width?: string }) => (
  <Menu width={width}>
    <ClearLink to="/works">
      <MenuText>{text.navigation.works}</MenuText>
    </ClearLink>
    <ClearLink to="/projects">
      <MenuText>{text.navigation.projects}</MenuText>
    </ClearLink>
    <ClearLink to="/about">
      <MenuText>{text.navigation.about}</MenuText>
    </ClearLink>
  </Menu>
);

const Instagram = () => {
  const [url, setUrl] = useState();
  useEffect(() => {
    readAboutData("inst").then(setUrl);
  }, []);
  return (
    <Inst href={url}>
      <StaticImage src="../images/instagram.svg" alt="instagram link" />
    </Inst>
  );
};

export const Footer = ({ width }: { width?: string }) => (
  <Wrapper>
    <Navigation width={width} />
    <Instagram />
  </Wrapper>
);

const Wrapper = styled.div`
  /* width: 92%; */
`;

const Menu = styled.nav<{ width?: string }>`
  margin-top: 10px;
  display: flex;
  ${({ width }) => (width ? "width: " + width + ";" : null)}
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  flex-direction: row;
`;

const ClearLink = styled(Link)`
  text-decoration: none;
`;

const MenuText = styled.span`
  line-height: 2;
  letter-spacing: 2px;
  font-size: 1.4rem;
  color: #202020;
`;

const Inst = styled.a`
  margin-top: 1rem;
  display: block;
  text-align: center;
`;
