

> **FOLDER STRUCTURE**
> 
> `Frontend`
> 

## Assets

 - **Docs** contains terms and condition 
 - **Images** contains website images
 - **Videos** contains video for the website

## Components

 - **About**  about.jsx
 - **Admin**  Admincourses.jsx, Createcourse.jsx, Dashboard.jsx, Users.jsx, Chart.js, Sidebar.jsx
 - **Auth**  ForgetPassword.jsx, Login.jsx, Register.jsx, ResetPassword.jsx
 - **Contact** Contact.jsx 
 - **CoursePage** Coursepage.jsx 
 - **Courses** Courses.jsx 
 - **Home** Home.jsx, Home.css
 - **Layout** Header.jsx, Footer.jsx, Loader.jsx, Notfound.jsx
 - **Payment** PaymentSuccess.jsx, PaymentFail.jsx, Subscribe.jsx
 - **Request** Request.jsx
 - **Profile** ChangePassword.jsx, Profile.jsx, UpdateProfile.jsx

## Redux

 - **Actions** admin, course, other, profile, user 
 - **Reducers** adminReducer, courseReducer, otherReducer, userReducer 
 - **Store.js** contains store and server url

 **App.js** 
 **ColorModeSwitcher.js** 
 **Index.js**
 

## DEPENDENCIES

 - @chakra-ui/react 
 - axios 
 - chart.js 
 - react-chartjs-2 
 - protected-route-react 
 - react-router-dom 
 - react-hot-toast 
 - react-icons 
 - react-redux 
 - @reduxjs/toolkit

## HANDLERS

 **Users.js**

 - login 
 - register 
 - loader 
 - logout 
 - buySubscription 
 - cancelSubscription


**Profile.js**

 - updateProfile 
 - updateProfilePicture 
 - changePassword 
 - forgetPassword 
 - resetPassword 
 - addToPlaylist 
 - removeFromPlaylist

**Other.js**
 - contactUs 
 - courseRequest 

**Course.js** 

 - getAllCourses 
 - getCourseLectures 

**Admin.js** 

 - createCourse 
 - deleteCourse 
 - addLecture
 - deleteLecture 
 - getAllUsers 
 - updateUserRole 
 - deleteUser 
 - getDashboardStats

AppLink :- `
>     https://course-five-livid.vercel.app/
