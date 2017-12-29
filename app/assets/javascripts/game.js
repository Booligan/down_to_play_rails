$(document).on("turbolinks:load",function(){
  attachNextGameListener();
});

function attachNextGameListener(){
  $('#next-game').on('click', function(){
    getNextGame()
  })
};
