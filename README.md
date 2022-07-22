# Bootstrap-Node-Project

**The problem:** Any time I wanted to create a new Node.js project, I found myself having to dig through old projects to copy over a bunch of configuration files, like `.prettierrc` and `.eslintrc` and repeatedly installing the same `eslint` plugins from `npm`. It took a bit of time and effort to get my initial project up and running, since I wanted everything to be *just right*. Surely, there must be an easier way.

There is!

**The solution (for me):** This is a project I created to quickly setup a new dev environment for Node.js projects using configuration settings that I frequently use in my various projects. This script greatly simplifies the process of getting a basic template up and running. This also provided a good reason to experiment with creating command line applications in Node.js.

## To use:

1. Clone this project to your local machine: `git clone git@github.com:daveschumaker/bootstrap-node-project.git`
2. `> cd ./bootstrap-node-project`
3. `> npm install`
4. `> npm run config:setup` to create an empty `config.js` file that can be used to set default name and email address for new projects.
5. Install as a global command line app: `npm run install:global`
6. Invoke `bootstrap-node` anywhere on your system to get started.

## Directory structure

After a new project is bootstrapped, the directory structure looks like this:

```
my-cool-project/
├─ node_modules/
├─ src/
│  ├─ index.js
│  ├─ index.test.js
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ README.md
```


![Screenshot of Bootstrap-Node in action](bootstrap-node-demo.gif)

## Future TODOs

* Add more configuration options:
* Choose license type
* Private or public package
* Option to use / build with `typescript`
* Option to choose `npm` or `yarn`.
* npm `dev` script that uses `nodemon` to watch for changes if installed on system
* automatically run tests on commit (e.g., setup project with `husky`)