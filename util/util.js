import { config } from 'dotenv';

config();

export async function getData(url) {
  try {
    const response = await fetch(
      url, 
      { headers: { 'Cookie': process.env.SESSION_COOKIE } }
    );

    if (!response.ok) {
      throw "Error getting input";
    }

    return  await response.text();
  } catch (e) {
    console.log(e);
    throw("");
  }
}