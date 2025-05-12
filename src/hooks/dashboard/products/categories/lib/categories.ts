import { supabase } from "@/utils/supabase/supabase";

import { CategoriesContent } from "@/hooks/dashboard/products/categories/types/categories";

export const createCategoriesContent = async (data: CategoriesContent) => {
  try {
    const { data: content, error } = await supabase
      .from(process.env.NEXT_PUBLIC_CATEGORIES as string)
      .insert([
        {
          title: data.title,
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

export const getCategoriesContents = async () => {
  try {
    const { data, error } = await supabase
      .from(process.env.NEXT_PUBLIC_CATEGORIES as string)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((item) => ({
      ...item,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  } catch (error) {
    throw error;
  }
};

export const updateCategoriesContent = async (
  id: string,
  data: CategoriesContent
) => {
  try {
    const { data: content, error } = await supabase
      .from(process.env.NEXT_PUBLIC_CATEGORIES as string)
      .update({
        title: data.title,
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

export const deleteCategoriesContent = async (id: string) => {
  try {
    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_CATEGORIES as string)
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    throw error;
  }
};
