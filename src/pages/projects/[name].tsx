import styled from "@emotion/styled";
import { navigate } from "gatsby";
import * as React from "react";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import {
  getProjectFiles,
  getProjectFileType,
  ProjectType,
  readProjectData,
} from "../../server/projects";
import { WorksGrid } from "../works";

const Project = ({ params: { name } }: { params: { name: string } }) => {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [project, setProject] = useState<ProjectType>();
  useEffect(() => {
    getProjectFiles(name).then(setFiles);
    readProjectData(name).then(setProject);
  }, [name]);

  return (
    <Wrapper>
      <Header />
      <main>
        <p>{project?.description}</p>
        <ProjectsGrid>
          {files.map((work) => (
            <Work url={work.url} name={work.name} projectName={name} />
          ))}
        </ProjectsGrid>
      </main>
      <Footer />
    </Wrapper>
  );
};

type Props = {
  url: string;
  name: string;
  projectName: string;
};

const Work = ({ url, name, projectName }: Props) => {
  const [type, setType] = useState<string>();
  useEffect(() => {
    getProjectFileType(`${projectName}/${name}`).then(setType);
  }, [name]);

  return type?.includes("image") ? (
    <Photo
      src={url}
      key={url}
      alt={name}
      onClick={() => navigate(`/projects/${projectName}/${name}`)}
    />
  ) : (
    <Video
      src={url}
      key={url}
      onClick={() => navigate(`/projects/${projectName}/${name}`)}
    />
  );
};

const Wrapper = styled.div``;

const ProjectsGrid = styled(WorksGrid)`
  height: 64vh;
`;

const Photo = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Video = styled.video`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Project;
