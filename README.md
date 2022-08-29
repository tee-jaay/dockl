# Docker Manager App

A Python EEL and React.js build Docker management app for Linux Distros.

![images list page](https://res.cloudinary.com/jtam/image/upload/v1661705899/apps/dockl/images/page-images.jpg)  

## Installation

### Prerequisites

- A Linux distro operating system: [Ubuntu](https://ubuntu.com) etc
- [Python](https://www.python.org) v3 is required
- [Docker](https://www.docker.com) is required (v20.10.12 used in this project)
- [Git](https://github.com/git-guides/install-git) should be installed
- [Node.js](https://nodejs.org) should be installed (v16.17.0 used in this project)
- [Google chrome/Chromium](https://www.google.com/chrome/index.html) should be installed

### Clone the repo

Clone the git repository from command terminal:  
`git clone https://github.com/tee-jaay/dockl`  

Change location into the directory:  
`cd dockl`  

### EEL & Python packages

Create a virtual environment (**python3-venv** is required):  
`python3 -m venv env`  
Activate the virtual environment:  
`source env/bin/activate`  
Install python packages:  
`pip install -r requirements.txt`  

### UI packages

Change location into the UI directory:  
`cd web`  
Install the UI packages:  
`npm install`  
Build the UI:  
`npm run build`  

## Start the app

Back to root of project:  
`cd ../`  
Run the app:  
`python main.py`  
