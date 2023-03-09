import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

export const Preview = ({
  name,
  getPreview,
  trigger,
}: {
  name?: string;
  getPreview: (name: string) => Promise<any>;
  trigger: number;
}) => {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    name && getPreview(name).then(setUrl);
  }, [name, trigger]);

  return (
    <>
      {url && "  обложка:"}
      {url && <Image src={url} alt={`preview of ${name}`} />}
    </>
  );
};

const Image = styled.img`
  width: 100px;
`;
