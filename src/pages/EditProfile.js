import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../firebase";
import { useAuth } from "../context/AuthContext"; // (если используешь контекст для авторизации)
import { toast } from "react-toastify"; // Для уведомлений
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Для работы с Firebase Storage
import { getAuth, sendEmailVerification } from "firebase/auth"; // Для отправки email подтверждения

function EditProfile() {
  const { user } = useAuth(); // Получаем текущего пользователя из контекста
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });
  const [newPhoto, setNewPhoto] = useState(null);

  // Загружаем данные профиля при монтировании компонента
  useEffect(() => {
    if (user) {
      // Получаем данные пользователя из Firestore
      const fetchProfile = async () => {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setProfileData(userProfile);
        }
      };
      fetchProfile();
    }
  }, [user]);

  // Обработка изменений в полях формы
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // Обработка изменения фото
  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  // Обработка сохранения данных профиля
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Если фото изменено, загружаем его в Firebase Storage и обновляем профиль
      if (newPhoto) {
        const photoUrl = await uploadPhoto(newPhoto);
        await updateUserProfile(user.uid, { ...profileData, photoURL: photoUrl });
      } else {
        // Если фото не изменилось, обновляем только текстовые данные
        await updateUserProfile(user.uid, profileData);
      }
      toast.success("Профиль обновлен!");

      // Если email не подтвержден, отправляем email с подтверждением
      if (user && !user.emailVerified) {
        sendEmailVerification(user)
          .then(() => {
            toast.success("Подтверждение отправлено на почту");
          })
          .catch((error) => {
            toast.error("Ошибка при отправке подтверждения: " + error.message);
          });
      }
    } catch (error) {
      toast.error("Ошибка при обновлении профиля");
    }
  };

  // Функция для загрузки фото в Firebase Storage
  const uploadPhoto = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${user.uid}`); // Путь для хранения фото
    await uploadBytes(storageRef, file); // Загружаем файл
    const photoURL = await getDownloadURL(storageRef); // Получаем URL после загрузки
    return photoURL;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Редактирование профиля</h2>
      <form onSubmit={handleSave}>
        {/* Поле для имени */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Поле для email (только для отображения, без возможности редактирования) */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled
          />
        </div>

        {/* Поле для загрузки фото профиля */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Фото профиля
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Кнопка для сохранения изменений */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Сохранить изменения
        </button>
      </form>

      {/* Если email не подтвержден, показываем кнопку для повторной отправки подтверждения */}
      {user && !user.emailVerified && (
        <div className="mt-4">
          <button
            onClick={() =>
              sendEmailVerification(user)
                .then(() => toast.success("Подтверждение отправлено на почту"))
                .catch((error) =>
                  toast.error("Ошибка при отправке подтверждения: " + error.message)
                )
            }
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Отправить подтверждение на email
          </button>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
