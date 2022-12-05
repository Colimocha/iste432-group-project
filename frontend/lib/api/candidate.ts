import { Config } from '#/config';

async function createCandidate(
  token: string,
  bodyForm: {
    firstName: string;
    lastName: string;
    title: string;
    image: string;
    officeId: number;
    ballotId: number;
  },
) {
  try {
    const res = await fetch(`${Config.API_URL}/candidate`, {
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

async function editCandidate(
  token: string,
  candidateId: number,
  bodyForm: {
    firstName: string;
    lastName: string;
    title: string;
    image: string;
    officeId: number;
    ballotId: number;
  },
) {
  try {
    const res = await fetch(`${Config.API_URL}/candidate/${candidateId}`, {
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

async function deleteCandidate(token: string, candidateId: number) {
  try {
    const res = await fetch(`${Config.API_URL}/candidate/${candidateId}`, {
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

async function getCandidate(token: string, candidateId: number) {
  try {
    const res = await fetch(`${Config.API_URL}/candidate/${candidateId}`, {
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

async function getCandidates(token: string) {
  try {
    const res = await fetch(`${Config.API_URL}/candidate`, {
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
  createCandidate,
  editCandidate,
  deleteCandidate,
  getCandidate,
  getCandidates,
};
