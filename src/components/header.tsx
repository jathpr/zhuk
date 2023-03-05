import styled from "@emotion/styled";
import React from "react";
import { ClearLink } from "./footer";
import text from "../text.json";

const Logo = () => <Name>{text.logo}</Name>


const Name = styled.span`
  margin-top: 2rem;
  line-height: 1.2;
  font-size: 7rem;
`;

export const Header = () => <div><ClearLink to="/"><Logo/></ClearLink></div>

