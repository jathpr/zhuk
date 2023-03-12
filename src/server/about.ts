import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref as dbRef,
  child,
  get,
  update,
} from "firebase/database";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const storage = getStorage();
const db = getDatabase();

const PATH = "about";

getAuth(app);

type PropsFile = {
  file: File;
  name?: string;
};

export const uploadAboutCover = async ({ file, name = "cover" }: PropsFile) => {
  const snapshot = await uploadBytes(ref(storage, `${PATH}/${name}`), file);
  return snapshot;
};

export const getAboutCover = async (name: string = "cover") => {
  try {
    return await getDownloadURL(ref(storage, `${PATH}/${name}`));
  } catch (error) {
    return;
  }
};

type Data = {
  name?: string;
  body: [{ key: string; value: string }];
};

export const sendAboutData = async ({ body }: Data) => {
  const sendBody: any = {};
  body.forEach(({ key, value }) => (sendBody[key] = value));
  update(dbRef(db, `${PATH}`), sendBody);
};

export const readAboutData = async (path: string) => {
  const db = dbRef(getDatabase());
  try {
    const snapshot = await get(child(db, `${PATH}/${path}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};
