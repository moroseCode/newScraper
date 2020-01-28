$(document).on("click", "#comment-button", function() {
  // Grab the id associated with the article and the text in the text area
  thisId = $("#id-span").text();
  noteText = $("#note-text").val();

  // Save note to DB
  $.ajax({
    method: "POST",
    url: "/comments",
    data: {
      _headlineId: thisId,
      commentText: commentText
    }
  }).then(function(response) {
    // Add list item to modal
    listItem = `<li data-id="${response._id}" class="list-group-item">${noteText} <button id="trash-btn" data-id="${response._id}" class="btn btn-sm float-right"><i class="fas fa-trash-alt"></i></button></li>`;
    $(".list-group").append(listItem);

    // Empty the note-text textarea
    $("#note-text").val("");
  });
});
