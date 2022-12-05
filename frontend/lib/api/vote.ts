import { Config } from '#/config';

async function createVote(
  token: string,
  bodyForm: {
    voted: boolean;
    result: string;
    isWriteIn: boolean;
    ballotId: number;
  },
) {
  try {
    const res = await fetch(`${Config.API_URL}/vote`, {
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

async function editVote(
  token: string,
  voteId: number,
  bodyForm: {
    voted: boolean;
    result: string;
    isWriteIn: boolean;
    ballotId: number;
  },
) {
  try {
    const res = await fetch(`${Config.API_URL}/vote/${voteId}`, {
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

async function deleteVote(token: string, voteId: number) {
  try {
    const res = await fetch(`${Config.API_URL}/vote/${voteId}`, {
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

async function getVote(token: string, voteId: number) {
  try {
    const res = await fetch(`${Config.API_URL}/vote/${voteId}`, {
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

async function getVotes(token: string) {
  try {
    const res = await fetch(`${Config.API_URL}/vote`, {
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

export { createVote, editVote, deleteVote, getVote, getVotes };
