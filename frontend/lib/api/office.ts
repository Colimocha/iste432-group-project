const API_URL = 'https://iste432-backend.vercel.app';

async function createOffice(
  token: string,
  bodyForm: {
    name: string;
    ballotId: number;
  },
) {
  try {
    const res = await fetch(`${API_URL}/office`, {
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

async function editOffice(
  token: string,
  officeId: number,
  bodyForm: {
    name: string;
    ballotId: number;
  },
) {
  try {
    const res = await fetch(`${API_URL}/office/${officeId}`, {
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

async function deleteOffice(token: string, officeId: number) {
  try {
    const res = await fetch(`${API_URL}/office/${officeId}`, {
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

async function getOffices(token: string) {
  try {
    const res = await fetch(`${API_URL}/office`, {
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

async function getOffice(token: string, officeId: number) {
  try {
    const res = await fetch(`${API_URL}/office/${officeId}`, {
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

export { createOffice, editOffice, deleteOffice, getOffices, getOffice };
