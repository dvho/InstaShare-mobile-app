# InstaShare
_InstaShare_ is a cross-platform iOS/Android native mobile app I built in React Native. I wanted to make a full stack Instagram-esque social media app with a more robust camera with cutting edge features such as facial recognition as well as traditional features such as manual focus and manual white balance. In the animated gif below (wait for it to load...)

<img src="https://github.com/dvho/insta-similar/blob/master/instaClone-using-expo-02.gif">

Left side of the gif features:
1. Zoom slider
2. Manual focus slider upon manual toggle
3. Manual white balance
4. Flash options and LED flashlight access from app
5. Front facing camera with facial recognition
5. Facial recognition with rotating color IDs and variable color IDs for group photos

Right side of the gif features:
1. Login validation
2. Liking photos
3. Taking photo from app
4. Populating photos to profile

_________________________

#### How to Use
_InstaShare_ can be downloaded and deployed to either the Apple App Store or Google Play Store. Obviously, doing so would incur patent infringement on the name, but I just wanted to show that essentially building Instagram from scratch could be done. For now I'm just leaving it here for all to see. Some of the features have been hardcoded for demonstration.
_________________________

#### Features
- iOS/Android Native Mobile App
- React Native
- Facial Recognition
- Manual Camera Features
- Expo SDK
- Full stack, similar to Instagram
_________________________

#### Motivation
I wanted to build a full stack native app for both iOS and Android. React Native is the way to go for this. Also wanted to develop a stable Expo SDK configuration with Turbo360, which I was able to achieve by locking a specific Turbo360 version in the package.json. The goal was to make a full stack Instagram-esque social media app with a more robust camera with cutting edge features such as facial recognition as well as traditional features such as manual focus and manual white balance.
_________________________

#### Notes
The backend of this project was built using Turbo 360. To learn more, click here: https://www.turbo360.co After cloning into repo, cd to project root directory and create a .env file. This file requires a TURBO_APP_ID and SESSION_SECRET keys:

```
TURBO_ENV=dev
SESSION_SECRET=YOUR_SESSION_SECRET
TURBO_APP_ID=123abc
```

Then run npm install from the root directory:

```
$ npm install
```

To run dev server, install Turbo CLI globally:

```
$ sudo npm install turbo-cli -g
```

Then run devserver from project root directory:

```
$ turbo devserver
```

To build for production, run build:

```
$ npm run build
```

_________________________

#### License
(MIT)

Copyright (c) 2019 David H. &lt;email6@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
