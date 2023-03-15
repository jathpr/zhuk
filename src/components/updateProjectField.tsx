import React, { ChangeEvent, useEffect, useState } from "react";
import { readProjectData, sendProjectData } from "../server/projects";

type Props = {
  name: string;
  field: string;
};

export const UpdateProjectField = ({ name, field }: Props) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = async (e: ChangeEvent<HTMLInputElement>) => {
    name &&
      (await sendProjectData({
        name,
        body: [{ key: field, value: e.target.value }],
      }));
    const data = await readProjectData(name + "/" + field);
    setDescription(data);
  };

  useEffect(() => {
    readProjectData(name + "/" + field).then(setDescription);
  }, [name, field]);

  return <input value={description} onChange={handleDescriptionChange} />;
};
