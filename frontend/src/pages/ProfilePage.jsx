import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Save } from "lucide-react";
import axios from "axios";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(authUser?.profilePic || null);
  const [previewImg, setPreviewImg] = useState(authUser?.profilePic || null);
  const [form, setForm] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreviewImg(reader.result);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setSelectedImg(res.data.secure_url);
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile({
      fullName: form.fullName,
      email: form.email,
      profilePic: selectedImg,
    });
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4">
      <div className="max-w-2xl mx-auto py-10">
        <div className="bg-base-200 p-8 rounded-3xl shadow-2xl border border-base-300 space-y-10 transition-all">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary tracking-tight">Edit Profile</h1>
            <p className="text-sm text-base-content/70 mt-1">Update your profile details below</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <img
                src={previewImg || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-primary shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""
                }`}
              >
                <Camera className="w-4 h-4 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Uploading..." : "Click to change photo"}
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-6">
            <div>
              <label className="text-sm text-zinc-400 flex items-center gap-2 mb-1">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
              onClick={handleSave}
              className="btn btn-primary mt-4 gap-2 shadow-lg hover:scale-105 transition-transform"
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Account Info */}
          <div className="bg-base-100 border border-base-300 rounded-xl p-5 mt-6 shadow-inner">
            <h2 className="text-lg font-semibold mb-3 text-primary">Account Info</h2>
            <div className="text-sm text-base-content/80 space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span>Member Since</span>
                <span className="font-medium">{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
