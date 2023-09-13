import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(" cabins");
    throw new Error("error cabins");
  }
  return data;
}
export async function createEditCabin(cabin, id) {
  console.log(cabin, id);
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath, "sdfsdfsfsdfds");
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  /*create cabin*/
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);
  /* Edit*/
  if (id)
    query = query
      .update({ ...cabin, image: imagePath })
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();
  if (error) {
    console.log(" cabins");
    throw new Error("error cabins");
  }

  if (hasImagePath) return data;
  const { errorUpload } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (errorUpload) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(errorUpload);
    throw new Error("image err");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("error delete cabins");
  }
  console.log(data);
  return data;
}
