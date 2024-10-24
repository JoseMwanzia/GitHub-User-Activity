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

  // console.log(await response.json())
  return response.json()
}

const events = await fetchedUser('josemwanzia')

events.forEach((event) => {
  if (event.length === 0) {
    console.log('No recent activity!')
    return;
  }

  if (event.type === 'PushEvent') {
    const pushEvents = event.payload.commits.length
    console.log(`Had ${pushEvents} push Events`)
  } else {
      
  }

})
