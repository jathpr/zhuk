import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { useIsAuth } from "../hooks/useIsAuth";
import { deleteWork, getWorks } from "../server/works";

type Props = {
  isAuth: boolean;
  url: string;
  name: string;
  onDel: () => void;
};
const Work = ({ isAuth, url, name, onDel }: Props) => {
  if (!isAuth) return <Photo src={url} key={url} alt={name} />;
  return (
    <WorkAuth>
      <Photo src={url} key={url} alt={name} />
      <RemoveButton
        onClick={async () => {
          const answer = window.confirm("Это Удаліт Фото навсегда!");
          if (answer) {
            await deleteWork(name);
            onDel();
          }
        }}
      >
        X
      </RemoveButton>
      <Text>{name}</Text>
    </WorkAuth>
  );
};

export const Works = () => {
  const isAuth = useIsAuth();

  const [works, setWorks] = useState<{ url: string; name: string }[]>([]);

  const updateWorks = async () => getWorks().then(setWorks);

  useEffect(() => {
    updateWorks();
  }, []);

  return (
    <>
      <Header path="/img" />
      <WorksGrid>
        {works.map((work) => (
          <Work
            url={work.url}
            isAuth={isAuth}
            name={work.name}
            onDel={updateWorks}
          />
        ))}
      </WorksGrid>
      <Footer />
    </>
  );
};

const WorksGrid = styled.div`
  display: grid;
  height: 74vh;
  overflow: scroll;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 36vh);
  grid-gap: 15px;

  @media (min-width: 600px) {
    grid-template-rows: repeat(2, 30vw);
    grid-template-columns: repeat(3, 1fr);
  }
`;

const WorkAuth = styled.div`
  position: relative;
`;

const Text = styled.span`
  position: absolute;
  position: absolute;
  left: 5%;
  bottom: 5%;
  font-size: 20px;
  background-color: white;
  opacity: 60%;
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 5%;
  top: 5%;
  font-size: 40px;
  background-color: white;
  opacity: 60%;
  width: 60px;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Works;
