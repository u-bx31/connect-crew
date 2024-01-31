<p align="center">
 <img width="150" src="https://connect-crew.vercel.app/logo.svg" alt="Material Bread logo">
</p>
<h1 align="center">
 ConnectCrew
</h1>

<hr/>

This project was generated with [NextJS](https://nextjs.org/docs/getting-started/installation) version 14.0.1.

## Table of contents

- [Overview](#overview)
  - [About Project](#about-project)
  - [Links](#links)
  - [Test Account](#test-account)
- [App process](#app-process)
  - [Built with](#built-with)
  - [Requirement](#Requirement)
    - [Installation](#installation)
    - [Environment](#environment)
    - [Middleware](#middleware)
  - [Authentication](#authentication)
  - [Application](#app)
- [Author](#author)

# Overview:

## About the Project:

Connect Crew is a social networking app designed to create meaningful connections between users with common interests and goals. Like Threads, this app gives users a way to talk, share updates, and collaborate on projects in a dedicated community called "Crews."

##### Highlights of Connect Crew include:

- Crews : Users can join or create crews based on specific interests, hobbies, or professional fields, fostering a sense of community among like-minded individuals.

- Real-time Threads : The app's threaded conversations enable users to engage in dynamic discussions, share updates

- User Profiles : Each user has their own profile as a reflection of the threads they post or reply to or are tagged with

- Multimedia sharing : Connect Crew supports the sharing of a variety of multimedia content, `including photos, videos , and documents`(will be added soon), to increase communication and collaboration community

- Chat with friends `will be added soon` : Users can chat with there friends that they have in friends list

##### in progress

- user can like i thread
- user can repost the thread
- user can share on ohter social media
- user can chat with their friend list

## Links

- [Live Demo](https://connect-crew.vercel.app/)

## Test Account

`` - Email : test03122@yopmail.com  |  Password : test03122``

## App Process:

#### Built With:

- [NextJs14](https://nextjs.org/docs/getting-started/installation)
- [Tailwind css](https://tailwindcss.com/docs/installation)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TypeScript]()
- [Mongo Database](https://www.mongodb.com/)
- [Uploadthing](https://docs.uploadthing.com/getting-started/appdir)
- [Clerk](https://clerk.com/docs/quickstarts/nextjs)

#### Requirement

- ##### Installation

install all those packages

```bash
# Nextjs 14
  npx create-next-app@latest
#Mongo Database
  npm install mongodb
#Clerk Authentication
  npm install @clerk/nextjs
#UploadTHing Upload images to db
  npm install uploadthing @uploadthing/react
#Shadcn/ui
  npx shadcn-ui@latest init
```

- ##### Environment

for more inforamtion about those packages keys check [here](#built-with)

```javascript
## clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=**************************
CLERK_SECRET_KEY=**************************

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_CLERK_WEBHOOK_SECRET=**************************

## MonogoDB key
MONGODB_URL=**************************

## UploadThing keys
UPLOADTHING_SECRET=s**************************efd84ec385438bc5415b
UPLOADTHING_APP_ID=**************************
```

- ##### Middleware

```javascript
export default authMiddleware({
	publicRoutes: ["/", "/api/webhook/clerk"],
	ignoredRoutes: ["/api/webhook/clerk"],
});

// Stop Middleware running on static files
export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

- ##### Development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Authentication

Connect Crew utilizes Clerk for authentication, a robust authentication and user management platform. Clerk enhances the security and user experience of the app by providing seamless authentication flows, secure password management, and a variety of authentication methods.

- Check Clerk docs to [learn more](https://clerk.com/docs/authentication/overview)

### App

Connect Crew leverages Server Actions of Next js 14 and Mongoose, a MongoDB object modeling library for Node.js. Server Actions allow for efficient and secure handling of various operations within the app, such as

- Crew actions
- User actions
- Thread actions

all those action located in `lib/actions`
each action have there data structure as Model located in `lib/models`

<hr/>

## Author

- this app created by : [u-bx31](https://github.com/u-bx31)
