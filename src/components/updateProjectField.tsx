import React, { ChangeEvent, useEffect, useState } from "react";
import { readData, sendData } from "../server/projects";

type Props = {
  name: string;
  field: string;
};

export const UpdateProjectField = ({ name, field }: Props) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = async (e: ChangeEvent<HTMLInputElement>) => {
    name &&
      (await sendData({
        name,
        body: [{ key: field, value: e.target.value }],
      }));
    const data = await readData(name + "/" + field);
    setDescription(data);
  };

  useEffect(() => {
    readData(name + "/" + field).then(setDescription);
  }, [name, field]);

  return <input value={description} onChange={handleDescriptionChange} />;
};
