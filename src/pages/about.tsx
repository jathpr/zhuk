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
  const [name, setName] = useState(text.logo);
  const [shortInfo, setShortInfo] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    readAboutData("name").then(setName);
    readAboutData("shortInfo").then(setShortInfo);
    readAboutData("description").then(setDescription);
  }, []);

  return (
    <>
      <Header />
      {isAuth && (
        <>
          <FileUpload
            addText="фото c моим лицом"
            name="Ana face"
            uploadFile={uploadAboutCover}
            onUpload={() => setTrigger(new Date().getTime())}
          />
          Имя
          <UpdateAboutFields field="name" onChange={setName} />
          Технические моменты
          <UpdateAboutFields field="shortInfo" onChange={setShortInfo} />
          О себе
          <UpdateAboutFields field="description" onChange={setDescription} />
        </>
      )}
      <Preview
        getPreview={getAboutCover}
        width="400px"
        name="Ana face"
        trigger={trigger}
      />
      <Title>{text.about.label}</Title>
      <Name>{name}</Name>
      <ShortInfo>{shortInfo}</ShortInfo>
      <Description>{description}</Description>
      <Footer />
    </>
  );
};

const Description = styled.p`
  font-size: 20px;
  font-size: 30px;
  text-align: center;
  padding: 20px;
`;

const ShortInfo = styled.span`
  font-size: 20px;
  font-size: 30px;
  display: block;
  text-align: center;
  padding: 20px;
`;

const Name = styled.span`
  font-size: 20px;
  font-size: 30px;
  display: block;
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-size: 30px;
  display: block;
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
`;

export default About;

//   useEffect(() => {
//     const dbRef = ref(getDatabase(app));
//     get(dbRef)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           setText(snapshot.val().about);
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
