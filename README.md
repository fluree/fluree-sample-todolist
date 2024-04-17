# Fluree Sample App - TodoList

This is an example Vite app (React+TS) that demonstrates how to use [`fluree-client`](https://github.com/fluree/fluree-client) in a front end web application in order to interface with a [Fluree Cloud](https://data.flur.ee/) dataset.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/fluree/fluree-sample-todolist)

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
3. Create an environment file named `.env` that will hold variables for your Fluree Cloud dataset name and API Key (if you don't have a Fluree Cloud dataset yet, [see instructions above](#fluree-cloud))
   ```
   VITE_FLUREE_DB=<your-fluree-cloud-dataset-id-here>
   VITE_FLUREE_API_KEY=<your-api-key-here>
   ```
4. Start! Vite should spit out a localhost url that you can navigate to see the app.
   ```
   npm run dev
   ```
