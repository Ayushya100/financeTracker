Node version - v16.20.1
npm version - 8.19.4
Angular CLI version - 15.2.9
mongodb version - v5.0.8



Packages Required for backend api's to be installed
---------------------------------------------------
Run the following command in cmd:
npm i axios
npm i bcrypt
npm i body-parser
npm i cors
npm i dotenv
npm i express
npm i fs
npm i jsonwebtoken
npm i mongoose
npm i multer
npm i nodemailer
npm i nodemailer-express-handlebars
npm i nodemon
npm i node-cron
npm i randombytes
npm i uuid
npm i validator



Install and Setting up the Environment
---------------------------------------
1. Download the msi package of Mongodb from mongodb.com
2. Run msi package and install complete version.
3. Run the following command in cmd to check if mongodb is installed properly or not:
    "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --version
    Output: (should display the installed version of mongodb)
4. Run the following command in cmd to check if mongodb shell version is installed properly or not:
    "C:\Program Files\MongoDB\Server\5.0\bin\mongo.exe" --version
    Output: (should display the installed shell version of mongodb)
5. Open 'env' in your system.
6. Go to the 'Environments Variable'.
7. In 'user variables for admin' click on 'Path' and then click on 'Edit'
8. Click on 'new' and paste the following path:
    'C:\Program Files\MongoDB\Server\5.0\bin'
9. Click on Ok and done.



Run MongoDB
-----------
1. Run the following command in cmd:
    'mongo'
    (If you see this '>' symbol then your mongodb is up)
2. Run:
    show dbs
    (It will show all the dbs)



Install node dependencies before Running
----------------------------------------
npm install


Running the serverSide application
----------------------------------
npm run dev