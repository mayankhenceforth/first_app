import axios from "axios";

export async function getAllCategory(): Promise<any> {
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/api/category/allcategory`);
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
