$(() => {
    console.log(window.location.href);

    //Programming languages mapped to their code in hackerearth api
    var lang_map={                       
        "C":"c_cpp",
        "CPP":"c_cpp",
        "CPP11":"c_cpp",
        "JAVA":"java",
        "JAVASCRIPT":"javascript",
        "PYTHON":"python"
      }

    //Programming languages mapped to their corresponding templates

    
    //setting up the Ace Editor screen

        // when user compiles the code on the editor screen (clicks the compile button) 
        $('#compile').on('click', function(){
            //get data on editor screen
            //var text = editor.getSession().getValue();
            //get data for input 
            var input = $("#compile").val();
            console.log(input);
            //get the programming language
            var lang = $("#language").val();
            console.log(lang);
            //sanitize the text
           // text = text.replace(/\n/g, "\r\n");
            var source = {source: input , lang: lang};
            if(source.source == ''){
                alert("There is no code to compile");
            }
            else
            //send this data to the server 
            $.ajax({
              type: 'POST',
              url: "https://fauxcoder.herokuapp.com/editor",
//              url: "http://localhost:3000/editor",
              data: source,
              success: function(data){
                  
               //   $("#link").text(data.web_link);
                  
                  if(data.compile_status === "OK"){  
                      //code runs successfully - display output
                      $("#outputbox").text("SUCCESS : " + data.run_status.time_used + "\n\n" + data.run_status.output );
                  }else {     
                      //there is some error in the code
                     $("#outputbox").text("COMPILATION ERROR :  " + data.compile_status + "\n\n" + data.run_status.status_detail);
                  }
              }
            });
            return false;
        });
    
})