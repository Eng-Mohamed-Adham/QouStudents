import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { FaSave } from "react-icons/fa";
// استيراد ملف الصوت
import sound1 from '../../components/sound2.mp3';  // قم بتعديل المسار بناءً على مكان ملف الصوت
import sound2 from '../../components/sound3.mp3'

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Manager"]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

   // دالة لتشغيل الصوت
   const playSound = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setPassword("");
      setRoles([]);
      setImage("");
      setImagePreview(null);
      navigate("/dash/users");
      playSound(sound1)
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setRoles(values);
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
    
    // Check file size (limit to 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB. Please upload a smaller image.");
      return;
    }
    
    // Check file type
    if (file && !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    
    const base64 = await convertToBase64(file);
    setImage(base64);
    setImagePreview(URL.createObjectURL(file)); // Show image preview
  };

  const canSave = [roles.length, validName, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ name, password, roles, image });
    }
  };

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  const errClass = isError ? "text-red-500 text-center mb-4" : "hidden";
  const validUserClass = !validName ? "border-red-500" : "";
  const validPwdClass = !validPassword ? "border-red-500" : "";
  const validRolesClass = !roles.length ? "border-red-500" : "";

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-lg">
      <p className={errClass}>{error?.data?.message}</p>
      <h3 className="text-2xl font-bold text-center mb-6">New User</h3>
      <form onSubmit={onSaveUserClicked} className="space-y-4">
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

        {imagePreview && (
          <img src={imagePreview} alt="Image Preview" className="w-full h-auto mt-4 rounded-lg" />
        )}

        <select
          multiple={true}
          id="roles"
          value={roles}
          onChange={onRolesChanged}
          className={`w-full p-2 border ${validRolesClass} rounded-lg`}
        >
          {options}
        </select>

        <button
          type="submit"
          disabled={!canSave}
          className={`w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${
            !canSave && "opacity-50 cursor-not-allowed"
          }`}
        >
          <FaSave /> Save
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
