import { Config } from '#/config';

export type AuthAdmin = {
  username: string;
  password: string;
};

async function authEmployee(bodyForm: AuthAdmin) {
  try {
    const res = await fetch(`${Config.API_URL}/auth/employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

async function authSocietyContact(bodyForm: AuthAdmin) {
  try {
    const res = await fetch(`${Config.API_URL}/auth/societyContact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export type AuthVoter = {
  cred_1: string;
  cred_2: string;
};

async function authVoter(bodyForm: AuthVoter) {
  try {
    const res = await fetch(`${Config.API_URL}/auth/voter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export { authEmployee, authSocietyContact, authVoter };
