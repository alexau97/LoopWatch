# LoopWatch
##Repository for the HackUCSC Team

Everybody in this group is writing code for all aspects of the project, but more formally our roles are: 

Project/Product Manager & Developer: Andrew Lien

Lead Implementation Developers: Kevin Wu & Max Zhao

Lead UI/UX Developers: Alex Au & Chloe Jiang


##Summary of the App 

This is a hybrid web application written entirely in javascript for HackUCSC at the University of California, Santa Cruz. Our team is using the Ionic Framework as the front-end user interface.

Our application uses AngularJS’ ‘$http’ requests for the GET request, and we’re using crossorigin.me as a cors proxy for the GET request, in order to get around the CORs issue.



##screenshots 

![Alt text](mockups/ss1.png?raw=true “Screenshot 1“)

![Alt text](mockups/ss2.png?raw=true “Screenshot 2“)
![Alt text](mockups/ss3.png?raw=true “Screenshot 3“)

![Alt text](mockups/ss4.png?raw=true “Screenshot 4“)



##Notes 

### Where to start

All of our stuff will be modified under slugloop/www/ the css, img, js, lib, and templates will have our relevent stuff. 

### How to start

To set up the dev environment, if you are on the mac, make sure you have Xcode, Android SDK (android studio down is OK), JDK 7, VirtualBox, and Genymotion. This option is not needed for the initial development phases.

What is essential is to have node.js installed on your machine. 

To install cordova: 
` sudo npm install -g cordova `

And to install Ionic: 
` sudo npm install -g ionic `

To install Bower:
` sudo npm install -g bower `

To test app, go to the slugloop/ root folder and use the

` ionic serve `

command to view the web application. 

Use

` ionic serve --lab `

to view the android and ios version running side by side. 

To add for ios and android platform, the process is as follows:

` ionic platform ios `

` ionic platform android `

To build:

` ionic build ios `

` ionic build android `

To test:

` ionic emulate ios `

` ionic run android //for Genymotion `

`  ionic emulate android //for the slower android emulator in the SDK  `

If you're getting

` Error executing "adb devices": ADB server didn't ACK 

   * failed to start daemon * `

Go to Settings in Genymotion > ADB tab > Use custom Android SDK tools and select the path of your Android SDK installation. 

For the adventerous and want to test on your device: 

` ionic run ios `

` ionic run android `

