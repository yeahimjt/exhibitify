# Exhibitify

An Creative Feedback and Showcase Platform with Next, React, and TypeScript. I built the side project for learning purposes, however I fully intend to create an active community.

## 📦 Technologies
- Next.js
- React.js
- TypeScript
- Tailwind
- Firebase
- Zustand
- Shadcnui
- Puppeteer

##  🎨 Features
Here's what you can do with Exhibitify:

- **Browse:** You have access to limitless inspiration for your own web portfolio.
- **Select Appropriate Category:** Easily filter portfolios.
- **Create Account:** Become a member in the community providing feedback in the form of likes and comments.
- **Create Post:** Receive feedback from others by uploading your own post providing your URL link to your web portfolio so others can quickly access it. Have Puppeteer screenshot your website to be used in your post.
- **Delete Post:** Not satisfied with your post? Get rid of it.
- **Report Post:** Believe someones post is breaking the terms of service? Report it.
## 🎯 Keyboard Shortcuts

## 👩🏽‍🍳 The Process
I started by fully designing each page and generated flows that were most convenient for the user.

Next, I worked on authentication for the application. I wanted to make sure there was no security vulnerabilities. This was achieved with Firebase, allowing the user to either utilize standard email/password or utilize a Google account for quicker setup. Zustand was used to store/update the users data after logging in.

After having authentication seamlessly working, I developed each page to an exact pixel replication of what I designed. This allowed me to get the overall structure of my project complete (files and folders).

I then removed a lot of the hard coded data and started working on its actual implementation sending and receiving data from Firebases database where users, posts, and comments are stored. This included allowing users to create posts, comment on posts, and like posts.

Finally, I added the functionality for the most important page, the explore page. I was focused on re-creating the factors that drive social media success from other platforms like twitter or instagram: the infinite scrolling. This ultimately allows the application to scale without effecting performance. Filters were easily implemented at this stage too.

At every step, I (no pun intended) took a step back and further processed the functionality I was implementing to be able to fully understand why/how it works. This has overall helped me to have a much better understanding of my application rather than only worrying about understanding things I may have had trouble with.

## 📚 What I Learned
During this project, I've picked up important skills and a better understanding of complex ideas, which improved my logical thinking.

### 🎡 Advanced Event Handling:
- **User Interaction:** In this project I took it as a challenge to create something that reflects the same impressive functionality as other social media applications. This made the app more interactive and user-friendly.
### 📈 Overall Growth:
Each part of this project helped me understand more about building apps, managing complex information, and improving user experience. It was more than just making a tool. It was about solving problems, learning new things, and improving my skills for future work.

## 💭 How can it be improved?
- Adding a advanced search bar that could better help the user find the right portfolios for easier inspiration rather than only being able to infinitely scroll.
- A shuffle button can be a good addition to allow the user to view portfolios in a much more randimized order.
