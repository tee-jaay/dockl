# Docker Manager App

A Python EEL and React.js build Docker management app for Linux Distros.

![images list page](https://res.cloudinary.com/jtam/image/upload/v1661705899/apps/dockl/images/page-images.jpg)  

## Installation

### Prerequisites

- A Linux distro operating system: [Ubuntu](https://ubuntu.com) etc.
- [Python](https://www.python.org) v3 should be installed
- [Docker](https://www.docker.com) should be installed, version 20.10.12 is used in this project
- [Git](https://github.com/git-guides/install-git) should be installed (recommended v2.34.1 or higher)

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
