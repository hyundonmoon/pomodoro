# Timer app that uses the Pomodoro technique to help you maintain work efficiency.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Thoughts](#thoughts)
  - [Useful resources](#useful-resources)

## Overview

A timer app that helps users maintain work efficiency with the Pomodoro technique. The timer has three modes: Pomodoro, short break, and long break. Users can set the length of each mode to their liking. An alarm will go off and a toast notification will appear at the end of each mode. The app is designed to be responsive to browser size changes and users can also turn sound on and off.

### Screenshot

Desktop preview

<img src="https://res.cloudinary.com/hyundon/image/upload/v1635341181/pomodoro/desktop_screenshot_cglz9w.png" />

Mobile preview

<img src="https://res.cloudinary.com/hyundon/image/upload/v1635341182/pomodoro/mobile_screenshot_jupxt1.png" height="900" />

## My process

### Built with

- React
- React Hooks
- Context API
- CSS & CSS custom properties
- SVG
- use-sound package to add sound to project

### What I learned

I took full advantage of the Context API to create app-wide states to avoid prop drilling. I needed app-wide states that would be used by the Setting component, Timer component, and Mode control component, and I was able to avoid prop drilling with Context API. I also used the useReducer hook instead of the useState hook since the timer required multiple states to be managed at once.

I played around with SVGs for the first time to create the timer progress bar. I used the strokeDasharray and strokeDashoffset properties to manipulate the visible length of the progress bar. As shown below, the offset amount was set to a dynamic value and changed according to how much time had elapsed since the timer began ticking. I initially had some trouble working with the viewport and viewbox properties since it was my first time working with SVGs but I was able to wrap my head around it soon enough.

```js
<circle
  r={RADIUS}
  cx='50%'
  cy='50%'
  className='progress-bar__bar'
  strokeDasharray={CIRCUMFERENCE}
  strokeDashoffset={offsetAmount * elapsedSeconds}
></circle>
```

Finally, I started using constant variables instead of hard coding string values. At first, I didn't really see the point of using constant variables since this is a rather small project. In retrospect, I think I did well to use constant variables since I am now able to change a value in one place and have the change applied everywhere, as opposed to having to go look for the hard coded values one by one.

### Thoughts

Overall, I'm pretty happy with how everything turned out. I especially like the fact that my friends are actually using it, unlike some of my other projects which, realistically speaking, no one will ever use.

### Useful resources

- [Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G) - I got the design for this app from Frontend Mentor. Frontend Mentor is a great place to find challenges that will improve your overall web development skills.
- [CSS Tricks](https://css-tricks.com/building-progress-ring-quickly/) - This helped me create the progress bar for the timer.
- [Zapsplat](https://www.zapsplat.com/) - Great place to find free sound effects.
