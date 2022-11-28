const API_URL = 'https://iste432-backend.vercel.app';

async function createBallot(
  token: string,
  bodyForm: {
    name: string;
    allowWriteIn: boolean;
    societyId: number;
  },
) {
  try {
    const res = await fetch(`${API_URL}/ballot`, {
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

async function editBallot(
  token: string,
  ballotId: number,
  bodyForm: {
    name: string;
    allowWriteIn: boolean;
    societyId: number;
  },
) {
  try {
    const res = await fetch(`${API_URL}/ballot/${ballotId}`, {
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

async function deleteBallot(token: string, ballotId: number) {
  try {
    const res = await fetch(`${API_URL}/ballot/${ballotId}`, {
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

async function getBallot(token: string, ballotId: number) {
  try {
    const res = await fetch(`${API_URL}/ballot/${ballotId}`, {
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

async function getBallots(token: string) {
  try {
    const res = await fetch(`${API_URL}/ballot`, {
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

async function getBallotsBySocietyID(token: string, societyId: number) {
  try {
    const res = await fetch(`${API_URL}/ballot/society/${societyId}`, {
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
  createBallot,
  editBallot,
  deleteBallot,
  getBallot,
  getBallots,
  getBallotsBySocietyID,
};
