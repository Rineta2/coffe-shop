import { supabase } from "../../../../utils/supabase/supabase";

import imagekitInstance from "../../../../utils/imagekit/imagekit";

import { HomeContent } from "@/hooks/dashboard/home/types/home";

const handleImageUpload = async (file: File) => {
  try {
    const reader = new FileReader();

    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const base64 = await base64Promise;
    const result = await imagekitInstance.upload({
      file: base64,
      fileName: `home-content-${Date.now()}`,
      folder: "/home-contents",
    });

    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export const createHomeContent = async (data: HomeContent, image: File) => {
  try {
    // Upload image to ImageKit using base64
    const imageUrl = await handleImageUpload(image);

    // Create content in Supabase
    const { data: content, error } = await supabase
      .from(process.env.NEXT_PUBLIC_HOME as string)
      .insert([
        {
          title: data.title,
          description: data.description,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return content;
  } catch (error) {
    throw error;
  }
};

export const getHomeContents = async () => {
  try {
    const { data, error } = await supabase
      .from(process.env.NEXT_PUBLIC_HOME as string)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((item) => ({
      ...item,
      imageUrl: item.image_url,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  } catch (error) {
    throw error;
  }
};

export const updateHomeContent = async (
  id: string,
  data: HomeContent,
  image?: File
) => {
  try {
    let imageUrl = data.imageUrl;

    if (image) {
      // Upload new image to ImageKit using base64
      imageUrl = await handleImageUpload(image);
    }

    // Update content in Supabase
    const { data: content, error } = await supabase
      .from(process.env.NEXT_PUBLIC_HOME as string)
      .update({
        title: data.title,
        description: data.description,
        image_url: imageUrl,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return content;
  } catch (error) {
    throw error;
  }
};

export const deleteHomeContent = async (id: string) => {
  try {
    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_HOME as string)
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    throw error;
  }
};
