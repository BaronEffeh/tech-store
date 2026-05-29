// src/firebase/storage.js
import { supabase } from '../lib/supabase';

export const uploadProductImage =
  async (file) => {

    try {

      const fileExt =
        file.name.split('.').pop();

      const fileName =
        `${Date.now()}.${fileExt}`;

      const filePath =
        `products/${fileName}`;

      const { data, error } =
        await supabase.storage
          .from('products')
          .upload(filePath, file);

      if (error) {

        console.log(
          'SUPABASE UPLOAD ERROR:',
          error
        );

        throw error;
      }

      const { data: publicUrlData } =
        supabase.storage
          .from('products')
          .getPublicUrl(filePath);

      return publicUrlData.publicUrl;

    } catch (error) {

      console.log(
        'UPLOAD FUNCTION ERROR:',
        error
      );

      return null;
    }
  };





// import {
//   ref,
//   uploadBytes,
//   getDownloadURL
// } from "firebase/storage";

// import { storage } from "./config";



// export const uploadProductImage =
//   async (file) => {

//     const fileName =
//       `${Date.now()}-${file.name}`;

//     const storageRef = ref(
//       storage,
//       `products/${fileName}`
//     );

//     const snapshot =
//       await uploadBytes(
//         storageRef,
//         file
//       );

//     return await getDownloadURL(
//       snapshot.ref
//     );
// };