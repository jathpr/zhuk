import styled from "@emotion/styled";
import { Link } from "gatsby";
import text from "../text.json"
import { StaticImage } from "gatsby-plugin-image";
import React from "react";


const Navigation = () => <Menu>
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


const Instagram = () => <Insta href="https://www.instagram.com/anna_ricci3/">
  <StaticImage src="../images/instagram.svg" alt="instagram link" />
</Insta>


export const Footer = () => <>
  <Navigation />
  <Instagram />
</>

const Menu = styled.nav`
  margin-top: 10px;
  display: flex;
  width: 400px;
  justify-content: space-between;
  flex-direction: row;
`;

export const ClearLink = styled(Link)`
  text-decoration: none;
`

const MenuText = styled.span`
  line-height: 2;
  letter-spacing: 2px;
  font-size: 1.4rem;
  color: black;
`;

const Insta = styled.a`
  margin-top: 20px;
`;