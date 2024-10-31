---
title: 'Supercharge Your User Experience: Real User Monitoring (RUM) and Frontend Performance Metrics'
seoTitle: 'Supercharge Your User Experience: Real User Monitoring (RUM) and Frontend Performance Metrics'
description: Explore the importance of Real User Monitoring (RUM) and learn how OpenObserve enhances RUM with powerful observability features. This guide walks you through building a React User Portal and integrating OpenObserve RUM to track frontend performance metrics and user interactions for optimized insights.
img: /img/blog/real_user_monitoring/rum-o2.gif
alt: supercharge-real-user-monitoring
slug: real-user-monitoring-and-frontend-performance
authors: 
  - chaitanya
publishDate: 2024-10-31
tags:
  - Real User Monitoring (RUM)
  - OpenObserve
  - Performance Metrics
  - Frontend Monitoring
  - JavaScript Error Tracking
  - Web Application Performance
  - Frontend Performance Tools
  - OpenObserve Logs
  - User Experience Optimization
  - Session Replay 
  - GitHub Demo 
  - RUM for React Apps 
  - 1-click RUM Setup 
  - Dashboard Creation
  - Observability
  - User Interaction Tracking
  - Performance Optimization
  - Real-time Monitoring
---

Let’s explore RUM, its importance, and how OpenObserve complements RUM with its powerful features. Finally, we’ll build a React User Portal and integrate OpenObserve RUM to track frontend performance metrics and user interactions.

## **What is Real User Monitoring (RUM)?**

Real User Monitoring (RUM) is a performance monitoring technique that captures and analyzes every interaction users have with your application in real time. Unlike synthetic monitoring (which simulates user behavior), RUM collects real-time data directly from users' browsers. This allows you to:

* Track performance metrics such as page load times, resource loading (images, scripts, etc.), and user session lengths.  
* Monitor user interactions, including clicks, form inputs, and navigation patterns.  
* Identify performance bottlenecks specific to regions, devices, or browsers.  
* Replay user sessions to visualize how users are interacting with your app.  
* Measure and improve Core Web Vitals for better search engine rankings

RUM provides an invaluable view into how your application performs under real-world conditions, helping you improve user experience by identifying issues as they occur.

### **Why is RUM Important?**

1. **Improved Performance Insights**: RUM allows you to track real-time data from actual users rather than simulated environments, leading to more accurate performance metrics.  
2. **User-Centric Monitoring**: Instead of focusing purely on infrastructure, RUM focuses on the user experience, allowing you to optimize for your end users.  
3. **Problem Diagnosis**: You can pinpoint the exact cause of issues, such as slow-loading pages, bottlenecks, or unexpected errors, based on actual user interactions.  
4. **Conversion Optimization**: RUM data can help identify user experience issues that may be impacting conversion rates.

## **How OpenObserve Complements RUM**

OpenObserve enhances RUM capabilities with its comprehensive observability platform and extends the power of Real User Monitoring (RUM) by offering a robust platform to track, analyze, and visualize real-time user interactions and performance metrics. With OpenObserve, you gain complete visibility into the frontend of your application. Let’s explore how OpenObserve's RUM capabilities enhance the monitoring experience.

### **Key Features of OpenObserve RUM:**

1. **Session Replay**: OpenObserve records and replays user sessions, allowing you to view precisely how users interacted with your app—clicks, form submissions, and navigations. You can replay these sessions to analyze performance or investigate bugs.  
2. **Performance Metrics**: OpenObserve provides in-depth insights into page load times, resource loading (e.g., scripts, images), and other critical metrics that impact user experience.  
3. **Error Tracking**: OpenObserve captures JavaScript errors and automatically forwards them to the logs. With error tracking, you can see which users encountered errors, when the errors occurred, and what caused them.  
4. **Resource Tracking**: OpenObserve tracks how resources (like images, CSS, and JavaScript files) load across different user sessions, helping you optimize frontend performance.  
5. **User Context**: OpenObserve allows you to set user context (e.g., user ID, email, role) for better insights into which users encountered performance issues or bugs.  
6. **Custom Event Tracking**: OpenObserve allows you to track custom events specific to your application's business logic.

