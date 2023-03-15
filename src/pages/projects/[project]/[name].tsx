import styled from "@emotion/styled";
import { navigate } from "gatsby";
import * as React from "react";
import { useEffect, useState } from "react";
import { getProjectImg } from "../../../server/projects";

const Image = ({
  params: { name, project },
}: {
  params: { name: string; project: string };
}) => {
  const [coverUrl, setCoverUrl] = useState<string>();
  useEffect(() => {
    getProjectImg(`${project}/${name}`).then(setCoverUrl);
    document.body.style.background = "black";
    return () => {
      document.body.style.background = "white";
    };
  }, [project, name]);

  return (
    <Wrapper
      onClick={() => {
        navigate(`/projects/${project}`);
      }}
    >
      <main>
        <p>Here's the image preview of the splat link:</p>
        <Photo alt={name} src={coverUrl} />
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Image;
