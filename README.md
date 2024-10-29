
# GitHub User Activity

In this project, I built a simple command line interface (CLI) to fetch the recent activity of a GitHub user and display it in the terminal. This project utilized working with APIs, handling JSON data, and building a simple CLI application.

You can challenge yourself by creating one [GitHub User Activity](https://roadmap.sh/projects/github-user-activity).
## Badges

Add badges from: [shields.io](https://shields.io/)

![GitHub forks](https://img.shields.io/github/forks/JoseMwanzia/github-user-activity)

![GitHub contributors](https://img.shields.io/github/contributors/JoseMwanzia/github-user-activity)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/JoseMwanzia/github-user-activity)

## Installation

To get started with this project, follow these steps:

NOTE: You need to have [node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) installed in your local machine for this to work.

1. Clone the repository, you can use http or SSH. You might as well fork it if you preffer. 
```bash
    git clone git@github.com:JoseMwanzia/GitHub-User-Activity.git
```

2. Navigate to your repository.
```bash
    cd github-user-activity
```

3. Install the dependencies on your local machine globally. Make sure you have Nose.js installed.
```bash
    npm install -g . // to install the bin in package.json
```

4. You can start the project with:
```bash
    github-user-activity <username>
```
In the ``<username>`` provide a valid github username.

#### Optional Installation
It is highly recommended to use [upstash](https://console.upstash.com/redis) if you are using redis. This is a personal prefference GUI for tracking the cached data in Redis.

1. You need to create an account with [upstash](console.upstash.com/login).
2. Create DB name of your choosing, type = regional, region = choose closest to your users to avoid latency issues.
3. Once logged in, copy the Redis url that starts like this 'redis://default...' (make sure you show the url before copying).
4. Paste the url in your project. Prefferably the .env  file using the variable name REDIS_URL, and rememmber to add an s in 'rediss://default...' this is because we enabled encrypted traffic during the setup for secure websockets.
And you're good to go. 
5. In the dashboard click the 'Data browser' to view your Redis cached data.

## Usage

Here is a basic example of how the project works;
```bash
github-user-activity josemwanzia
```

the username provided is not case sensitive


## Screenshots

![github-user-activity-screenshot](screenshot.png)
## License

[MIT](https://choosealicense.com/licenses/mit/)

