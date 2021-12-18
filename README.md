To initialize a local app:
- Download the JSON key of a service account of the firebase project
- Save it in a location of your pc (not in the project folder)
- Create a .env file with the following key:
   GOOGLE_APPLICATION_CREDENTIALS=absolute_path_of_the_json_file
- Edit the src/index.ts file as you need
- Launch it with the command "npm run start" 