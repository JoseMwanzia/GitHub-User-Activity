#!/usr/bin/env node
const fetchedUser =  async (username) => {
  const response  = await fetch(`https://api.github.com/users/${username}/events`, {
    headers: {'Accept': 'application/vnd.github+json'}
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found. Please check the username.")
    } 
    else {
      throw new Error(`Error fetching data: ${response.status}`)
    }
  }

  return response.json()
}
