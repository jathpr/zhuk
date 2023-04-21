import styled from "@emotion/styled";
import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import {
  getProjectImg,
  ProjectsType,
  ProjectType,
  readProjectData,
} from "../server/projects";
import text from "../text.json";
import { Page } from "../components/Page";

export const Projects = () => {
  const [projects, setProjects] = useState<ProjectsType>({});
  useEffect(() => {
    readProjectData().then(setProjects);
  }, []);

  const projectNames = Object.keys(projects);

  return (
    <Page authUrl="/editProject">
      <Title>{text.projects.label}</Title>
      <ProjectsGrid>
        {projectNames.map((projectName) => (
          <Project projectName={projectName} project={projects[projectName]} />
        ))}
      </ProjectsGrid>
    </Page>
  );
};

type ProjectProps = {
  projectName: string;
  project: ProjectType;
};

const Project = ({ projectName, project }: ProjectProps) => {
  const [coverUrl, setCoverUrl] = useState<string>();
  useEffect(() => {
    getProjectImg(projectName).then(setCoverUrl);
  }, [projectName]);

  return (
    <ProjectWrapper
      key={projectName}
      onClick={() => {
        navigate("/projects/" + projectName);
      }}
    >
      <ProjectCover src={coverUrl} />
      <ProjectDescription>{project.description}</ProjectDescription>
    </ProjectWrapper>
  );
};

const ProjectWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
`;
const ProjectDescription = styled.span``;
const ProjectCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProjectsGrid = styled.div`
  display: grid;
  height: 64vh;
  overflow: scroll;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 36vh);
  grid-gap: 15px;

  @media (min-width: 600px) {
    grid-template-rows: repeat(2, 30vw);
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  letter-spacing: 8px;
  display: block;
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
`;

export default Projects;
