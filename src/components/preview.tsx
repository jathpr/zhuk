import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

export const Preview = ({
  name,
  getPreview,
  trigger,
  width,
}: {
  name?: string;
  getPreview: (name: string) => Promise<any>;
  trigger: number;
  width?: string;
}) => {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    name && getPreview(name).then(setUrl);
  }, [name, trigger]);

  return (
    <>
      {/* {url && "  обложка:"} */}
      {url && <Image src={url} alt={`preview of ${name}`} width={width} />}
    </>
  );
};

const Image = styled.img<{ width?: string }>`
  float: left;
  width: ${({ width }) => width || "100px"};
  margin-right: 2rem;
  margin-bottom: 2rem;
`;
