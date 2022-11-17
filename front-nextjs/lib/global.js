class GlobalServices {
  constructor() {}
  // User Token
  static getUserToken() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('userToken')
  }
  static setUserToken(userToken) {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('userToken', userToken)
  }

  // Voter Role
  static getVoterRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role') === 'voter'
  }
  static setVoterRole() {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('role', 'voter')
  }
  // Society Contact Role
  static getSocietyContactRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role') === 'societyContact'
  }
  static setSocietyContactRole() {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('role', 'societyContact')
  }

  // Employee Role
  static getEmployeeRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role') === 'employee'
  }
  static setEmployeeRole() {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('role', 'employee')
  }

  static getRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role')
  }

  static getAuthorizationHeader() {
    if (typeof window !== 'undefined')
      return {
        Authorization: `Bearer ${this.getUserToken()}`,
      }
  }
}

export default GlobalServices
