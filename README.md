# USOF app
### Here you can find info about FRONTEND and BACKEND 
## API of the USOF Application

USOF is an User Stack Overflow Forum.
Here is implemented the API for USOF backend. Also here is description of each routes.
To set and run the application you need to follow the next instructions.

## **Ports Summary**

| Component    | Technology  | Port  | Example URL                  |
|--------------|-------------|-------|------------------------------|
| **Backend**  | Node.js     | 5050  | `http://localhost:5050`      |
| **Frontend** | React.js    | 3000  | `http://localhost:3000`      |

--- 

## BACKEND
## Prerequisites

Before you begin, ensure that you have the following installed and configured:

- [NodeJS](https://nodejs.org/en/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Postman](https://www.postman.com/) (for API testing)

## Set project

1. **Clone the repo**:

   ```bash
   git clone <url_usof>
   ```

2. **Navigate to the server directory:**:
   or be careful with the folders name

   ```bash
   cd otsyban 
   ```

3. **Install necessary dependencies**:

   Navigate to the project folder and run:

   ```bash
   npm install
   ```

4. **Configure environment variables:**:

   Check, update config.json with your own credentials for MySQL and mail.


5. **Run sql code to build necessary tables/db:**:
   ***Please be careful and check the file names!***

   Run sql code:

   ```bash
   mysql -u root < example.sql (general aproach)
   mysql -u root < sql/db.sql
   mysql -u root < sql/create_table_users.sql
   mysql -u root < sql/create_table_posts.sql
   mysql -u root < sql/create_table_subscriptions.sql
   mysql -u root < sql/create_table_commnents.sql
   mysql -u root < sql/create_table_confirmation_email.sql
   mysql -u root < sql/create_table_favourites.sql
   mysql -u root < sql/create_table_likes.sql
   mysql -u root < sql/alter_locked_tables.sql
   mysql -u root < sql/insert_data.sql
   ```

6. **Start the server:**:

   To start the project server:

   ```bash
   npm start
   ```

## API Documentation:
You can explore the API documentation using this link: [USOF API Documentation](https://documenter.getpostman.com/view/32454691/2sAY4sjjVc).

# API Documentation

## Authentication Module

### Register a New User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Required Parameters**: `login`, `password`, `password_confirmation`, `email`
- **Expected Result**: A message confirming registration.

### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user. Only users with confirmed emails can sign in.
- **Required Parameters**: `login`, `email`, `password`
- **Expected Result**: Successful login message and session data.

### Logout User
- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Description**: Logs out the currently authenticated user.
- **Expected Result**: Successful logout message.

### Password Reset Request
- **URL**: `/api/auth/password-reset`
- **Method**: `POST`
- **Description**: Sends a reset link to the user's email.
- **Required Parameter**: `email`
- **Expected Result**: Confirmation message for email sent.

### Confirm New Password
- **URL**: `/api/auth/password-reset/<confirm_token>`
- **Method**: `POST`
- **Description**: Confirms and sets a new password using a token sent to the user's email.
- **Required Parameter**: `new_password`
- **Expected Result**: Confirmation message for password reset.

---

## User Module

### Get All Users
- **URL**: `/api/users`
- **Method**: `GET`
- **Description**: Retrieves all users.
- **Expected Result**: List of users.

### Get Specific User
- **URL**: `/api/users/<user_id>`
- **Method**: `GET`
- **Description**: Retrieves data for the specified user.
- **Expected Result**: User data.

### Create a New User
- **URL**: `/api/users`
- **Method**: `POST`
- **Description**: Creates a new user (accessible to admins only).
- **Required Parameters**: `login`, `password`, `password_confirmation`, `email`, `role`
- **Expected Result**: Confirmation message for user creation.

### Upload User Avatar
- **URL**: `/api/users/avatar`
- **Method**: `PATCH`
- **Description**: Uploads a user's avatar.
- **Expected Result**: Confirmation message and avatar URL.

### Update User Data
- **URL**: `/api/users/<user_id>`
- **Method**: `PATCH`
- **Description**: Updates the specified user's data.
- **Expected Result**: Confirmation message for user data update.

### Delete User
- **URL**: `/api/users/<user_id>`
- **Method**: `DELETE`
- **Description**: Deletes the specified user.
- **Expected Result**: Confirmation message for user deletion.

---

## Post Module

### Get All Posts
- **URL**: `/api/posts`
- **Method**: `GET`
- **Description**: Retrieves all posts (public). Implements pagination if there are too many posts.
- **Expected Result**: Paginated list of posts.

### Get Specific Post
- **URL**: `/api/posts/<post_id>`
- **Method**: `GET`
- **Description**: Retrieves data for the specified post (public).
- **Expected Result**: Post data.

### Get All Comments for a Post
- **URL**: `/api/posts/<post_id>/comments`
- **Method**: `GET`
- **Description**: Retrieves all comments for the specified post (public).
- **Expected Result**: List of comments.

### Create a New Comment
- **URL**: `/api/posts/<post_id>/comments`
- **Method**: `POST`
- **Description**: Creates a new comment on a post.
- **Required Parameter**: `content`
- **Expected Result**: Confirmation message for comment creation.

### Get All Categories for a Post
- **URL**: `/api/posts/<post_id>/categories`
- **Method**: `GET`
- **Description**: Retrieves all categories associated with the specified post.
- **Expected Result**: List of categories.

### Get All Likes for a Post
- **URL**: `/api/posts/<post_id>/like`
- **Method**: `GET`
- **Description**: Retrieves all likes under the specified post.
- **Expected Result**: List of likes.

### Like a Post
- **URL**: `/api/posts/<post_id>/like`
- **Method**: `POST`
- **Description**: Adds a like to the specified post.
- **Expected Result**: Confirmation message for like creation.

### Update Post
- **URL**: `/api/posts/<post_id>`
- **Method**: `PATCH`
- **Description**: Updates the specified post's title, body, or category (accessible only to the post creator).
- **Expected Result**: Confirmation message for post update.

### Delete Post
- **URL**: `/api/posts/<post_id>`
- **Method**: `DELETE`
- **Description**: Deletes the specified post.
- **Expected Result**: Confirmation message for post deletion.

### Unlike a Post
- **URL**: `/api/posts/<post_id>/like`
- **Method**: `DELETE`
- **Description**: Removes a like from the specified post.
- **Expected Result**: Confirmation message for like deletion.

---

## Categories Module

### Get All Categories
- **URL**: `/api/categories`
- **Method**: `GET`
- **Description**: Retrieves all categories.
- **Expected Result**: List of categories.

### Get Specific Category
- **URL**: `/api/categories/<category_id>`
- **Method**: `GET`
- **Description**: Retrieves data for the specified category.
- **Expected Result**: Category data.

### Get All Posts in a Category
- **URL**: `/api/categories/<category_id>/posts`
- **Method**: `GET`
- **Description**: Retrieves all posts associated with the specified category.
- **Expected Result**: List of posts in the category.

### Create a New Category
- **URL**: `/api/categories`
- **Method**: `POST`
- **Description**: Creates a new category.
- **Required Parameter**: `title`
- **Expected Result**: Confirmation message for category creation.

### Update Category
- **URL**: `/api/categories/<category_id>`
- **Method**: `PATCH`
- **Description**: Updates the specified category's data.
- **Expected Result**: Confirmation message for category update.

### Delete Category
- **URL**: `/api/categories/<category_id>`
- **Method**: `DELETE`
- **Description**: Deletes the specified category.
- **Expected Result**: Confirmation message for category deletion.

---

## Comments Module

### Get Specific Comment
- **URL**: `/api/comments/<comment_id>`
- **Method**: `GET`
- **Description**: Retrieves data for the specified comment.
- **Expected Result**: Comment data.

### Get All Likes for a Comment
- **URL**: `/api/comments/<comment_id>/like`
- **Method**: `GET`
- **Description**: Retrieves all likes for the specified comment.
- **Expected Result**: List of likes.

### Like a Comment
- **URL**: `/api/comments/<comment_id>/like`
- **Method**: `POST`
- **Description**: Adds a like to the specified comment.
- **Expected Result**: Confirmation message for like creation.

### Update Comment
- **URL**: `/api/comments/<comment_id>`
- **Method**: `PATCH`
- **Description**: Updates the specified comment's data.
- **Expected Result**: Confirmation message for comment update.

### Delete Comment
- **URL**: `/api/comments/<comment_id>`
- **Method**: `DELETE`
- **Description**: Deletes the specified comment.
- **Expected Result**: Confirmation message for comment deletion.

### Unlike a Comment
- **URL**: `/api/comments/<comment_id>/like`
- **Method**: `DELETE`
- **Description**: Removes a like from the specified comment.
- **Expected Result**: Confirmation message for like deletion.


## FRONTEND
# **Frontend Documentation: Lock/Unlock Post Functionality**

## To run:
1. **Navigate to the frontend directory (name: frontend):**:

   ```bash
   cd frontend
   ```
2. **Install dependencies**:

   Install dependencies:

   ```bash
   npm install
   ```

3. **Start the frontend part:**:

   Finally, run the command:

   ```bash
   npm start
   ```

## **Overview**
This document provides a detailed explanation of the frontend implementation for the post functionality. The purpose is to allow post owners or admins to toggle the status of a post through the UI.

---

## **Features**
- Fetches post details to determine the lock status and author information.
- Fetches user details to determine their role and permissions.
- Displays a button to toggle the lock status for authorized users.
- Dynamically updates the post's lock status in the UI after a successful action.
- On each stage check user permission
- Implemented header which contains : search bar (user is able to search by phrase), name of the app USOF(cliking on it user can see a menu), user's name, avatar and role, logout button.
- Menu consists of: 
1. Home (list of all posts , admin see all while user see only his/her; also posible to sort filter them)
2. Profile (when user click on this icon on header he/she redirects to profile page)
3. CreatePost (form for post creation)
4. Subscription (list with Subscripted posts)
5. Favourites (list with Favourite posts)
6. Category (list of categories, users can only see while admins perform CRUD operations)
7. About (description of the USOF and its purpose)
8. Login (redirection to login page)

- **Profile page**
1. to change photo :
- click on old one , take new, press update button

---

## **Workflow**

---
Next description similar to almost each features
---

### **1. Data Fetching**
The component fetches:
- **Post Details**: Includes information about the post's lock status and its author's ID.
- **User Details**: Includes information about the logged-in user's ID and role.

### **2. Permission Check**
The component determines whether the user can lock/unlock the post based on:
- Whether the user is the author of the post.
- Whether the user has an admin role.

### **3. Lock Status Toggle**
Authorized users can toggle the lock status by interacting with the button:
- If the post is locked, clicking the button will unlock it.
- If the post is unlocked, clicking the button will lock it.

---
