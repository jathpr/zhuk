import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import FileUpload from "../components/fileUpload";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Preview } from "../components/preview";
import { UpdateProjectField } from "../components/updateProjectField";
import {
  getProjectImg,
  getProjectFiles,
  uploadProject,
} from "../server/projects";

const AddProject = () => {
  const [name, setName] = useState<string | undefined>();
  const [trigger, setTrigger] = useState(new Date().getTime());
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);

  useEffect(() => {
    name && getProjectFiles(name).then(setFiles);
  }, [name]);

  return (
    <>
      <Header />
      Имя проекта вводить тут!
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Preview getPreview={getProjectImg} name={name} trigger={trigger} />
      {name && (
        <>
          <FileUpload
            addText="Выбрать обложку"
            uploadFile={uploadProject}
            onUpload={() => setTrigger(new Date().getTime())}
            name={name}
          />
          Коротко о проекте (то что будет в списке проектов)
          <UpdateProjectField field="description" name={name} />
          Длинно о проекте (то то будет на странице проекта)
          <UpdateProjectField field="info" name={name} />
          <FileUpload
            addText="Добавить фото"
            uploadFile={({ file, name: n }) =>
              uploadProject({ file, name: name + "/" + n })
            }
            onUpload={() => getProjectFiles(name).then(setFiles)}
          />
          {files.map(({ name, url }) => (
            <FilePreview src={url} alt={name} />
          ))}
        </>
      )}
      <Footer />
    </>
  );
};

const FilePreview = styled.img`
  width: 100px;
`;

export default AddProject;
