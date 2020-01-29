$(document).on("click", "#save-button", function() {
  // Grab the id associated with the article and the text in the text area
  commentsText = $("#commentArea").val();
  console.log("comment button pressed");

  // Save note to DB
  $.ajax({
    method: "POST",
    url: "/comments",
    data: {
      _headlinesId: thisId,
      commentsText: commentsText
    }
  }).then(function(response) {
    console.log(response);
    // Add comments to headline card
    commentsItem = `<p data-id="${response._id}">${commentsText} <button id="delete-btn" data-id="${response._id}" class="btn btn-sm float-right">Delete</button></p>`;
    $("#commentArea").append(commentsItem);

    // Empty the note-text textarea
    $(".newComment").val("");
    window.location.reload();
  });
});

$(document).on("click", ".comment-button", function() {
  event.preventDefault();
  thisId = $(this).attr("id");
  $(".modal-title").html(
    'Comments for Article: <span id="id-span">' + thisId + "</span>"
  );
  $("#comments-modal").show();
});

$(document).on("click", ".delete-button", function() {
  event.preventDefault();
  thisId = $(this).attr("data-id");

  $.ajax({
    method: "Delete",
    url: "/comments/" + thisId
  }).then(function(response) {
    window.location.reload();
  });
});

// $(document).ready(function() {
//   $.ajax({
//     method:"GET",
//     url: "/comments"
//   }).then(function(response) {
//     $('.newComment').each(function(i, obj) {
//       for(x=0; x < response.length; x++) {
//       if($(this).attr('data-id') == response[x]._headlinesId) {
//         commentsItem = `<p data-id="${response[x]._id}">${response[x].commentsText} <button id="delete-btn" data-id="${response[x]._id}" class="btn btn-sm float-right">Delete</button></p>`;
//         commentId = _headlinesId
//         $("#"+ commentId).append(commentsItem);
//       }
//       }
//   });

//     // Empty the note-text textarea
//     $(".newComment").val("");
//   });
// });
