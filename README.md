
# 💗 LoveAlarm:  Connect with people within a 10-metre radius and ring their love alarm 🔔

![IMG_0697](https://github.com/angelafeliciaa/lovealarm/assets/124738657/485d287f-4b32-4882-a9a1-855520a5cc9e)

## Inspiration
We were inspired by the K-drama Love Alarm, and we were enthusiastic about bringing the concept to life. We improvised the idea such that users can view a display name and short description, giving them the freedom to control the level of information they share.

## What it does
Connect with nearby people within a 10m radius and see what they describe themselves as, express your interest by ringing their love alarm. If reciprocated, both your heart counts will increase from 0 to 1, as long as you stay within 10m radius of that person.

## How we built it
Our app is built using **React Native** and Expo, with **MongoDB** serving as the database and **Express.js** for the backend. To ensure location accuracy within a 10-meter radius, we implemented a mechanism updating the database every 2 seconds with users' locations.

To compute the distance between the users and ensuring that they are within a 10m radius of each other, we relied on MongoDB's **geoNear** command which is used for querying geospatial data. It performs a geospatial query that returns documents based on their proximity to a specified point. This was really helpful in making our implementation simpler, as we didn't have to calculate the distance from latitudes and longitudes manually in the code. 

## Challenges we ran into
We were conflicted about how we should implement the location tracking, and after considering several options such as using the React Native BLE library, Google's Geolocation API and Expo Location. BLE would have been the most convenient but it has its own complexities with detection. On the other hand, phone Geolocation API is easier to scale, and we wanted to use Google's Geolocation API for that but we found that Expo also has their own location library, so we decided to go with that.

## Accomplishments that we're proud of
We take pride in successfully implementing the core functionalities of LoveAlarm—ringing of alarms and profiles disappearing when they step outside the 10-meter radius.

## What we learned
As a team of three full-stack developers without dedicated designers or product managers, we collaborated effectively. Our venture into mobile app development with React Native marked a significant learning experience, contributing to the success of our project.

## What's next for LoveAlarm
We envision introducing a premium paid feature that reveals the identity and description of the person who rang the alarm. This enhancement adds a layer of intrigue for users seeking a more personalized connection.
