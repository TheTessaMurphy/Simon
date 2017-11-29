$( document ).ready(function(){
  var varStrict; 
  var varPlay = 0; 
  var arrStore = [];
  
 $("#counter").html(0);
 $("#cover").slideUp("fast");
 /*  *  *  *  S T A R T *  *  *  */ 
  $("#start").click(function(){
    varStrict = document.getElementById("chkStrict").checked;
    varStrict == true?$(".section").css({"color": "#B22222"}):$(".section").css({"color": "black"});
    var arrPlay = [];
    var stepCount = 1;
 
    $("#chkStrict").attr("disabled", true);
    getStrict(arrPlay, stepCount);
    $("#chkStrict").attr("disabled", true);
  });

  /*  *  *  * G E T S T R I C T *  *  *  */
 
  function getStrict(arrPlay, stepCount){
    $("#counter").html(stepCount); 
    var rand = getRandom()
    arrPlay.push(rand); 
    runPattern(arrPlay, stepCount);
  }  
     
  /*  *  *  * G E T N 0 T S T R I C T *  *  *  */
  
  function getNotStrict(arrPlay, stepCount){
  
    $("#counter").html(stepCount);
    
    if (stepCount <= arrStore.length){
      
      var n = stepCount - 1;
      var item = arrStore[n];
      arrPlay.push(item);
      
    }else {
        var rand = getRandom()
        arrPlay.push(rand); 
    }
    
  runPattern(arrPlay, stepCount);
  
  }
  
 
 
  
  /*  *  *  *  R U N P A T T E R N * * * */
  function runPattern(arrPlay, stepCount){ 
  
    var id = 0; //array item
    var i = 0;  //iterates through array 
    
    var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
     
     
     
     var si = setInterval(function(){ 
      if (i == arrPlay.length){
        i = 0;
        clearInterval(si,  
        play(arrPlay, stepCount))
      }else{
      
      
        clr = arrPlay[id];
        clrActive = "active"  + arrPlay[id];
 
        $("#" + arrPlay[id]).addClass(clrActive);
       
        var x = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + arrPlay[id] + '.mp3');
        x.play();
        
        setTimeout(function(){ 
          $("#" + clr).removeClass(clrActive);
        }, 250);   

        id++;
        i++;
      }
    }, 900);
     
  }//runPattern
  
  /* * * * P L A Y * * * */  
  function play(arrPlay, stepCount){
  
    
    var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');  
   
    n = 0;
    
    $(".push").unbind('click').click(function(){
     
      var id = this.id
     
      var x = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + this.id + '.mp3');
      x.play();
      
      if (id == arrPlay[n]){
      n++
      
      } else{
      var audio = new Audio('https://res.cloudinary.com/tmurphy/video/upload/v1506918325/186896__mrmacross__negativebuzz_g8r1mb.mp3');
      setTimeout(function(){
      audio.play();
      if (varStrict == true){
        var msg = "Nope";
        $("#cover").html(msg).css({"visibility":"visible"}).slideDown("slow")
        setTimeout(function(){
          $("#cover").slideUp("slow", function (){location.reload(true);})

        }, 8000);

          }else {
            
            var msg = "Almost...";
            $("#cover").html(msg).css({"visibility":"visible"}).slideDown("slow")
            varPlay = 1;
            stepCount = 1;
            arrStore = arrPlay;
            arrPlay = [];
            setTimeout(function(){
            $("#cover").slideUp("slow", function (){getNotStrict(arrPlay, stepCount);})
            
           }, 8000);
            
            
         }
      }, 500);
          
      }
      
      if (n == arrPlay.length){
      //***************************
        if (stepCount == 20){
          var audio = new Audio('https://res.cloudinary.com/tmurphy/video/upload/v1506904844/robinhood.wav');
          setTimeout(function(){
            audio.play();
            var msg = "You Won!!!!!";
            $("#cover").html(msg).css({"visibility":"visible"}).slideDown("slow");
            setTimeout(function(){
          $("#cover").slideUp("slow", function (){location.reload(true);})

        }, 8000);
          }, 500);
          
        }else {
     //*********   
        //n = 0;
        stepCount++
        setTimeout(function(){
           if (varPlay == 0 || varStrict == true){
              getStrict(arrPlay, stepCount);
           }else {
              getNotStrict(arrPlay, stepCount)
          }
        }, 500)
      }
     } 
       
    }); 
  } 
    /* *  *  *  G E T R A N D O M *  *  *  */
    function getRandom(){
      var n = Math.floor((Math.random() * 4) + 1); 
      return n;
    }
    
    /*  *  *  * S T O P  B U T T O N *  *  *  */
    $("#stop").click(function(){
      
      location.reload(true);
      
    });
});

