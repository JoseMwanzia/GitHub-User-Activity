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
async function displayEvents(events, filtereEvent) {
  if (events.length === 0) {
    console.log('No recent activity!')
    return;
  }
  events.forEach((event) => {
    let commitCount;

    if (event.type === 'PushEvent') {
      commitCount = `Pushed ${event.payload.commits.length} to ${event.repo.name}`
    } else if (event.type === 'IssueEvent') {
      commitCount = `Issues events were ${event.payload.commits.length}`
    } else if (event.type === 'ForkEvent') {
      commitCount = `Fork events are ${event.payload.commits.length}`
    } else if (event.type === 'CreateEvent') {
      commitCount = `Create events are ${event.payload.ref_type}`
    } else {
      commitCount = `Not yet created event`;
    }
    console.log(commitCount)
  })
}

const username = process.argv[2];
const filtereEvent = process.argv[3];

if (!username) {
  console.error('Please provide a Github Username!')
  process.exit(1)
}

// process the data
fetchedUser(username)
  .then(events => {
    displayEvents(events, filtereEvent)
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
