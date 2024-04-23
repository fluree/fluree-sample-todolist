# Fluree Sample App - TodoList

This is an example Vite app (React+TS) that demonstrates how to use [`fluree-client`](https://github.com/fluree/fluree-client) in a front end web application in order to interface with a [Fluree Cloud](https://data.flur.ee/) dataset.  
This app relies on [`fluree-client`](https://github.com/fluree/fluree-client) to do the most basic functions a database sdk should handle: Create, Read, Update, and Delete data records.  
[`fluree-client`](https://github.com/fluree/fluree-client), however, also makes more complicated interactions a breeze:
 - [Upsert](https://github.com/fluree/fluree-client#upsert). Entities provided to this function are created in the dataset if they don't already exist and are updated if they do.
 - Delete. Passing entity identifiers (`@id`) to this function makes it super easy to retract entire entities from the database.
 - Cryptography functions. `fluree-client` wraps a lower-level Fluree library called [`fluree/crypto`](https://github.com/fluree/fluree.crypto) and makes it very easy to [create new cryptographic public/private key pairs](https://github.com/fluree/fluree-client#generateKeyPair) and [`did`s](https://github.com/fluree/fluree-client?tab=readme-ov-file#getDid) as well as automatically signing queries and transactions before sending them to Fluree so that your applications can take full advantage of Fluree's built-in provenance and access control capabilities.
 - and more! Check out [the readme](https://github.com/fluree/fluree-client)!


### Try the app out with [StackBlitz](https://stackblitz.com/)!
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/fluree/fluree-sample-todolist?title=Fluree%20Todo%20List%20Sample&file=.env)

## Quick note on Sample App Design
Simplicity and minimalism were prioritized in this sample application in order to highlight the usage of [`fluree-client`](https://github.com/fluree/fluree-client) and the interactions with Fluree. Because of this, most application logic resides in the top-level `App.tsx` file and other best practices, like optimistic client-side updates, were eschewed in favor of UI affordances that show when [`fluree-client`](https://github.com/fluree/fluree-client) is interacting with Fluree. The hope is to give you an understanding of how your applications will use [`fluree-client`](https://github.com/fluree/fluree-client) to interact with Fluree.

# Fluree Cloud
[Fluree Cloud](https://data.flur.ee/) is Fluree's hosted database-as-a-service that makes it easy to build on FlureeDB.  

You'll need a Fluree Cloud dataset to run this application (unless you update the code to point at another Fluree instance, of course).  
After logging into [Fluree Cloud](https://data.flur.ee/), just click the big "Create a Dataset" button and fill out the form to create your TodoList dataset. Once that's done, you can create an API Key on the Settings tab of the dataset.  
If needed, please follow the instructions on [this docs page](https://developers.flur.ee/docs/nexus/topics/integrating-clients-with-datasets/) for additional help connecting to your new Fluree Cloud dataset from this sample web application.

# Getting started
There are just a few steps to getting this running on your machine:

1. Clone this repo
   ```
   git clone https://github.com/fluree/fluree-sample-todolist.git
   ```
2. Change into the new project folder and install dependencies
   ```
   cd fluree-sample-todolist && npm install
   ```
3. [OPTIONAL] Update the environment file `.env` that holds the variables for your Fluree Cloud dataset name and API Key (if you don't have a Fluree Cloud dataset yet, [see instructions above](#fluree-cloud)). If the `.env` is not updated, these details will be requested at runtime in the application UI. Here's a sample:
   ```
   VITE_FLUREE_DB=fluree-jld/387028092978413
   VITE_FLUREE_API_KEY=zhN1...eR8Ug
   ```
4. Start! Vite should spit out a localhost url that you can navigate to see the app.
   ```
   npm run dev
   ```
