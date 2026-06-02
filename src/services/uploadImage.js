// src/services/uploadImage.js
import { supabase } from "../lib/supabase";

export const uploadProductImage =
  async (file) => {

    try {

      const fileExt =
        file.name.split(".").pop();

      const fileName =
        `${Date.now()}.${fileExt}`;

      const filePath =
        `products/${fileName}`;

      const { error } =
        await supabase.storage
          .from("products")
          .upload(filePath, file);

      if (error) {

        console.log(
          "SUPABASE UPLOAD ERROR:",
          error
        );

        throw error;
      }

      const { data: publicUrlData } =
        supabase.storage
          .from("products")
          .getPublicUrl(filePath);

      return publicUrlData.publicUrl;

    } catch (error) {

      console.log(
        "UPLOAD FUNCTION ERROR:",
        error
      );

      return null;
    }
  };


  
export const deleteProductImage = async (
  imageUrl
) => {
  try {
    if (!imageUrl) return true;

    // Extract file path from URL
    const url = new URL(imageUrl);

    const path = decodeURIComponent(
      url.pathname.split("/storage/v1/object/public/products/")[1]
    );

    if (!path) return false;

    const { error } =
      await supabase.storage
        .from("products")
        .remove([path]);

    if (error) {
      console.error(
        "DELETE IMAGE ERROR:",
        error
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "DELETE IMAGE ERROR:",
      error
    );
    return false;
  }
};