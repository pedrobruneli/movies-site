import {ILike} from "../models/likes.model";
import {app} from "../app";
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
const likesCollection = collection(db, "likes");

exports.getLikes = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const data = await getDocs(likesCollection);
  const likes = {};
  if (data.empty) {
    res.status(200).send(likes);
    return;
  }
  data.forEach((item) =>
    Object.assign(likes, {[item.id]: {likes: item.data().likes}})
  );
  res.status(200).send(likes);
});

exports.removeLike = functions.https.onCall(async (res) => {
  if (!res) {
    return;
  }
  const movieDoc = doc(db, "likes", `${res.id}`);
  await getDoc(movieDoc).then(async (docRes) => {
    const data = docRes.data() as ILike;
    if (!data) {
      throw new Error("Nao encontrado");
    } else {
      updateDoc(movieDoc, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        likes: (data as ILike).likes! - 1,
      });
    }
  });
});

exports.addLike = functions.https.onCall(async (res) => {
  if (!res) {
    return;
  }
  const movieDoc = doc(db, "likes", `${res.id}`);
  await getDoc(movieDoc).then(async (docRes) => {
    const data = docRes.data() as ILike;
    if (!data) {
      await setDoc(movieDoc, {likes: 1});
    } else {
      updateDoc(
          movieDoc,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          {likes: data.likes! + 1}
      );
    }
  });
});
