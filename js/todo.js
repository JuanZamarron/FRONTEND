var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    url: 'http://localhost:3000/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // agregar código aqui para poner los datos del todolist en el el html
        var ul = document.getElementById('todo-list');
        var li = document.createElement('li');
        var span = document.createElement("span");
        let length = document.getElementsByTagName("li").length;
      
        var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "todo";
            checkbox.value = i;

        span.appendChild(document.createTextNode(`${data[i].description}`));
        li.appendChild(checkbox);
        li.appendChild(span);
        ul.appendChild(li);
        
        console.log(data[i].description)
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'http://localhost:3000/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        var text = document.getElementById('newitem');
        // agregar código aqui para poner los datos del todolist en el el html
        var ul = document.getElementById('todo-list');
            var li = document.createElement('li');
            var span = document.createElement("span");
            let length = document.getElementsByTagName("li").length;
            

            var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "todo";
                checkbox.value = length+1;

            
            span.appendChild(document.createTextNode(`${text.value}`));
            li.appendChild(checkbox);
            li.appendChild(span);
            ul.appendChild(li);
            text.value="";
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }
})


function addTodo(id, todoText, completed) {
  
}
