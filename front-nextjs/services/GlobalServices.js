class GlobalServices {
  constructor() {}
  // User Token
  getUserToken() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('userToken')
  }
  setUserToken(userToken) {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('userToken', userToken)
  }

  // Voter Role
  getVoterRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role') === 'voter'
  }
  setVoterRole() {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('role', 'voter')
  }
  // Society Contact Role
  getSocietyContactRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role') === 'societyContact'
  }
  setSocietyContactRole() {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('role', 'societyContact')
  }

  // Employee Role
  getEmployeeRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role') === 'employee'
  }
  setEmployeeRole() {
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem('role', 'employee')
  }

  getRole() {
    if (typeof window !== 'undefined')
      return window.sessionStorage.getItem('role')
  }
}

module.exports = GlobalServices
