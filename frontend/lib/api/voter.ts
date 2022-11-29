import { Config } from '#/config';

async function createVoter(
  token: string,
  bodyForm: {
    firstName: string;
    lastName: string;
    credential_1: string;
    credential_2: string;
    dateOfBirth: string;
    societyId: number;
  },
) {
  try {
    const res = await fetch(`${Config.API_URL}/voter`, {
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

async function editVoter(
  token: string,
  voterId: number,
  bodyForm: {
    firstName: string;
    lastName: string;
    credential_1: string;
    dateOfBirth: string;
    societyId: number;
  },
) {
  try {
    const res = await fetch(`${Config.API_URL}/voter/${voterId}`, {
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

async function deleteVoter(token: string, voterId: number) {
  try {
    const res = await fetch(`${Config.API_URL}/voter/${voterId}`, {
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

async function getVoter(token: string, voterId: number) {
  try {
    const res = await fetch(`${Config.API_URL}/voter/${voterId}`, {
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

async function getVoters(token: string) {
  try {
    const res = await fetch(`${Config.API_URL}/voter`, {
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

export { createVoter, editVoter, deleteVoter, getVoter, getVoters };
