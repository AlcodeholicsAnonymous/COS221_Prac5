# COS221_Prac5
## To run the Website:
1. Use the provided sql dump to populate the database.
2. Change API.php and config.php to use your database credentials.
3. Run the API using the command: php -S 127.0.0.1:8080 in the PHP directory
4. Run the PHP server, we recommend using the vscode extension: php server or something similar.
5. Navigate to the website using the url: localhost:3000/HTML/Wine.html
6. Enjoy the website.

## To use the Website:
1. Register a user on the website.
2. Login to the website.
3. The "Wines" tab shows all wines which you can sort filter and rate.
4. The "Wineries" tab shows all wineries which you can sort and filter.
5. The "Manage Winery" tab allows you to edit and delete wines from the database for the winery which you manage. (only avaiable to admin users)
6. The "Add Wine" tab allows you to add a wine to the database for the winery which you manage. (only avaiable to admin users)

>login is required to use the "Manage Wineries" tab and to be able to rate wines.
When you manage a winery it will automatically get the winery that you manage and use it to add/edit/delete wines.
