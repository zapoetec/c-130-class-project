song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
	song = loadSound("music.mp3");
}


function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
  }

  function gotPoses(results)
  {
	if(results.length > 0)
	{
	  console.log(results);
	  leftWristX = results[0].pose.leftWrist.x;
	  leftWristY = results[0].pose.leftWrist.y;
	  console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
      scoreleftwrist=results[0].pose.keypoints[9].score;
	  scorerightwrist=results[0].pose.keypoints[10].score;
	  rightWristX = results[0].pose.rightWrist.x;
	  rightWristY = results[0].pose.rightWrist.y;
	  console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	}
  }
  scoreleftwrist=0;
  scorerightwrist=0;

function draw() {
	image(video, 0, 0, 600, 500);
    fill("red");
    stroke("green");
    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        inNumberleftwristY = Number(leftWristY);
        remove_decimals = floor(inNumberleftwristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume - "+volume;
        song.setVolume(volume);
    }
	if(scorerightwrist>0.2){
		circle(rightWristX,rightWristY,20);
	if(scorerightwrist>0 && scorerightwrist<=100){
		document.getElementById("speed").innerHTML = "0.5x";
		song.rate(0.5);
	}
	else if(scorerightwrist>100 && scorerightwrist<=200){
		document.getElementById("speed").innerHTML = "1x";
		song.rate(1);
	}
	else if(scorerightwrist>200 && scorerightwrist<=300){
		document.getElementById("speed").innerHTML = "1.5x";
		song.rate(1.5);
	}
	else if(scorerightwrist>300 && scorerightwrist<=400){
		document.getElementById("speed").innerHTML = "2x";
		song.rate(2);
	}
	else if(scorerightwrist>400 && scorerightwrist<=500){
		document.getElementById("speed").innerHTML = "2.5x";
		song.rate(2.5);
	}
}
}


function play()
{
	song.play();
	song.setVolume(1);
	song.rate(2);
}