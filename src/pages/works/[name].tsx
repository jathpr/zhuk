import * as React from "react";
import { Link, navigate } from "gatsby";
import { useEffect, useState } from "react";
import { getWork } from "../../server/works";
import styled from "@emotion/styled";

const Image = ({ params: { name } }: { params: { name: string } }) => {
  const [coverUrl, setCoverUrl] = useState<string>();
  useEffect(() => {
    getWork(name).then(setCoverUrl);
    document.body.style.background = "black";
    return () => {
      document.body.style.background = "white";
    };
  }, [name]);

  return (
    <Wrapper
      className="wrapper"
      onClick={() => {
        navigate("/works");
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
