import styled from "@emotion/styled";
import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: React.ReactNode;
  authUrl?: string;
};

export const Page = ({ children, authUrl }: Props) => {
  return (
    <Layout>
      <Header path={authUrl} />
      <Main>{children}</Main>
      <Footer />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 4rem);
  padding: 2rem;
  padding-left: 5%;
  padding-right: 5%;
`;

const Main = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
`;
