Tasks:
1. Connect to django backend 
2. Download necessary packages.
3. Build Functional components.
<br>
To do:
1. Create Logout which clears local storage session token and also sends an end session to the end user
2. Create a user view for seeing all user created by him, may need to create a serializer for seeing the data that way
3. For wach specific user see methods to build the lower level user on both front end and backend part.

LOGIN and LOGOUT needs to be more dynamically configured,,

Need more functional approach towards building the application components.
also setup a static and media folder in backend.
--------- Things to keep attention on -------------<br>
1. In user registeration take an important look on hirarachy of the values and api calls being made to look out for wrong happening as user gets deleted if billing info is not configured properly so use it wisely.
2. To gte the count of sales, hoffice and beamnch for a particular use make either a single api with params and carefully pass the parameters to function to see sepecfifc user changes.
3. Simply utlise the made components to do things for levels of Sales, Hoffice and branch. 
<br>
----------------------------------------to be done--------------------------<br>
- Need to add a api call to check for Username (Either call for all usernames in the db or take value to db and check across and send a message accordingly)
 or I can use handle chnge like function from - login.js

 - Use handle change fucntion to compare system credit and pass on value in user registeration form.
 - Make a choice from states coming through api and mapped in the opion field.