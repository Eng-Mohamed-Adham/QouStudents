import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { FaSave } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';  // إضافة مكتبة toast
import 'react-toastify/dist/ReactToastify.css';  // استيراد CSS الخاص بالمكتبة

// استيراد ملف الصوت
import sound1 from '../../components/sound2.mp3';  // قم بتعديل المسار بناءً على مكان ملف الصوت
import sound2 from '../../components/sound3.mp3'


const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] =
    useDeleteUserMutation();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // دالة لتشغيل الصوت
  const playSound = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      playSound(sound1);  // تشغيل صوت النجاح
      toast.success('User updated successfully');  // إشعار نجاح عند تحديث المستخدم
      setName("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
    if (isDelSuccess) {
      playSound(sound2);  // تشغيل صوت النجاح عند الحذف
      toast.success('User deleted successfully');  // إشعار نجاح عند حذف المستخدم
      setName("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(`Error updating user: ${error?.data?.message}`);  // إشعار خطأ عند فشل التحديث
    }
    if (isDelError) {
      toast.error(`Error deleting user: ${delerror?.data?.message}`);  // إشعار خطأ عند فشل الحذف
    }
  }, [isError, isDelError, error, delerror]);

  const onNameChanged = (e) => setName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setRoles(values);
  };

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, name, password, roles, image });
    } else {
      await updateUser({ id: user.id, name, roles, image });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  // Convert image file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return; // التحقق من وجود الملف

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB. Please upload a smaller image.");  // إشعار خطأ عند تجاوز الحجم
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");  // إشعار خطأ عند رفع نوع غير الصورة
      return;
    }

    const base64 = await convertToBase64(file);
    setImage(base64);
    setImagePreview(URL.createObjectURL(file)); // Show image preview
  };

  let canSave;
  if (password) {
    canSave = [roles.length > 0, validName, validPassword, image].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length > 0, validName].every(Boolean) && !isLoading;
  }

  const validUserClass = !validName ? "border-red-500" : "";
  const validPwdClass = password && !validPassword ? "border-red-500" : "";
  const validRolesClass = !roles.length ? "border-red-500" : "";

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold text-center mb-6">Edit User</h3>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={onNameChanged}
          className={`w-full p-2 border ${validUserClass} rounded-lg`}
          autoComplete="off"
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChanged}
          className={`w-full p-2 border ${validPwdClass} rounded-lg`}
        />

        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full p-2 border rounded-lg"
        />

        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-auto mt-4" />} {/* عرض معاينة الصورة */}

        <select
          multiple={true}
          id="roles"
          value={roles}
          onChange={onRolesChanged}
          className={`w-full p-2 border ${validRolesClass} rounded-lg`}
        >
          {Object.values(ROLES).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button
          type="submit"
          onClick={onSaveUserClicked}
          disabled={!canSave}
          className={`w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${
            !canSave && "opacity-50 cursor-not-allowed"
          }`}
        >
          <FaSave /> Save
        </button>

        <button
          type="button"
          onClick={onDeleteUserClicked}
          className="w-full p-3 mt-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <FaTrashAlt /> Delete
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
