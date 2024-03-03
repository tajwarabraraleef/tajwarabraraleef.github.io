tablebodyID = "tableBodyProject"


var imageId = "arm_image";
var image1 = "images/Arm_med.jpg";
var image2 = "images/Arm.gif";
var paperTitle = "Robotic Arm";
var descriptiom = "Made this totally from scratch and with no access to any 3D print or any proper tools. The parts were scorched and carved out of plastic sheets with just a box cutter. Rubber from a balloon was stapled onto the gripper for extra grip (my Mom's idea). The 6 servos at each articulation point are controlled with an Arduino Mega board. The program I wrote for this uses inverse kinematics to control the position of the end effector. In the hyperlinked video, the arm is programmed to move to position A, grab the object, take it to position B, rotate it, and drop it.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/zGz-Ilaczoo" target="_blank">Video</a> ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;

var imageId = "firebot_image";
var image1 = "images/firebot.jpg";
var image2 = "images/firebot.gif";
var paperTitle = "Firefighting Bot Concept";
var descriptiom = "Concept of autonomous fire detection and extinguishing. The bot has IR sensors mounted in front that search for fire in the surrounding environment. If a fire is detected, it goes towards it and turns on the extinguisher (for simplicity a fan is used). Once the fire is out, the robot backs up and starts looking around for more possible fires.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/iWBHc8A4hWQ" target="_blank">Video</a> ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;


var imageId = "surv_image";
var image1 = "images/surv.png";
var image2 = "images/surv.gif";
var paperTitle = "Surveillance Robot";
var descriptiom = "Here, I made a custom android controller allowing teleoperation of the robot over Bluetooth with an Android phne. Another Android phone mounted on the robot acts as an IP camera and sends a live video feed to the operator. The robot can also automatically avoid obstacles using its onboard sonar sensor.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/yoHOOmsJTkc" target="_blank">Video</a> ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;

var imageId = "sonar_image";
var image1 = "images/sonar1.jpg";
var image2 = "images/sonar2.gif";
var paperTitle = "Sonar Glasses for the visually impaired";
var descriptiom = "This is a simple concept of using sonar sensors to assist visually impaired people. These sensors were mounted onto glasses that detect if any obstacle is present in the periphery. Based on the position of the object, two vibration motors mounted on each side of the glasses will vibrate with different amplitude- giving haptic feedback to the user and alerting them of nearby objects.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/JOoEmXBZgmg" target="_blank">Video</a> ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;


var imageId = "manbot_image";
var image1 = "images/manbot.png";
var image2 = "images/manbot.gif";
var paperTitle = "Smart Line Follower";
var descriptiom = "In my freshman year, as I just started learning more about electronic logic gates, I decided to make a line follower out of just logic gates and zero programming. Happy with the results, I wanted to see how much intricate stuff can be done with logic gates alone and with no microcontroller. The robot here has 1 bit of memory made from 1 JK flip-flop (also made out of logic gates) which stores the state of the robot. If the robot detects a payload, it will start its journey to the other side of the line. And only after the payload is removed, the robot will automatically return back. Check the ridiculous (and a bit inappropriate) story I made with this robot in the video.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/fsvVbdsJ3fM" target="_blank">Video</a> (warning! contains unfit jokes) ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;


var imageId = "spruce_image";
var image1 = "images/spruce.png";
var image2 = "images/spruce.gif";
var paperTitle = "Rover V3: SpruceBot";
var descriptiom = "Check the rovers below before reading this. Still obsessed with rovers, this was another attempt to make further improvements. This version again got a gripper redesign. In this build, I figured out how to melt and shape empty pen casings to make a stronger gripper as opposed to the popsicle stick method used earlier. The arm was pushed back into the rover- allowing it to lift even heavier loads. Other features I added include an IP camera (using a phone) to stream live video which can also be rotated giving 360 degrees vision during teleoperation. During that time, I also got a fancy camera which I used to film the rover. Check the video where I made a short story using the rover as the hero. Interesting fact: Around that time, I just started to learn about circuits from my A-level physics course. I implemented a circuit in this rover that automatically controls the headlights based on the ambient light and thought it was super cool.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/mjolKfPiag8" target="_blank">Video</a> ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;


var imageId = "rrl2_image";
var image1 = "images/rrl2.png";
var image2 = "images/rrl2.gif";
var paperTitle = "Rover V2: RRL2";
var descriptiom = "This is the updated version of RRL1. After finding success with the electronic side of things, in this build, I focused on improving the mechanical design. Again with no proper tools and materials available, I used things I found around the house. The gripper design was improved substantially and now it could pick up many different items. In the 11 min long video, I show the things I could do with this version (even tried to pick up a pen and draw with it). Interesting fact: I didn't have any servos back then so I made a string pulley system to increase the load capacity of the DC motor that raises the arm.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/xStmz4oaPpU" target="_blank">Video</a> &nbsp|&nbsp <a
                   href="https://youtu.be/XumcbrsZXJE" target="_blank">Short Video</a> ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;


var imageId = "rrl1_image";
var image1 = "images/rrl1.png";
var image2 = "images/rrl1.gif";
var paperTitle = "Rover V1: RRL1";
var descriptiom = "At the age of 14, I became obsessed with rovers after seeing a documentary on NASA's Mars rovers: Spirit and Opportunity. Following that day, I have spent countless hours in my room trying to learn things by myself with the hopes of building my own rover one day. After countless failed iterations, this was the first working prototype. If you observe closely, this was made mostly out of cardboard, popsicle sticks, and foam board. The electronic parts were taken from RC cars. Fun fact: I was so happy with how it turned out that I named it after my high school gf.";
var publisherDetailsLinks =  `
              [ <a href="https://youtu.be/QOROwr7lSEc" target="_blank">Video</a> ]
`;
var tableRowHTML = generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, descriptiom);
document.getElementById(tablebodyID).innerHTML += tableRowHTML;




