"use client"

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/utils/context/AuthContext';
import { supabase } from '@/utils/supabase/supabase';
import Image from 'next/image';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import ProfileSkelaton from '@/hooks/dashboard/profile/ProfileSkelaton';
import { UserCog, Eye, EyeOff } from 'lucide-react';
import imagekitInstance from '@/utils/imagekit/imagekit';
import { z } from 'zod';

interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    photo_url?: string | null;
    role: string;
    created_at: string;
    updated_at: string;
}

export default function ProfileContent() {
    const { user, changePassword } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const passwordSchema = z.object({
        newPassword: z.string().min(6, 'Password minimal 6 karakter'),
        confirmNewPassword: z.string(),
    }).refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Password baru dan konfirmasi tidak sama',
        path: ['confirmNewPassword'],
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user?.id) return;

            try {
                const { data, error } = await supabase
                    .from(process.env.NEXT_PUBLIC_PROFILES as string)
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    setError('User profile not found');
                    return;
                }

                setProfile(data);
            } catch {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user?.id]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id || !editedProfile) return;
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from(process.env.NEXT_PUBLIC_PROFILES as string)
                .update({
                    full_name: editedProfile.full_name,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);
            if (error) throw error;
            setProfile(editedProfile);
            setIsEditing(false);
            toast.success('Profil berhasil diperbarui');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
            toast.error('Gagal memperbarui profil');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !user?.id) return;

        setUploadingImage(true);
        try {
            const file = e.target.files[0];

            // Upload to ImageKit
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const base64 = await base64Promise;
            const result = await imagekitInstance.upload({
                file: base64,
                fileName: `profile-${user.id}-${Date.now()}`,
                folder: "/profile-images",
            });

            // Update profile with new image URL
            const { error: updateError } = await supabase
                .from(process.env.NEXT_PUBLIC_PROFILES as string)
                .update({ photo_url: result.url })
                .eq('id', user.id);

            if (updateError) throw updateError;

            // Update local state
            setProfile(prev => prev ? { ...prev, photo_url: result.url } : null);
            if (editedProfile) {
                setEditedProfile({ ...editedProfile, photo_url: result.url });
            }
            toast.success('Foto profil berhasil diperbarui');
        } catch (err) {
            console.error('Error uploading image:', err);
            setError('Failed to upload image');
            toast.error('Gagal mengupload foto');
        } finally {
            setUploadingImage(false);
        }
    };

    const formatTimestamp = (timestamp: string) => {
        if (!timestamp) return '-';
        return format(new Date(timestamp), 'dd MMMM yyyy, HH:mm:ss', { locale: id });
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError(null);
        const result = passwordSchema.safeParse({ newPassword, confirmNewPassword });
        if (!result.success) {
            const error = result.error.errors[0];
            setPasswordError(error.message);
            toast.error(error.message);
            return;
        }
        setChangingPassword(true);
        const success = await changePassword(newPassword);
        setChangingPassword(false);
        if (success) {
            setShowPasswordFields(false);
            setNewPassword('');
            setConfirmNewPassword('');
        }
    };

    if (loading) {
        return <ProfileSkelaton />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!profile) {
        return <div>No profile data available</div>;
    }

    return (
        <section
            className="min-h-full"
        >
            <div
                className="bg-white rounded-2xl border border-gray-300 p-6 mb-8"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Profil Saya
                        </h1>
                        <p className='text-gray-500'>Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
                    </div>

                    {!isEditing && (
                        <button
                            onClick={handleEdit}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit Profil
                        </button>
                    )}
                </div>
            </div>

            <div
                className="bg-white rounded-3xl border border-gray-300 backdrop-blur-xl p-8"
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left side - Profile Image */}
                        <div
                            className="flex flex-col items-center space-y-8 order-1 lg:order-2"
                        >
                            <div className="relative group">
                                <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-indigo-50 shadow-xl">
                                    {profile.photo_url ? (
                                        <Image
                                            src={profile.photo_url}
                                            alt="Profile"
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                            <UserCog className="w-16 h-16 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-center w-full">
                                {isEditing && (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="profile-image-upload"
                                            disabled={uploadingImage}
                                        />
                                        <label
                                            htmlFor="profile-image-upload"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 
                                                rounded-xl hover:bg-indigo-50 transition-all duration-300 font-medium 
                                                border-2 border-indigo-100 hover:border-indigo-200 shadow-sm
                                                active:scale-95"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {uploadingImage ? 'Mengupload...' : 'Ubah Foto'}
                                        </label>
                                    </>
                                )}
                                <p className="text-sm text-gray-500 mt-4">
                                    Ukuran gambar: maks. 1 MB
                                    <br />
                                    Format gambar: JPEG, PNG
                                </p>
                            </div>
                        </div>

                        {/* Right side - Form Fields */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <div className="space-y-6">
                                {[
                                    {
                                        label: 'Nama',
                                        name: 'full_name',
                                        value: isEditing ? editedProfile?.full_name : profile.full_name,
                                        type: 'text'
                                    },
                                    {
                                        label: 'Email',
                                        value: profile.email,
                                        readOnly: true
                                    },
                                    {
                                        label: 'Member Sejak',
                                        value: formatTimestamp(profile.created_at),
                                        readOnly: true
                                    }
                                ].map((field, index) => (
                                    <div
                                        key={index}
                                        className="group p-6 bg-gray-50/50 rounded-2xl hover:bg-white transition duration-300 \
                                            hover:shadow-lg hover:shadow-gray-100/50 border border-gray-100"
                                    >
                                        <label className="text-sm font-medium text-gray-600 block mb-2">{field.label}</label>
                                        <div className="mt-1">
                                            {isEditing && !field.readOnly ? (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={field.value || ''}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 \
                                                        focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200\
                                                        hover:border-indigo-300"
                                                    placeholder={`Masukkan ${field.label}`}
                                                />
                                            ) : (
                                                <p className="text-gray-800 text-lg">{field.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Ganti Sandi Section */}
                                {isEditing && (
                                    <div
                                        className="group p-6 bg-gray-50/50 rounded-2xl hover:bg-white transition duration-300 hover:shadow-lg hover:shadow-gray-100/50 border border-gray-100"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-600">Ganti Sandi</label>
                                            <button
                                                type="button"
                                                className="text-indigo-600 hover:underline text-sm"
                                                onClick={() => setShowPasswordFields(v => !v)}
                                            >
                                                {showPasswordFields ? 'Tutup' : 'Ganti Sandi'}
                                            </button>
                                        </div>
                                        {showPasswordFields && (
                                            <div className="space-y-4 mt-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Password Baru</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showNewPassword ? "text" : "password"}
                                                            className={`w-full p-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300 ${passwordError && passwordError.includes('karakter') ? 'border-red-400' : 'border-gray-200'}`}
                                                            value={newPassword}
                                                            onChange={e => setNewPassword(e.target.value)}
                                                            placeholder="Masukkan password baru"
                                                            disabled={changingPassword}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowNewPassword(v => !v)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            tabIndex={-1}
                                                        >
                                                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Konfirmasi Password Baru</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showConfirmNewPassword ? "text" : "password"}
                                                            className={`w-full p-3 bg-white border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300 ${passwordError && passwordError.includes('tidak sama') ? 'border-red-400' : 'border-gray-200'}`}
                                                            value={confirmNewPassword}
                                                            onChange={e => setConfirmNewPassword(e.target.value)}
                                                            placeholder="Konfirmasi password baru"
                                                            disabled={changingPassword}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmNewPassword(v => !v)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            tabIndex={-1}
                                                        >
                                                            {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                        </button>
                                                    </div>
                                                </div>
                                                {passwordError && (
                                                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={handlePasswordChange}
                                                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 font-medium shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-95 disabled:opacity-70"
                                                    disabled={changingPassword}
                                                >
                                                    {changingPassword ? 'Menyimpan...' : 'Simpan Password'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedProfile(null);
                                }}
                                className="px-8 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium border-2 border-gray-200 hover:border-gray-300 active:scale-95"
                                disabled={isSaving}
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 font-medium shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-95 disabled:opacity-70"
                                disabled={isSaving}
                            >
                                {isSaving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}