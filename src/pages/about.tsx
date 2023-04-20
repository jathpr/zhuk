import { useEffect, useState } from "react";
import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { UpdateAboutFields } from "../components/updateAboutFields";
import { useIsAuth } from "../hooks/useIsAuth";
import FileUpload from "../components/fileUpload";
import {
  getAboutCover,
  readAboutData,
  uploadAboutCover,
} from "../server/about";
import styled from "@emotion/styled";
import { Preview } from "../components/preview";
import text from "../text.json";

export const About = () => {
  const isAuth = useIsAuth();
  const [trigger, setTrigger] = useState(new Date().getTime());
  const [title, setTitle] = useState("");
  const [subTitles, setSubTitles] = useState([]);
  const [aboutParagraphs, setAboutParagraphs] = useState([]);

  useEffect(() => {
    readAboutData("title").then(setTitle);
    readAboutData("subTitles").then(setSubTitles);
    readAboutData("aboutParagraphs").then(setAboutParagraphs);
  }, [trigger]);

  const onUpdate = () => setTrigger(new Date().getTime());

  return (
    <>
      <Header />
      {isAuth && <MenuForAuthUser onUpdate={onUpdate} />}
      <Label>{text.about.label}</Label>
      <Preview
        getPreview={getAboutCover}
        width="400px"
        name="Cover"
        trigger={trigger}
      />
      <Title>{title}</Title>
      {subTitles.map((subTitle, index) => (
        <SubTitle key={index + subTitle}>{subTitle}</SubTitle>
      ))}
      {aboutParagraphs.map((aboutParagraph, index) => (
        <Paragraph key={index + aboutParagraph}>{aboutParagraph}</Paragraph>
      ))}
      <Footer />
    </>
  );
};

const MenuForAuthUser = ({ onUpdate }: { onUpdate: () => void }) => (
  <>
    <FileUpload
      addText="фото c моим лицом"
      name="Cover"
      uploadFile={uploadAboutCover}
      onUpload={onUpdate}
    />
    Имя
    <UpdateAboutFields field="title" onChange={onUpdate} />
  </>
);

const Paragraph = styled.p`
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const SubTitle = styled.span`
  font-size: 1rem;
  display: block;
`;

const Title = styled.span`
  font-size: 1rem;
  display: block;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

const Label = styled.span`
  font-size: 1.2rem;
  display: block;
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export default About;
