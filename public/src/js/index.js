import "../sass/index.scss";
// show modal
var debtModal = document.getElementById("debtModal");
var credtModal = document.getElementById("debtModal");
window.addEventListener("click", function (event) {
  if (event.target == debtModal) {
    debtModal.style.display = "none";
  }
});
$(".add-debtor").click(function () {
  $("#debtModal").css("display", "block");
});
$(".close").click(function () {
  $("#debtModal").css("display", "none");
});
window.addEventListener("click", function (event) {
  if (event.target == creditModal) {
    creditModal.style.display = "none";
  }
});
$(".add-creditor").click(function () {
  $("#creditModal").css("display", "block");
});
$(".close").click(function () {
  $("#creditModal").css("display", "none");
});



$(document).ready(function () {
  $.ajax({
    url: "/debt",
    type: "GET",
    success: function (data) {
      for (let i = 0; i < data.length; i++){
        console.log(data[i])
      $("#debtCard").append(`
          <div class="custom-card-body d-flex debt">
              <div class="debt-name">${data[i].debt_name}</div>
              <div class="debt-price">${data[i].debt_price}</div>
          </div>
        `);
      }
    },
  });
  $("#saveDebt").click(function () {
    $.ajax({
      url: "/debt",
      type: "POST",
      data: JSON.stringify({
        debt_name: $("#debtorName").val(),
        debt_price: $("#debtorPrice").val(),
      }),
      contentType: "application/JSON",
      success: function () {
        $("#debtCard").append(`
                <div class="custom-card-body d-flex debt">
                    <div class="debt-name">${$("#debtorName").val()}</div>
                    <div class="debt-price">${$("#debtorPrice").val()}</div>
                </div>
            `);
        $("#debtModal").css("display", "none");
        $("#debtorName").val("");
        $("#debtorPrice").val("");
      },
    });
  });
  $.ajax({
    url: "/credit",
    type: "GET",
    success: function (data) {
      for (let i = 0; i < data.length; i++){
        console.log(data[i])
      $("#creditCard").append(`
          <div class="custom-card-body d-flex credt">
              <div class="credit-name">${data[i].credit_name}</div>
              <div class="credit-price">${data[i].credit_price}</div>
          </div>
        `);
      }
    },
  });
  $("#saveCredit").click(function () {
    $.ajax({
      url: "/credit",
      type: "POST",
      data: JSON.stringify({
        credit_name: $("#creditorName").val(),
        credit_price: $("#creditorPrice").val(),
      }),
      contentType: "application/JSON",
      success: function () {
        $("#creditCard").append(`
                <div class="custom-card-body d-flex credit">
                    <div class="credit-name">${$("#creditorName").val()}</div>
                    <div class="credit-price">${$("#creditorPrice").val()}</div>
                </div>
            `);
        $("#creditModal").css("display", "none");
        $("#creditorName").val("");
        $("#creditorPrice").val("");
      },
    });
  });
});
