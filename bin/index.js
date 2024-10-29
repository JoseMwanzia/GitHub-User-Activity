#!/usr/bin/env node
import { createClient } from 'redis';
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

  if (filtereEvent) {
    const filteredEvents = events.filter((event) => {
      return event.type === filtereEvent;
    })

    if (filteredEvents.length === 0) {
      console.log(`No events for ${filtereEvent} by ${username}`);
      return;
    }

    filteredEvents.forEach((filterEvent) => {
      let commitCount;

      if (filterEvent.type === 'PushEvent') {
        commitCount = `Pushed ${filterEvent.payload.commits.length} to ${filterEvent.repo.name}`;
      } else if (filterEvent.type === 'IssueEvent') {
        commitCount = `Issues events were ${filterEvent.payload.commits.length}`;
      } else if (filterEvent.type === 'ForkEvent') {
        commitCount = `Fork events are ${filterEvent.payload.commits.length}`
      } else if (filterEvent.type === 'CreateEvent') {
        commitCount = `Created events for ${filterEvent.payload.ref_type}`
      } else if (filterEvent == {}) {
        commitCount = `No events`;
        return;
      }
      console.log(commitCount)
    })
    
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

// create a connection to Redis
let redisClient;
(async () => {
  // the url is for displaying informtion of redis in upstash GUI
  redisClient = createClient({url: process.env.REDIS_URL})

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})()

try {
  // process the data from the Redis cache if it is available.
  const cachedData = await redisClient.get(username);

  if (cachedData) {
    let isCached = true;
    let events = JSON.parse(cachedData);
    console.log('Redis Cache Hit! \n===============================================')
    displayEvents(events, filtereEvent)
    process.exit(0)
  } else {
    // or process the data from the database
    const events = await fetchedUser(username)
    console.log('Database Hit! \n===============================================')
    displayEvents(events, filtereEvent)
    
    // set data into redis if its not available
    const DEFAULT_EXPIRATION_INT  = 3660;
    await redisClient.set(username, DEFAULT_EXPIRATION_INT, JSON.stringify(events));
    process.exit(0)
  }
} catch (error) {
  console.log(error)
}