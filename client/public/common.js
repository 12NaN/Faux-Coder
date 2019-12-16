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
    var source_template={
          "C" : "#include <stdio.h>\nint main(void) {\n\t// your code goes here\n\treturn 0;\n}",
          "CPP" : "#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}",
          "CPP11" : "#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}",
          "CLOJURE" : "; your code goes here",
          "CSHARP" : "using System;\npublic class Test{\n\tpublic static void Main(){\n\t// your code goes here\n\t}\n}",
          "JAVA" : "/* package whatever; // don't place package name! */\nimport java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\
        /* Name of the class has to be \"Main\" only if the class is public. */\nclass Ideone{\n\t\
        public static void main (String[] args) throws java.lang.Exception{\n\t\t// your code goes here\n\t}\n}",
          "JAVASCRIPT":"// your code goes here",
          "HASKELL":"main = -- your code goes here",
          "PERL":"#!/usr/bin/perl\n# your code goes here",
          "PHP":"<?php\n\n// your code goes here",
          "PYTHON":"# your code goes here",
          "RUBY":"# your code goes here"
        }  
    
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
              url: "http://localhost:3000/",
              data: source,
              success: function(data){
                  
               //   $("#link").text(data.web_link);
                  
                  if(data.compile_status === "OK"){  
                      //code runs successfully - display output
                      $("#outputbox").text("SUCCESS : " + data.run_status.time_used + "\n" + data.run_status.output );
                  }else {     
                      //there is some error in the code
                     $("#outputbox").text("COMPILATION ERROR :  " + data.compile_status + "\n" + data.run_status.status_detail);
                  }
              }
            });
            return false;
        });
    
})