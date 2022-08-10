import {ILike} from "./models/likes.model";
import {app} from "./app";
import * as functions from "firebase-functions";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(app);

export const getLikes = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const data = await getDocs(collection(db, "likes"));
  const likes = {};
  data.forEach((item) =>
    Object.assign(likes, {[item.id]: {likes: item.data().likes}})
  );
  res.status(200).send(likes);
});

exports.removeLike = functions.https.onCall(async (data) => {
  if (!data) {
    return;
  }
  await getDoc(doc(db, "likes", `${data.id}`)).then(async (docRes) => {
    if (!docRes.data()) {
      throw new Error("Nao encontrado");
    } else {
      updateDoc(doc(db, "likes", `${data.id}`), {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        likes: (docRes.data() as ILike).likes! - 1,
      });
    }
  });
});

exports.addLike = functions.https.onCall(async (data) => {
  if (!data) {
    return;
  }
  await getDoc(doc(db, "likes", `${data.id}`)).then(async (docRes) => {
    if (!docRes.data()) {
      await setDoc(doc(db, "likes", `${data.id}`), {likes: 1});
    } else {
      updateDoc(
          doc(db, "likes", `${data.id}`),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          {likes: (docRes.data() as ILike).likes! + 1}
      );
    }
  });
});
