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
