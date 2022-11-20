const API_URL = 'https://iste432-backend.vercel.app';

async function createSociety(
  token: string,
  bodyForm: {
    name: string;
  },
) {
  try {
    const res = await fetch(`${API_URL}/society`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyForm),
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

async function editSociety(
  token: string,
  societyId: number,
  bodyForm: {
    name: string;
  },
) {
  try {
    const res = await fetch(`${API_URL}/society/${societyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyForm),
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

async function deleteSociety(token: string, societyId: number) {
  try {
    const res = await fetch(`${API_URL}/society/${societyId}`, {
      method: 'DELETE',
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

async function getSociety(token: string, societyId: number) {
  try {
    const res = await fetch(`${API_URL}/society/${societyId}`, {
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

async function getSocieties(token: string) {
  try {
    const res = await fetch(`${API_URL}/society`, {
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

export { createSociety, editSociety, deleteSociety, getSociety, getSocieties };
