import styled from "@emotion/styled";
import React, { useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import text from "../text.json";

export const Projects = () => {
  return (
    <>
      <Header path="/editProject" />
      <Title>{text.projects.label}</Title>
      <Footer />
    </>
  );
};

const Title = styled.span`
  font-size: 20px;
  font-size: 30px;
  display: block;
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
`;

export default Projects;
