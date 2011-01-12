$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/achievements',
    success: function(res, testStatus) {
      console.log(res);
		for (i in res) {
			$('#list').append('<li>'+i+'</li>');
		}
      }
	});
});
