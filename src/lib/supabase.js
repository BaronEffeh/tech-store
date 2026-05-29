import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);



// import { createClient } from "@supabase/supabase-js";

// // const supabaseUrl = "NEXT_PUBLIC_SUPABASE_URL=https://bvjswrrktolwenikielc.supabase.co";
// const supabaseUrl = "https://bvjswrrktolwenikielc.supabase.co";
// // const supabaseAnonKey = "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sAo9ssYHTmyuxV8Eddh7uA_qDiUG-LK";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2anN3cnJrdG9sd2VuaWtpZWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTU5ODUsImV4cCI6MjA5NTM3MTk4NX0.o1Q3jaI4TofUTyYNDLgNrhueB0F7I8yuTK-7TCMnM-Y";

// export const supabase = createClient(
//   supabaseUrl,
//   supabaseAnonKey
// );