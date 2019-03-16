## Architectural Design Document

* User Stories
  * Kristee: Marketing manager who wants to develop her personal brand for her career. Mainly just wants to read top-tweets to see trends.

  * Roger: Developer who wants to gain attention for his work. Reads other people's tweets for technical inspiration.

  * Ronald: Recruiter looking to post job opportunities and stalk up-and-coming developers.

  * Sheila: Author and professor not too fond of technology, but wants to be in touch with the community. She likes the simplicity of reading and posting tweets.

* Tech Stack
  * auth0
  * express
  * express-jwt
  * mongoose
  * nodemon
  * supertest
  * jest
  * dotenv

* Models
  * User
  * Tweet

* Routes
  * `/tweets`
  * `/users/:username`
  

* Tesing: jest

* Deployment: Heroku

* Securing: Auth0