### **OpenObserve RUM in Action**

Using OpenObserve’s RUM dashboard, you can:

* Replay sessions to visualize user behavior.  
* Analyze frontend performance for different users, devices, and regions.  
* Automatically log and track JavaScript errors and other frontend issues.  
* Correlate frontend performance with backend metrics for a holistic view of your application

**![real user monitoring](/img/blog/real_user_monitoring/image2.png)**

For more detailed documentation on OpenObserve RUM, you can visit our [official documentation](https://openobserve.ai/docs/user-guide/rum/).

## **Getting Started: Building a React User Portal with OpenObserve RUM**

Now that we understand the power of RUM and how OpenObserve complements it, let’s start by building a React User Portal. We’ll integrate OpenObserve RUM to monitor real-time user interactions and track frontend performance metrics.

**Note**: Ensure you have Node.js and npm installed on your system before proceeding.

### **Step 1: Setting Up the React Project**

We’ll start by creating a new React project and installing the necessary dependencies:

* Open your terminal and run the following command to create a new React app

```javascript
npx create-react-app user-portal-app
```

* Navigate to the project directory

```javascript
cd user-portal-app
```

* Install the required dependencies

```javascript
# Install Material-UI and React Router dependencies
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
```

### **Step 2: Integrating OpenObserve RUM in the App**

To start monitoring user interactions and frontend performance, we need to integrate OpenObserve RUM into our React app.

* Install OpenObserve RUM and logs packages

```javascript
npm install @openobserve/browser-rum @openobserve/browser-logs
```

* Modify src/App.js to include the RUM and logs setup, and basic routing

```javascript
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Container, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { openobserveRum } from "@openobserve/browser-rum";
import { openobserveLogs } from "@openobserve/browser-logs";

function App() {
  const [open, setOpen] = useState(false);

  // Toggle sidebar drawer
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  // Initialize OpenObserve RUM and Logs
  useEffect(() => {
    const options = {
      clientToken: '<your_token>', // Replace '<your_token>' with your actual OpenObserve client token
      applicationId: 'web-application-id',
      site: 'localhost:5080',
      service: 'my-web-application',
      env: 'production',
      version: '0.0.1',
      organizationIdentifier: 'default',
      insecureHTTP: true,
      apiVersion: 'v1',
    };

    openobserveRum.init({
      applicationId: options.applicationId,
      clientToken: options.clientToken,
      site: options.site,
      organizationIdentifier: options.organizationIdentifier,
      service: options.service,
      env: options.env,
      version: options.version,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      apiVersion: options.apiVersion,
      insecureHTTP: options.insecureHTTP,
      defaultPrivacyLevel: 'allow'
    });

    openobserveLogs.init({
      clientToken: options.clientToken,
      site: options.site,
      organizationIdentifier: options.organizationIdentifier,
      service: options.service,
      env: options.env,
      version: options.version,
      forwardErrorsToLogs: true,
      insecureHTTP: options.insecureHTTP,
      apiVersion: options.apiVersion,
    });

    openobserveRum.setUser({
      id: "1",
      name: "Captain Hook",
      email: "captainhook@example.com",
    });

    openobserveRum.startSessionReplayRecording();
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/settings" onClick={toggleDrawer(false)}>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
```

You can also find the above O2 RUM details by following the steps mentioned here:

* Login to your O2 dashboard  
  * ![real user monitoring](/img/blog/real_user_monitoring/image1.png)  
* On the left panel, click on Ingestion  
  * ![real user monitoring](/img/blog/real_user_monitoring/image12.png)  
* Finally, click on Real User Monitoring  
  * ![real user monitoring](/img/blog/real_user_monitoring/image6.png)

### **Step 3: Building the User Portal Pages**

Lets create the Dashboard, Profile, and Settings pages for our user portal.

**Dashboard with Recent Activity**

The Dashboard will display a welcome message and a list of recent user activities

```javascript
// TODO: Implement real data fetching for recent activity
import React from "react";
import { Typography, Card, CardContent, Grid, List, ListItem, ListItemText } from "@mui/material";

function Dashboard() {
  const recentActivity = [
    { id: 1, activity: "Logged in from a new device", date: "2024-10-03 10:45 AM" },
    { id: 2, activity: "Updated profile information", date: "2024-10-02 04:15 PM" },
    { id: 3, activity: "Changed password", date: "2024-10-01 11:00 AM" },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Welcome to your Dashboard
            </Typography>
            <Typography>
              Here, you can view recent activity and important metrics.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.activity}
                    secondary={item.date}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
```

**Profile with Password Visibility Toggle and User Avatar**

On the Profile page, users can update their name, email, and password. We’ll also add a password visibility toggle and a user avatar

```javascript
import React, { useState } from "react";
import { Typography, TextField, Button, Box, IconButton, InputAdornment, Avatar, Grid } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';

function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: false, email: false });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: event.target.value === "" });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: !/\S+@\S+\.\S+/.test(event.target.value) });
  };

  const handleSubmit = () => {
    if (name === "" || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ name: name === "", email: !/\S+@\S+\.\S+/.test(email) });
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Profile Settings
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Avatar sx={{ width: 100, height: 100 }}>
            <PersonIcon style={{ fontSize: 50 }} />
          </Avatar>
        </Grid>
        <Grid item xs={9}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
            helperText={errors.name && "Name is required"}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
            helperText={errors.email && "Enter a valid email"}
          />
        </Grid>
      </Grid>

      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
}

export default Profile;
```

### **Settings with Notification Preferences**

The Settings page will feature notification preferences that users can toggle

```javascript
// TODO: Implement actual settings update logic
import React from "react";
import { Typography, Switch, FormControlLabel, Box, Grid } from "@mui/material";

function Settings() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleChange = (event) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked });
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Application Settings
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        Notification Preferences
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.email}
                onChange={handleChange}
                name="email"
              />
            }
            label="Email Notifications"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.sms}
                onChange={handleChange}
                name="sms"
              />
            }
            label="SMS Notifications"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.push}
                onChange={handleChange}
                name="push"
              />
            }
            label="Push Notifications"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
```

### **Step 4: Testing the App with OpenObserve RUM**

Alrighty, our portal is ready, it’s time to test it and ensure that OpenObserve RUM is capturing user interactions and performance metrics.

**Note**: Ensure your OpenObserve instance is running and accessible before testing.

1\. Running the App Locally

* Let’s run the app locally to interact with the user portal and generate RUM data.

```javascript
npm start
```

* Open your browser and visit [`http://localhost:3000`](http://localhost:3000). Interact with the Dashboard, Profile, and Settings pages to trigger RUM tracking. You can also open your network logs to view the sessions that are being tracked from rum and logs query continuously.  
  * ![real user monitoring](/img/blog/real_user_monitoring/image9.png)

2\. Viewing RUM Data in OpenObserve

* Log in to the O2 console  
  * ![real user monitoring](/img/blog/real_user_monitoring/image11.png)  
* Navigate to the RUM Dashboard and view session replays, logs, and performance metrics for your app.  
  * ![real user monitoring](/img/blog/real_user_monitoring/image3.png)  
  * ![real user monitoring](/img/blog/real_user_monitoring/image5.png)  
  * ![real user monitoring](/img/blog/real_user_monitoring/image7.png)  
  * ![real user monitoring](/img/blog/real_user_monitoring/image10.png)  
  * ![real user monitoring](/img/blog/real_user_monitoring/image4.png)

## **Potential Issues and Fixes**

### **1\. Common Setup Challenges**

While setting up OpenObserve RUM, there are a few things that can cause issues with logging, session replay, or collecting performance metrics. Here are some frequent mistakes and how to avoid them

* #### Incorrect RUM Initialization

  * Ensure the clientToken, applicationId, and site parameters are correctly configured. These values should match exactly what you've configured in your OpenObserve setup.  
* API Version or HTTP Configuration Issues  
  * If you're running the application locally with insecure HTTP, set insecureHTTP: true. For production, make sure you're using HTTPS and the correct apiVersion (v1).  
* Forgetting to Set User Context  
  * Without setting a user context (using `openobserveRum.setUser()`), you may miss valuable insights about specific user sessions and behaviors.

### **2\. Logging Configuration Issues**

* Missing JavaScript Errors: Ensure that OpenObserve Logs are properly configured with the correct client token and site. If errors aren't appearing, double-check that forwardErrorsToLogs is set to true during the logs initialization.  
* Logs Not Being Captured: If logs aren't appearing in OpenObserve, review the log configuration to ensure no steps were missed during initialization. You can cross-check this on the OpenObserve dashboard.  
* CORS Issues: If you encounter Cross-Origin Resource Sharing (CORS) errors, ensure your OpenObserve instance is configured to accept requests from your application's domain.

## **Recommended Practices for a Successful RUM Setup**

To maximize the value of your OpenObserve RUM integration, here are some recommended practices:

### **1\. Verify Your Configuration**

* Check Client Token and API Setup: Ensure that all tokens, endpoints, and configurations (such as clientToken, applicationId, and site) are correct. Also, ensure that your RUM code runs when the application starts.

### **2\. Store Sensitive Information in Environment Variables**

* Instead of hardcoding sensitive details like client tokens, store them in environment variables. This approach protects your secrets and makes your setup more flexible across different environments (local, production).

### **3\. Use Session Replays Judiciously**

* Session Replays provide in-depth insights, but enabling them across all users can consume significant resources. Activate replays selectively for key users or sessions where you need detailed behavior analysis. Also, use privacy controls to ensure sensitive data (e.g., user input) is masked.

### **4\. Routinely Review Logs and Replays**

* Regularly check your OpenObserve dashboard to stay informed about **J**avaScript errors, session replays, and frontend performance. This proactive approach helps identify issues early.

### **5\. Continuously Monitor and Improve Performance**

* Utilize the performance metrics generated by RUM to track your app's performance over time. Keep an eye on things like page load times and long tasks, and optimize resource delivery (e.g., scripts, images) to improve overall performance.

## **Wrap-Up and Next Steps**

### **Monitoring in Place? Check\!**

With OpenObserve RUM integrated into your React application, you’ve set up a real-time monitoring system that captures crucial data about user behavior, performance, and potential frontend issues. Whether it's session replays, JavaScript errors, or slow page loads, you now have all the tools you need to analyze and improve your app's user experience.

To make getting started even easier, we’ve created a RUM demo project on GitHub that includes a full setup for testing RUM integration with OpenObserve. The GitHub repository provides detailed instructions and configurations, allowing you to set up RUM with just a 1-click setup (for Mac users), making it easy to test real user monitoring in seconds. With this setup, you can start tracking user interactions, logs, and performance metrics almost immediately, without needing to build the setup from scratch.

**Check out the demo here: [OpenObserve RUM Demo](https://github.com/openobserve/rum-demo).**

We’re also thrilled to announce the release of our CDN for Real User Monitoring (RUM)\! This allows for streamlined integration and fast delivery of our RUM and logs packages directly into your applications. Check out the packages below, and feel free to integrate them for enhanced observability:

* [RUM package](https://rum.openobserve.ai/openobserve-rum.js)  
* [Logs package](https://rum.openobserve.ai/openobserve-logs.js)

For a hands-on example, refer to our [demo code on GitHub](https://github.com/openobserve/rum-demo/tree/cdn-rum), where you’ll find everything you need to get started\!

### **Take Your Application Monitoring to the Next Level**

With OpenObserve’s powerful RUM and logging capabilities, you’re well-equipped to ensure an optimized and seamless user experience. Whether you’re tracking performance metrics, logs, or user interactions, OpenObserve offers everything you need to maintain top-notch frontend performance. Start exploring today with the GitHub RUM Demo or integrate it directly into your projects\!

Ready to supercharge your user experience? Sign up for [OpenObserve](https://cloud.openobserve.ai/) today and start leveraging the power of RUM.