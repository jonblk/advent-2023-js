import { config } from 'dotenv';

config();

export async function getData(day) {
  try {
    const response = await fetch(
      `https://adventofcode.com/2023/day/${day}/input`,
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