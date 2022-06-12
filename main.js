songPeterPan = "";
songHarryPotter = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
songStatus = "";

function setup(){
canvas = createCanvas(700, 550);
canvas.center();
video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotResult);
}

function draw(){
    image(video, 0, 0, 700, 550);
    fill("cornsilk");
    stroke("cornsilk");

    if (scoreleftWrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        console.log(songHarryPotter);
        document.getElementById("song_name").innerHTML = "Song Name: Harry Potter Theme Song";
        songHarryPotter.play();
        songPeterPan.stop();
    }
    else if (scorerightWrist > 0.2){
        circle(rightWrist_x, rightWrist_y, 20);
        console.log(songPeterPan);
        document.getElementById("song_name").innerHTML = "Song Name: Peter Pan Theme Song"; 
        songHarryPotter.stop();
        songPeterPan.play();
    }
}

function preload(){
songPeterPan = loadSound("music2.mp3");
songHarryPotter = loadSound("music.mp3");
}

function modelLoaded(){
    console.log("The PoseNet model is now intialized");
}

function gotResult(results){
    if (results.length > 0){
    console.log(results);
    leftWrist_x = results[0].pose.leftWrist.x;
    leftWrist_y = results[0].pose.leftWrist.y;
    console.log("leftWrist_x = " + leftWrist_x + ", leftWrist_y = " + leftWrist_y);
    rightWrist_x = results[0].pose.rightWrist.x;
    rightWrist_y = results[0].pose.rightWrist.y;
    console.log("rightWrist_x = " + rightWrist_x + ", rightWrist_y = " + rightWrist_y);
    scoreleftWrist = results[0].pose.keypoints[9].score;
    scorerightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreleftWrist = " + scoreleftWrist);
    console.log("scorerightWrist = " + scorerightWrist);
    }
}


