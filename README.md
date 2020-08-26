# [Next.js](https://github.com/marcelocg/nextjs-docker) containerized

Shamelessly deeply inspired in [Strapi containerized](https://github.com/strapi/strapi), including this text!

---

[![Docker Pulls](https://img.shields.io/docker/pulls/marcelocg/nextjs.svg?style=for-the-badge)](https://hub.docker.com/r/marcelocg/nextjs)

## Image

Use [`marcelocg/nextjs`](#how-to-use-marcelocgnextjs) to create a new project or run a project on your host machine.

## How to use `marcelocg/nextjs`

This image allows you to create a new Next.js project or run a project from your host machine. The default command that will run in your project is `next dev`.

### Creating a new project

When running this image, Next.js will check if there is a project in the `/srv/app` folder of the container. If there is nothing then it will run `npx create-next-app .` command in the container /srv/app folder. You can create a new project by running this command.

```bash
docker run -it -p 3000:3000 -v `pwd`/project-name:/srv/app marcelocg/nextjs
```

The `-v` option creates a `project-name` folder on your computer that will be shared with the docker container.
Once the project is created it will be available in this folder on your computer. Also, the server will be running on port 3000.

You can access it by calling `http://localhost:3000` in your browser.

### Running a project from your host machine

You can also use `marcelocg/nextjs` to run a project you already have created (or cloned from a repo) on your computer.

First make sure to delete the `node_modules` folder if you have already installed your dependencies on your host machine. Then run:

```bash
cd my-project
docker run -it -p 3000:3000 -v `pwd`:/srv/app marcelocg/nextjs
```

This will start by installing the dependencies and then run `next dev` in the project.

## Building the image in this repository

You can build the images with the build command.

```bash
./bin/build.js
```
