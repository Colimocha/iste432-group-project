const API_URL = 'https://iste432-backend.vercel.app';

async function createEmployee(
  token: string,
  bodyForm: {
    username: string;
    password: string;
  },
) {
  try {
    const res = await fetch(`${API_URL}/employee`, {
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

async function editEmployee(
  token: string,
  employeeId: number,
  bodyForm: {
    username: string;
    password: string;
  },
) {
  try {
    const res = await fetch(`${API_URL}/employee/${employeeId}`, {
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

async function deleteEmployee(token: string, employeeId: number) {
  try {
    const res = await fetch(`${API_URL}/employee/${employeeId}`, {
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

async function getEmployee(token: string, employeeId: number) {
  try {
    const res = await fetch(`${API_URL}/employee/${employeeId}`, {
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

async function getEmployees(token: string) {
  try {
    const res = await fetch(`${API_URL}/employee`, {
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
  createEmployee,
  editEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
};
