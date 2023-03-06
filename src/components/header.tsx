import styled from "@emotion/styled";
import React from "react";
import text from "../text.json";
import { Link } from "gatsby";

const Logo = () => <Name>{text.logo}</Name>


const Name = styled.span`
  margin-top: 2rem;
  line-height: 1.2;
  font-size: 4rem;
  
  @media (min-width: 470px) {
    font-size: 7rem;
  }
`;

const ClearLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export const Header = () => <div><ClearLink to="/"><Logo/></ClearLink></div>

