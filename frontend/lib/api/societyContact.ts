import { Config } from '#/config';

async function createSocietyContact(
  token: string,
  bodyForm: {
    username: string;
    password: string;
    societyId: number;
  },
) {
  try {
    const res = await fetch(`${Config.API_URL}/societyContact`, {
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

async function editSocietyContact(
  token: string,
  societyContactId: number,
  bodyForm: {
    username: string;
    password: string;
    societyId: number;
  },
) {
  try {
    const res = await fetch(
      `${Config.API_URL}/societyContact/${societyContactId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyForm),
      },
    );
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

async function deleteSocietyContact(token: string, societyContactId: number) {
  try {
    const res = await fetch(
      `${Config.API_URL}/societyContact/${societyContactId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

async function getSocietyContact(token: string, societyContactId: number) {
  try {
    const res = await fetch(
      `${Config.API_URL}/societyContact/${societyContactId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

async function getSocietyContacts(token: string) {
  try {
    const res = await fetch(`${Config.API_URL}/societyContact`, {
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

export {
  createSocietyContact,
  editSocietyContact,
  deleteSocietyContact,
  getSocietyContact,
  getSocietyContacts,
};
