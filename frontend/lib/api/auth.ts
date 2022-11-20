const API_URL = 'https://iste432-backend.vercel.app';

async function authEmployee(bodyForm: { username: string; password: string }) {
  try {
    const res = await fetch(`${API_URL}/auth/employee`, {
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

async function authSocietyContact(bodyForm: {
  username: string;
  password: string;
}) {
  try {
    const res = await fetch(`${API_URL}/auth/societyContact`, {
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

async function authVoter(bodyForm: { cred_1: string; cred_2: string }) {
  try {
    const res = await fetch(`${API_URL}/auth/voter`, {
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
