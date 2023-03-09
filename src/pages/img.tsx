import React from "react";
import FileUpload from "../components/fileUpload";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { uploadWork } from "../server/works";

const ImagePage = () => (
  <>
    <Header />
    <FileUpload addText="Выбрать фото" uploadFile={uploadWork} />
    <Footer />
  </>
);

export default ImagePage;
