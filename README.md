# StudentAware

This application serves as a central repository to record efforts to contact and support students in a class. This allows greater collaboration and planning from Instructors and TAs in reaching out to struggling students and offering support.

### Elevator pitch

Many times students struggle for one reason or another, and it can be difficult for instructors and TAs to coordinate their efforts and also track what they have already done to help students. StudentAware provides a simple web interface for instructors and TAs to record information about students and efforts made to support them. This information can be shared with other Instructors and TAs to better coordinate efforts.

### Design

Here is a few design concepts for the main page, student overview, and student profile pages.

![Design image](StudentAware.svg)

### Key features

- Secure login over HTTPS
- Ability to create courses and students
- Record contact attempts/success
- Courses, students, contact attempts are stored with persistence
- Set reminders to contact specific students with Discord message reminders

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Six HTML pages for the site's structure.
    - Login
    - Courses Overview
    - Course Creation
    - Students Overview
    - Student Creation
    - Student Profile
- **CSS** - Application styling that looks good on various screen sizes, using good spacing, and colors.
- **React** - Provides interactive elements (login, course creation, record interaction, etc.). Also handles routing and components.
- **Service** - Backend Service with endpoints for:
    - Login
    - Registration
    - Creating courses/students
    - Viewing courses and students
    - Viewing course and student info
    - Reminders to contact students using Discord's API
- **DB/Login** - Stores logins, courses, students, and contact attemps in database. Cannot view or update courses/students without authenticating.
- **WebSocket** - When a user submits a contact attempt, new course, or new student it is broadcast to all users.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Git commit requirement)
    - Created my GitHub Repo based off of provided template
- [x] Proper use of Markdown
    - Use of lists, headers, and checklists
- [x] A concise and compelling elevator pitch
    - Wrote a short elevator pitch to start my README
- [x] Description of key features
    - Laid out my key features in an unordered list
- [x] Description of how you will use each technology including your 3rd party API and use of WebSocket
    - Laid out personal backend services and use of Discord's API
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.
    - Used Figma to create three sketches of my application

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Rented EC2 server** - I completed this part and chose to use an elastic ip address.
- [x] **Leased domain name** - I leased my domain name
- [x] **Server accessible** from my domain: [https://evrw.click](https://evrw.click)

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **HTML pages** - Created 8 pages to view and edit course and student information.
- [x] **Proper HTML element usage** - Each page has a header, footer, and main element with additional elements where needed.
- [x] **Links** - Pages link to simulate web app usage.
- [x] **Text** - Text added to display course, student, and site info.
- [x] **3rd party API placeholder** - Reminder table and form on `static/example-student.html` will use Discord API to send message reminders.
- [x] **Images** - Profile picture added for students.
- [x] **Login placeholder** - Login place holder present on `index.html`.
- [x] **DB data placeholder** - Courses, students, and contact attempt tables have placeholder data.
- [x] **WebSocket placeholder** - Websocket will be used to update table data without need to refresh the page.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
