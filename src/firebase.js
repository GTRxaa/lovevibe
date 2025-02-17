import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Импорт для работы с Firebase Storage

// Firebase конфигурация
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Инициализация Firestore
const storage = getStorage(app); // Инициализация Firebase Storage

// Авторизация через Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Пользователь вошел:", result.user);
  } catch (error) {
    console.error("Ошибка входа:", error);
  }
};

// Регистрация с email и паролем
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Пользователь зарегистрирован:", userCredential.user);
    await createUserProfile(userCredential.user); // Создаем профиль в Firestore
  } catch (error) {
    console.error("Ошибка регистрации:", error);
  }
};

// Вход с email и паролем
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Пользователь вошел:", userCredential.user);
  } catch (error) {
    console.error("Ошибка входа:", error);
  }
};

// Выход
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Пользователь вышел");
  } catch (error) {
    console.error("Ошибка выхода:", error);
  }
};

// Функция для создания профиля пользователя в Firestore
const createUserProfile = async (user) => {
  try {
    const userDoc = doc(db, "users", user.uid); // Ссылка на документ пользователя
    await setDoc(userDoc, {
      name: user.displayName || "Без имени",
      email: user.email,
      photoURL: user.photoURL || "",
      createdAt: new Date(),
    });
    console.log("Профиль пользователя сохранен в Firestore");
  } catch (error) {
    console.error("Ошибка создания профиля в Firestore:", error);
  }
};

// Функция для обновления профиля пользователя в Firestore
export const updateUserProfile = async (uid, profileData) => {
  try {
    const userDoc = doc(db, "users", uid);
    await setDoc(userDoc, profileData, { merge: true });
    console.log("Профиль обновлен в Firestore");
  } catch (error) {
    console.error("Ошибка при обновлении профиля в Firestore:", error);
  }
};

// Функция для получения данных профиля пользователя из Firestore
export const getUserProfile = async (uid) => {
  try {
    const userDoc = doc(db, "users", uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data(); // Возвращаем данные профиля пользователя
    } else {
      console.log("Нет данных для этого пользователя");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении профиля пользователя из Firestore:", error);
  }
};

// Функция для загрузки фотографии в Firebase Storage
export const uploadPhotoToStorage = async (file, userId) => {
  const storageRef = ref(storage, `profile_pictures/${userId}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  return photoURL;
};

export { auth, db, storage };
