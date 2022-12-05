import { Config } from '#/config';

async function getStat(token: string) {
  try {
    const res = await fetch(`${Config.API_URL}/analysis/stat`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export { getStat };
