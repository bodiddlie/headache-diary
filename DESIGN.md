# Headache Diary

This is a small proof-of-concept app for tracking daily pain levels and details for 
chronic headache sufferers. This document is to outline the basic design of the app.

------

## Data Model

The main piece of data is the `Day`. A `Day` will consist of the date, the pain level
for the day, and any notes the user might enter.

```
{
  date: date,
  painLevel: integer (1 - 10),
  notes: string
}
```

We will also be storing some user info so that we can tie `Day` entries to users.

```
{
  email: string,
  name: string
}
```

-----

## User Interface

The app will be web-based, but will primarily run on mobile devices, so the UI should
be designed first-and-foremost to render properly on mobile devices.

The pages I am currently envisioning are:

- Home page (not logged in)
- Day entry page
- Login page
- User dashboard page

### Home Page

The home page is what will display when a user first visits the application or is not 
currently logged in. It will be a simple static page of information about the app. It 
is also where the user will be redirected after logging out. This is a low priority.

### Login Page

The login page is where a user will go to enter their credentials to log in to the app.
While eventually vital, this is a lower priority until the initial interface is ready.

### User Dashboard Page

The user dashboard is what logged in users will see when they first open the app. This
page will show a chart at the top showing a nice graph of the last 30 days entered by
pain level. The chart will be configurable to look at a date range, or can be scrolled
through. 

Directly below the chart will be a large button for adding a new day. Clicking this
will take the user to the entry form for a new `Day` entry.

Below the button will be an infinitely scrollable list of `Day` entries sorted in
descending order. It will show the date, pain level, and the first few lines of notes.
Clicking on any entry will take the user directly to the edit screen for that entry.

### Day Entry Form

The day entry form is the most important piece to get working initially. The form will
take in an entry as a prop. If none is provided, it will be treated as a new entry.
New entries will default to the current date, empty notes, and a pain level of 5.

The interface will consist of a simple calendar control for choosing the date, a slider
for setting the pain level between 0 and 10, and a text box for entering notes. Below
all that will be a button to save the entry. A date is required for saving the form.