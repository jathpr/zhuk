import React, { ChangeEvent, useEffect, useState } from "react";
import { sendAboutData, readAboutData } from "../server/about";

type Props = {
  field: string;
  onChange?: (val: string) => void;
};

export const UpdateAboutFields = ({ field, onChange }: Props) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await sendAboutData({
      body: [{ key: field, value: e.target.value }],
    });
    const data = await readAboutData(field);
    setDescription(data);
    onChange && onChange(data);
  };

  useEffect(() => {
    readAboutData(field).then(setDescription);
  }, [field]);

  return (
    <input
      value={description}
      onChange={handleDescriptionChange}
      style={{ width: "100%" }}
    />
  );
};
