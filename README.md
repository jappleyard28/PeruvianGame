# PeruvianGame

# URL first time you run it

It will take you to 'http://localhost:8080/en' which is fine but then when you click on a differentt page for the first time it will take you to 'http://localhost:8080/Home' where the ending changes depending on which page you clicked from the navigation bar 'http://localhost:8080/en/Home' which then means you can't access any of the pages. To solve this you need to add the '/en' before '/Home' and from then on you don't need to add it whenever you change pages as it only does this when you first open the website. You can also add '/es' instead of '/en' the first time and once you're past this part you can swap between languages for each page using the english and spanish buttons in the top right of each web page.

## Frontend

### Initial Setup

Download and install node.js (if not already installed) to get npm and the server for developing the frontend
[NODE DOWNLOAD LINK](https://nodejs.org/en/)

To install yarn, the package manager for the frontend project, open a command propmt and run:

```sh
npm i -g yarn
```

Clone the github repo for the project

Open your editor in `PeruvianGame/peruvian-game-vue/`. If you are running windows you might need to set your command line to be Command Prompt(cmd) rather than Powershell for the next part.

In that folder, install the project's dependencies by runnning:

```sh
yarn install
```

### Developing in the project

#### Git

Before making a change to the codebase create a new branch to work in

##### CLI

```sh
git checkout -b about-me-page
```

##### VS Code

Click on Source Control button on side menu (ussually 3rd icon).
Click on ... in that menu.
Click Branch > Create Branch
Enter name of Branch
Bottom Left should now say then name you chose

#### Vue

Vue starts at the App.vue file but most parts that will be made / edited will be pages or components.

##### Run the site

To run the site use the command below this will run the site and print out to the console which port it can be accessed through. Either ctrl + click on the link or copy-paste it into a browser to access it. The page should automatically rebuild and reload when you save a change.

```sh
yarn serve
```

##### Pages

Vue pages are where each pages on the site will be, e.g. site.com/aboutme would be in pages/AboutMe.vue

##### Components

Components are the reusable chunks that are on the pages. Like how there are bootstrap components you can package up your own components.
