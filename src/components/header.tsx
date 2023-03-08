import styled from "@emotion/styled";
import React from "react";
import text from "../text.json";
import { Link } from "gatsby";
import { useIsAuth } from "../hooks/useIsAuth";

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

export const Header = ({ path }: { path?: string }) => {
  const isAuth = useIsAuth()
  return <div>
    <ClearLink to="/">
      <Logo />
    </ClearLink>
    {isAuth && path && <Link to={path} >Add works</Link>}
  </div>;
}

