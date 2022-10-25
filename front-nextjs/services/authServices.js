import GlobalServices from './globalServices'

const url = 'https://backend-psi-ten.vercel.app'

class AuthServices {
  static async authVoter(obj) {
    try {
      const response = await fetch(url + '/auth/voter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      if (response.ok) {
        const responseJson = await response.json()
        GlobalServices.setUserToken(responseJson.access_token)
        GlobalServices.setVoterRole()
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }

  static async authDashboard(obj) {
    try {
      const role = obj.role
      const response = await fetch(
        url +
          (role === 'societyContact'
            ? '/auth/societycontact'
            : '/auth/employee'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        }
      )
      if (response.ok) {
        const responseJson = await response.json()
        GlobalServices.setUserToken(responseJson.access_token)
        role === 'societyContact'
          ? GlobalServices.setSocietyContactRole()
          : GlobalServices.setEmployeeRole()
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default AuthServices
