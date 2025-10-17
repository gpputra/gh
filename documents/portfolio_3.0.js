// Update the status dynamically every minute (customUiInit)
let onlineStatusInterval;
let consoleCheckInterval;

function customUiInit() {
  function customInitNavigation() {
    //Tabs
    $("#grid-tab").on("click", function () {
      $(".view-option").removeClass("is--active");
      $(this).addClass("is--active");
      $(".list-view-panel").css("display", "none");
      $(".grid-view-panel").css("display", "block");
      $(".column-view-panel").css("display", "none");
      $(".navigation-grid-view-back-button").removeClass("is--hidden");
    });
    $("#list-tab").on("click", function () {
      $(".view-option").removeClass("is--active");
      $(this).addClass("is--active");
      $(".grid-view-panel").css("display", "none");
      $(".list-view-panel").css("display", "block");
      $(".column-view-panel").css("display", "none");
      $(".navigation-grid-view-back-button").addClass("is--hidden");
    });
    $("#column-tab").on("click", function () {
      $(".view-option").removeClass("is--active");
      $(this).addClass("is--active");
      $(".grid-view-panel").css("display", "none");
      $(".list-view-panel").css("display", "none");
      $(".column-view-panel").css("display", "block");
      $(".navigation-grid-view-back-button").addClass("is--hidden");
    });

    //grid-view folders logic
    $(".grid-folder-large").on("click", function () {
      $(".grid-folder-large").css("background", "transparent");
      $(this).css("background", "var(--colors--light-grey-30)");
    });
    $(".grid-file-large").on("click", function () {
      $(".grid-file-large").removeClass("is--active");
      $(this).addClass("is--active");
    });
    $(".grid-folder-large").on("dblclick", function () {
      $(".grid-folder-large").css("background", "transparent");
    });

    //Mirror active item click
    window.itemsMirrorClick = function () {
      // Remove any existing handlers to prevent duplication
      $(".grid-file-large, .list-folder-item, .column-folder-item").off(
        "click.itemMirror"
      );

      // Use event delegation for better performance
      $(document).on(
        "click.itemMirror",
        ".grid-file-large, .list-folder-item, .column-folder-item",
        function () {
          // Determine which collection was clicked
          let collection = "";
          let element = $(this);

          if (element.hasClass("grid-file-large")) {
            collection = ".grid-file-large";
          } else if (element.hasClass("list-folder-item")) {
            collection = ".list-folder-item";
          } else if (element.hasClass("column-folder-item")) {
            collection = ".column-folder-item";
          }

          let currentFileIndex = element.index(collection);

          // Remove active class from all items
          $(
            ".grid-file-large, .list-folder-item, .column-folder-item"
          ).removeClass("is--active");

          // Add active class to corresponding items
          $(".grid-file-large").eq(currentFileIndex).addClass("is--active");
          $(".list-folder-item").eq(currentFileIndex).addClass("is--active");
          $(".column-folder-item").eq(currentFileIndex).addClass("is--active");
        }
      );
    };
    itemsMirrorClick();

    //Grid View Logic
    //Grid View level one folders
    //Work
    $("#work-folder").on("dblclick", function () {
      $(".grid-view-level-two-folders").toggleClass("is--active");
      $(".grid-view-top-level-folders").toggleClass("is--active");

      $("#list-work-folder").addClass("is--active");
      $("#column-folder-work, #column-work-subfolder").addClass("is--active");

      $(".navigation-grid-view-back-button")
        .addClass("is--visible")
        .attr("id", "back-button-work");
      $(".navigation-grid-view-back-button p").text("/");
    });
    //Spotify
    $("#spotify-playlists-folder").on("dblclick", function () {
      $(".grid-view-spotify-playlists").toggleClass("is--active");
      $(".grid-view-top-level-folders").toggleClass("is--active");

      $("#list-spotify-folder").addClass("is--active");
      $("#column-folder-spotify, #column-spotify-subfolder").addClass(
        "is--active"
      );

      $(".navigation-grid-view-back-button")
        .addClass("is--visible")
        .attr("id", "back-button-work");
      $(".navigation-grid-view-back-button p").text("/");
    });

    //Grid View level two folders
    //About
    $("#about-folder").on("dblclick", function () {
      $(".grid-view-about-folder-content").toggleClass("is--active");
      $(".grid-view-level-two-folders").toggleClass("is--active");

      $("#list-about-folder").addClass("is--active");
      $("#column-folder-about, #column-about-content").addClass("is--active");

      $(".navigation-grid-view-back-button").attr("id", "back-button-about");
      $(".navigation-grid-view-back-button p").text("All Folders");
    });
    //Projects
    $("#projects-folder").on("dblclick", function () {
      $(".grid-view-projects-folder-content").toggleClass("is--active");
      $(".grid-view-level-two-folders").toggleClass("is--active");

      $("#list-projects-folder").addClass("is--active");
      $("#column-folder-projects, #column-projects-content").addClass(
        "is--active"
      );

      $(".navigation-grid-view-back-button").attr("id", "back-button-projects");
      $(".navigation-grid-view-back-button p").text("All Folders");
    });
    //Images
    $("#images-folder").on("dblclick", function () {
      $(".grid-view-images-folder-subfolders").toggleClass("is--active");
      $(".grid-view-level-two-folders").toggleClass("is--active");

      $("#list-images-folder").addClass("is--active");
      $("#column-folder-images, #column-images-content").addClass("is--active");

      $(".navigation-grid-view-back-button").attr("id", "back-button-images");
      $(".navigation-grid-view-back-button p").text("All Folders");
    });

    //Grid View level Three folders
    //AI Images
    $("#ai-images-folder").on("dblclick", function () {
      $("#ai-images-content").toggleClass("is--active");
      $(".grid-view-images-folder-subfolders").toggleClass("is--active");

      $("#list-ai-images-folder").addClass("is--active");
      $("#column-folder-ai-images, #column-ai-images-content").addClass(
        "is--active"
      );

      $(".navigation-grid-view-back-button").attr(
        "id",
        "back-button-ai-images"
      );
      $(".navigation-grid-view-back-button p").text("Images");
    });
    //Unsplash images
    $("#unsplash-images-folder").on("dblclick", function () {
      $("#unsplash-content").toggleClass("is--active");
      $(".grid-view-images-folder-subfolders").toggleClass("is--active");

      $("#list-unsplash-images-folder").addClass("is--active");
      $(
        "#column-folder-unsplash-images, #column-unsplash-images-content"
      ).addClass("is--active");

      $(".navigation-grid-view-back-button").attr(
        "id",
        "back-button-unsplash-images"
      );
      $(".navigation-grid-view-back-button p").text("Images");
    });

    //List View Logic
    $(".list-folder-small").on("click", function () {
      $(this).parent().toggleClass("is--active");
      $(this).parent().siblings().removeClass("is--active");
    });
    $(".list-folder-item").on("click", function () {
      $(".list-folder-item").removeClass("is--active");
      $(this).addClass("is--active");
    });
    //All Folders
    $("#list-work-folder > .list-folder-small").on("click", function () {
      $(".grid-view-top-level-folders").toggleClass(
        "is--active",
        !$("#list-work-folder").hasClass("is--active")
      );
      $(".grid-view-level-two-folders").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          !$(".list-view-level-two-folder").hasClass("is--active")
      );
      $(
        "#about-folder-content, #projects-folder-content, #images-folder-content, #ai-images-content, #unsplash-content, #spotify-playlists"
      ).removeClass("is--active");
      $("#about-folder-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-about-folder").hasClass("is--active")
      );
      $("#projects-folder-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-projects-folder").hasClass("is--active")
      );
      $("#images-folder-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active") &&
          !$(".list-view-level-three-folder").hasClass("is--active")
      );
      $("#ai-images-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active") &&
          $("#list-ai-images-folder").hasClass("is--active")
      );
      $("#unsplash-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active") &&
          $("#list-unsplash-images-folder").hasClass("is--active")
      );
      $(".navigation-grid-view-back-button").attr(
        "id",
        "back-button-work",
        $("#list-work-folder").hasClass("is--active") &&
          !$(".list-view-level-two-folder").hasClass("is--active")
      );
      $(".navigation-grid-view-back-button p").text(
        "/",
        $("#list-work-folder").hasClass("is--active") &&
          !$(".list-view-level-two-folder").hasClass("is--active")
      );

      $("#column-folder-work, #column-work-subfolder").toggleClass(
        "is--active"
      );
      $(
        "#column-folder-spotify, #column-spotify-subfolder, #column-folder-ai-images, #column-ai-images-content, #column-folder-unsplash-images, #column-unsplash-images-content, #column-folder-projects, #column-projects-content, #column-folder-about, #column-about-content, #column-folder-images, #column-images-content"
      ).removeClass("is--active");
      $("#column-folder-about, #column-about-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-about-folder").hasClass("is--active")
      );
      $("#column-folder-projects, #column-projects-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-projects-folder").hasClass("is--active")
      );
      $("#column-folder-images, #column-images-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active")
      );
      $("#column-folder-ai-images, #column-ai-images-content").toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active") &&
          $("#list-ai-images-folder").hasClass("is--active")
      );
      $(
        "#column-folder-unsplash-images, #column-unsplash-images-content"
      ).toggleClass(
        "is--active",
        $("#list-work-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active") &&
          $("#list-unsplash-images-folder").hasClass("is--active")
      );

      if (
        $("#list-work-folder").hasClass("is--active") &&
        !$("#list-work-folder").hasClass("active-work-content") &&
        !$("#list-work-folder").hasClass("active-img-content")
      ) {
        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
      } else if (
        $("#list-work-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-work-content") &&
        $("#list-about-folder").hasClass("is--active") &&
        !$("#list-work-folder").hasClass("active-img-content")
      ) {
        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr("id", "back-button-about");
        $(".navigation-grid-view-back-button p").text("All Folders");
      } else if (
        $("#list-work-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-work-content") &&
        $("#list-projects-folder").hasClass("is--active") &&
        !$("#list-work-folder").hasClass("active-img-content")
      ) {
        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr(
          "id",
          "back-button-projects"
        );
        $(".navigation-grid-view-back-button p").text("All Folders");
      } else if (
        $("#list-work-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-work-content") &&
        $("#list-images-folder").hasClass("is--active") &&
        !$("#list-work-folder").hasClass("active-img-content")
      ) {
        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr("id", "back-button-images");
        $(".navigation-grid-view-back-button p").text("All Folders");
      } else if (
        $("#list-work-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-work-content") &&
        $("#list-ai-images-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-img-content")
      ) {
        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr(
          "id",
          "back-button-ai-images"
        );
        $(".navigation-grid-view-back-button p").text("Images");
      } else if (
        $("#list-work-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-work-content") &&
        $("#list-unsplash-images-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-img-content")
      ) {
        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr(
          "id",
          "back-button-unsplash-images"
        );
        $(".navigation-grid-view-back-button p").text("Images");
      } else if (
        $("#list-work-folder").hasClass("is--active") &&
        $("#list-work-folder").hasClass("active-work-content")
      ) {
        $(".navigation-grid-view-back-button").addClass("is--visible");
      } else {
        $(".navigation-grid-view-back-button").removeAttr("id");
        $(".navigation-grid-view-back-button").removeClass("is--visible");
      }
    });
    //Spotify
    $("#list-spotify-folder > .list-folder-small").on("click", function () {
      $(".navigation-grid-view-back-button").addClass("is--visible");
      $(".grid-view-spotify-playlists").toggleClass("is--active");
      $(".grid-view-top-level-folders").toggleClass(
        "is--active",
        !$("#list-spotify-folder").hasClass("is--active")
      );
      $(".grid-view-level-two-folders").removeClass("is--active");
      $(
        "#about-folder-content, #projects-folder-content, #images-folder-content, #ai-images-content, #unsplash-content, .grid-view-level-two-folders"
      ).removeClass("is--active");

      $(
        "#column-folder-work, #column-work-subfolder, #column-folder-ai-images, #column-ai-images-content, #column-folder-unsplash-images, #column-unsplash-images-content, #column-folder-projects, #column-projects-content, #column-folder-about, #column-about-content, #column-folder-images, #column-images-content"
      ).removeClass("is--active");
      $("#column-folder-spotify, #column-spotify-subfolder").toggleClass(
        "is--active"
      );

      if ($("#list-spotify-folder").hasClass("is--active")) {
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
      } else {
        $(".navigation-grid-view-back-button").removeAttr("id");
        $(".navigation-grid-view-back-button").removeClass("is--visible");
      }
    });

    //About folder
    $("#list-about-folder > .list-folder-small").on("click", function () {
      $("#list-work-folder").toggleClass(
        "active-work-content",
        $(".list-view-level-two-folder").hasClass("is--active")
      );
      $(".grid-view-about-folder-content").toggleClass(
        "is--active",
        $("#list-about-folder").hasClass("is--active")
      );
      $(".grid-view-level-two-folders").toggleClass(
        "is--active",
        !$("#list-about-folder").hasClass("is--active")
      );
      $(
        "#projects-folder-content, #images-folder-content, .grid-view-images-subfolder-content"
      ).removeClass("is--active");

      $("#column-folder-about, #column-about-content").toggleClass(
        "is--active"
      );
      $("#column-folder-projects, #column-projects-content").removeClass(
        "is--active"
      );
      $("#column-folder-images, #column-images-content").removeClass(
        "is--active"
      );

      if ($("#list-about-folder").hasClass("is--active")) {
        $(".navigation-grid-view-back-button").attr("id", "back-button-about");
        $(".navigation-grid-view-back-button p").text("All Folders");
      } else {
        $(".navigation-grid-view-back-button").removeAttr("id");
        $(".navigation-grid-view-back-button p").text("s");
      }
    });

    //Projects folder
    $("#list-projects-folder > .list-folder-small").on("click", function () {
      $("#list-work-folder").toggleClass(
        "active-work-content",
        $(".list-view-level-two-folder").hasClass("is--active")
      );
      $(".grid-view-projects-folder-content").toggleClass(
        "is--active",
        $("#list-projects-folder").hasClass("is--active")
      );
      $(".grid-view-level-two-folders").toggleClass(
        "is--active",
        !$("#list-projects-folder").hasClass("is--active")
      );
      $(
        "#about-folder-content, #images-folder-content, .grid-view-images-subfolder-content"
      ).removeClass("is--active");

      $("#column-folder-projects, #column-projects-content").toggleClass(
        "is--active"
      );
      $("#column-folder-about, #column-about-content").removeClass(
        "is--active"
      );
      $("#column-folder-images, #column-images-content").removeClass(
        "is--active"
      );

      if ($("#list-projects-folder").hasClass("is--active")) {
        $(".navigation-grid-view-back-button").attr(
          "id",
          "back-button-projects"
        );
        $(".navigation-grid-view-back-button p").text("All Folders");
      } else {
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
      }
    });

    //Images folder
    $("#list-images-folder > .list-folder-small").on("click", function () {
      $("#list-work-folder").toggleClass(
        "active-work-content",
        $(".list-view-level-two-folder").hasClass("is--active")
      );
      $(".grid-view-images-folder-subfolders").toggleClass(
        "is--active",
        $("#list-images-folder").hasClass("is--active") &&
          !$("#list-ai-images-folder").hasClass("is--active") &&
          !$("#list-unsplash-images-folder").hasClass("is--active")
      );
      $(".grid-view-level-two-folders").toggleClass(
        "is--active",
        !$("#list-images-folder").hasClass("is--active")
      );
      $("#ai-images-content").toggleClass(
        "is--active",
        $("#list-ai-images-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active")
      );
      $("#unsplash-content").toggleClass(
        "is--active",
        $("#list-unsplash-images-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active")
      );
      $("#about-folder-content, #projects-folder-content").removeClass(
        "is--active",
        $(".grid-view-level-two-folders").hasClass("is--active")
      );

      $("#column-folder-images, #column-images-content").toggleClass(
        "is--active"
      );
      $("#column-folder-projects, #column-projects-content").removeClass(
        "is--active"
      );
      $("#column-folder-about, #column-about-content").removeClass(
        "is--active"
      );

      if (
        $("#list-ai-images-folder").hasClass("is--active") &&
        $("#list-images-folder").hasClass("is--active")
      ) {
        $(".navigation-grid-view-back-button").attr(
          "id",
          "back-button-ai-images"
        );
        $(".navigation-grid-view-back-button p").text("Images");
      } else if (
        $("#list-unsplash-images-folder").hasClass("is--active") &&
        $("#list-images-folder").hasClass("is--active")
      ) {
        $(".navigation-grid-view-back-button").attr(
          "id",
          "back-button-unsplash-images"
        );
        $(".navigation-grid-view-back-button p").text("Images");
      } else if (!$("#list-images-folder").hasClass("is--active")) {
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
      } else {
        $(".navigation-grid-view-back-button").attr("id", "back-button-images");
        $(".navigation-grid-view-back-button p").text("All Folders");
      }
    });

    //AI Images folder
    $("#list-ai-images-folder > .list-folder-small").on("click", function () {
      $("#list-work-folder").toggleClass(
        "active-img-content",
        $(".list-view-level-three-folder").hasClass("is--active")
      );
      $("#ai-images-content").toggleClass("is--active");
      $("#unsplash-content").toggleClass(
        "is--active",
        $("#list-unsplash-images-folder").hasClass("is--active")
      );
      $("#images-folder-content").toggleClass(
        "is--active",
        !$("#list-ai-images-folder").hasClass("is--active")
      );
      $(".grid-view-level-two-folders").toggleClass(
        "is--active",
        !$("#list-images-folder").hasClass("is--active")
      );

      $("#column-folder-ai-images, #column-ai-images-content").toggleClass(
        "is--active"
      );
      $(
        "#column-folder-unsplash-images, #column-unsplash-images-content"
      ).removeClass("is--active");

      if (
        $("#list-ai-images-folder").hasClass("is--active") &&
        $("#list-images-folder").hasClass("is--active")
      ) {
        $(".navigation-grid-view-back-button").attr(
          "id",
          "back-button-ai-images"
        );
        $(".navigation-grid-view-back-button p").text("Images");
      } else {
        $(".navigation-grid-view-back-button").attr("id", "back-button-images");
        $(".navigation-grid-view-back-button p").text("All Folders");
      }
    });

    //Unsplash Images folder
    $("#list-unsplash-images-folder > .list-folder-small").on(
      "click",
      function () {
        $("#list-work-folder").toggleClass(
          "active-img-content",
          $(".list-view-level-three-folder").hasClass("is--active")
        );
        $("#unsplash-content").toggleClass("is--active");
        $("#ai-images-content").toggleClass(
          "is--active",
          $("#list-ai-images-folder").hasClass("is--active")
        );
        $("#images-folder-content").toggleClass(
          "is--active",
          !$("#list-unsplash-images-folder").hasClass("is--active")
        );
        $(".grid-view-level-two-folders").toggleClass(
          "is--active",
          !$("#list-images-folder").hasClass("is--active")
        );

        $(
          "#column-folder-unsplash-images, #column-unsplash-images-content"
        ).toggleClass("is--active");
        $("#column-folder-ai-images, #column-ai-images-content").removeClass(
          "is--active"
        );

        if (
          $("#list-unsplash-images-folder").hasClass("is--active") &&
          $("#list-images-folder").hasClass("is--active")
        ) {
          $(".navigation-grid-view-back-button").attr(
            "id",
            "back-button-unsplash-images"
          );
          $(".navigation-grid-view-back-button p").text("Images");
        } else {
          $(".navigation-grid-view-back-button").attr(
            "id",
            "back-button-images"
          );
          $(".navigation-grid-view-back-button p").text("All Folders");
        }
      }
    );

    //Column View Logic
    $(".column-folder-item").on("click", function () {
      $(".column-folder-item").removeClass("is--active");
      $(this).addClass("is--active");
    });

    $("#column-folder-work").on("click", function () {
      if (!$(this).hasClass("is--active")) {
        $(".column-folder-small").removeClass("is--active");
        $(this).addClass("is--active");
        $("#column-work-subfolder").addClass("is--active");
        $("#column-spotify-subfolder").removeClass("is--active");
        $(".column-view-level-three-folder").removeClass("is--active");
        $(".column-view-level-three-folder .column-folder-small").removeClass(
          "is--active"
        );
        $(".column-ai-images-content").removeClass("is--active");
        $(".column-unsplash-images-content").removeClass("is--active");

        $(".grid-view-top-level-folders").removeClass("is--active");
        $(".grid-view-level-two-folders").addClass("is--active");
        $("#list-work-folder").addClass("is--active");
        $(".grid-view-spotify-playlists").removeClass("is--active");
        $("#list-spotify-folder").removeClass("is--active");

        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
      }
    });

    $("#column-folder-spotify").on("click", function () {
      if (!$(this).hasClass("is--active")) {
        $(".column-folder-small").removeClass("is--active");
        $(this).addClass("is--active");
        $("#column-work-subfolder").removeClass("is--active");
        $("#column-spotify-subfolder").addClass("is--active");
        $(".column-view-level-three-folder").removeClass("is--active");
        $(".column-view-level-three-folder .column-folder-small").removeClass(
          "is--active"
        );
        $(".column-ai-images-content").removeClass("is--active");
        $(".column-unsplash-images-content").removeClass("is--active");

        $(
          ".grid-view-top-level-folders, .grid-view-level-two-folders, .grid-view-about-folder-content, .grid-view-projects-folder-content, .grid-view-images-folder-subfolders, #ai-images-content, #unsplash-content"
        ).removeClass("is--active");
        $(
          "#list-work-folder, #list-about-folder, #list-projects-folder, #list-images-folder, #list-ai-images-folder, #list-unsplash-images-folder"
        ).removeClass("is--active");
        $(".grid-view-spotify-playlists").addClass("is--active");
        $("#list-spotify-folder").addClass("is--active");

        $(".navigation-grid-view-back-button").addClass("is--visible");
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
      }
    });

    $("#column-folder-about").on("click", function () {
      $("#column-work-subfolder .column-folder-small").removeClass(
        "is--active"
      );
      $(this).addClass("is--active");
      $(".column-view-level-three-folder").removeClass("is--active");
      $("#column-about-content").addClass("is--active");
      $(".column-view-level-three-folder .column-folder-small").removeClass(
        "is--active"
      );
      $(".column-ai-images-content").removeClass("is--active");
      $(".column-unsplash-images-content").removeClass("is--active");

      $(".grid-view-about-folder-content").addClass("is--active");
      $(
        ".grid-view-images-folder-subfolders, .grid-view-projects-folder-content, #ai-images-content, #unsplash-content"
      ).removeClass("is--active");
      $(".grid-view-level-two-folders").removeClass("is--active");
      $("#list-about-folder").addClass("is--active");
      $(
        "#list-projects-folder, #list-images-folder, #list-ai-images-folder, #list-unsplash-images-folder"
      ).removeClass("is--active");

      $(".navigation-grid-view-back-button").attr("id", "back-button-about");
      $(".navigation-grid-view-back-button p").text("All Folders");
    });

    $("#column-folder-projects").on("click", function () {
      $("#column-work-subfolder .column-folder-small").removeClass(
        "is--active"
      );
      $(this).addClass("is--active");
      $(".column-view-level-three-folder").removeClass("is--active");
      $("#column-projects-content").addClass("is--active");
      $(".column-view-level-three-folder .column-folder-small").removeClass(
        "is--active"
      );
      $(".column-ai-images-content").removeClass("is--active");
      $(".column-unsplash-images-content").removeClass("is--active");

      $(".grid-view-projects-folder-content").addClass("is--active");
      $(
        ".grid-view-images-folder-subfolders, .grid-view-about-folder-content, #ai-images-content, #unsplash-content"
      ).removeClass("is--active");
      $(".grid-view-level-two-folders").removeClass("is--active");
      $("#list-projects-folder").addClass("is--active");
      $(
        "#list-about-folder, #list-images-folder, #list-ai-images-folder, #list-unsplash-images-folder"
      ).removeClass("is--active");

      $(".navigation-grid-view-back-button").attr("id", "back-button-projects");
      $(".navigation-grid-view-back-button p").text("Work");
    });

    $("#column-folder-images").on("click", function () {
      $("#column-work-subfolder .column-folder-small").removeClass(
        "is--active"
      );
      $(this).addClass("is--active");
      $(".column-view-level-three-folder").removeClass("is--active");
      $("#column-images-content").addClass("is--active");

      $(".grid-view-images-folder-subfolders").addClass("is--active");
      $(
        ".grid-view-projects-folder-content, .grid-view-about-folder-content"
      ).removeClass("is--active");
      $(".grid-view-level-two-folders").removeClass("is--active");
      $("#list-images-folder").addClass("is--active");
      $("#list-projects-folder, #list-about-folder").removeClass("is--active");

      $(".navigation-grid-view-back-button").attr("id", "back-button-images");
      $(".navigation-grid-view-back-button p").text("Work");
    });

    $("#column-folder-ai-images").on("click", function () {
      $("#column-images-content .column-folder-small").removeClass(
        "is--active"
      );
      $(this).addClass("is--active");
      $("#column-unsplash-images-content").removeClass("is--active");
      $("#column-ai-images-content").addClass("is--active");

      $("#images-folder-content").removeClass("is--active");
      $("#ai-images-content").addClass("is--active");
      $("#unsplash-content").removeClass("is--active");

      $("#list-ai-images-folder").addClass("is--active");
      $("#list-unsplash-images-folder").removeClass("is--active");

      $(".navigation-grid-view-back-button").attr(
        "id",
        "back-button-ai-images"
      );
      $(".navigation-grid-view-back-button p").text("Images");
    });

    $("#column-folder-unsplash-images").on("click", function () {
      $("#column-images-content .column-folder-small").removeClass(
        "is--active"
      );
      $(this).addClass("is--active");
      $("#column-unsplash-images-content").addClass("is--active");
      $("#column-ai-images-content").removeClass("is--active");

      $("#images-folder-content").removeClass("is--active");
      $("#ai-images-content").removeClass("is--active");
      $("#unsplash-content").addClass("is--active");

      $("#list-ai-images-folder").removeClass("is--active");
      $("#list-unsplash-images-folder").addClass("is--active");

      $(".navigation-grid-view-back-button").attr(
        "id",
        "back-button-unsplash-images"
      );
      $(".navigation-grid-view-back-button p").text("Images");
    });

    //"Back Button" logic
    $(".navigation-grid-view-back-button").on("click", function () {
      if ($(this).attr("id") === "back-button-work") {
        $(".grid-view-top-level-folders").toggleClass("is--active");
        $(".grid-view-level-two-folders").removeClass("is--active");
        $(".grid-view-spotify-playlists").removeClass("is--active");
        $("#list-work-folder, #list-spotify-folder").removeClass("is--active");
        $(
          "#column-folder-work, #column-work-subfolder, #column-folder-spotify, #column-spotify-subfolder"
        ).removeClass("is--active");
        $(this).removeClass("is--visible");
      } else if ($(this).attr("id") === "back-button-about") {
        $(".grid-view-about-folder-content").toggleClass("is--active");
        $(".grid-view-level-two-folders").toggleClass("is--active");
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
        $(
          "#list-about-folder, #column-folder-about, #column-about-content"
        ).removeClass("is--active");
      } else if ($(this).attr("id") === "back-button-projects") {
        $(".grid-view-projects-folder-content").toggleClass("is--active");
        $(".grid-view-level-two-folders").toggleClass("is--active");
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
        $(
          "#list-projects-folder, #column-projects-content, #column-folder-projects"
        ).removeClass("is--active");
      } else if ($(this).attr("id") === "back-button-images") {
        $(".grid-view-images-folder-content").toggleClass("is--active");
        $(".grid-view-level-two-folders").toggleClass("is--active");
        $(".grid-view-images-folder-subfolders").toggleClass("is--active");
        $(".navigation-grid-view-back-button").attr("id", "back-button-work");
        $(".navigation-grid-view-back-button p").text("/");
        $(
          "#list-images-folder, #column-images-content, #column-folder-images"
        ).removeClass("is--active");
      } else if ($(this).attr("id") === "back-button-ai-images") {
        $("#ai-images-content").toggleClass("is--active");
        $(".grid-view-images-folder-subfolders").toggleClass("is--active");
        $(".navigation-grid-view-back-button").attr("id", "back-button-images");
        $(".navigation-grid-view-back-button p").text("Work");
        $(
          "#list-ai-images-folder, #column-ai-images-content, #column-folder-ai-images"
        ).removeClass("is--active");
      } else if ($(this).attr("id") === "back-button-unsplash-images") {
        $("#unsplash-content").toggleClass("is--active");
        $(".grid-view-images-folder-subfolders").toggleClass("is--active");
        $(".navigation-grid-view-back-button").attr("id", "back-button-images");
        $(".navigation-grid-view-back-button p").text("Work");
        $(
          "#list-unsplash-images-folder, #column-unsplash-images-content, #column-folder-unsplash-images"
        ).removeClass("is--active");
      }
    });
  }

  function loginForm() {
    // Check session and restore projects on init
    checkSessionAndRestoreProjects();

    // Function to check session and restore projects
    function checkSessionAndRestoreProjects() {
      const isAuthenticated =
        sessionStorage.getItem("isAuthenticated") === "true";
      const projectsData = sessionStorage.getItem("projectsData");

      if (isAuthenticated && projectsData) {
        const projects = JSON.parse(projectsData);

        // Hide login forms and show project containers
        const loginContainers = document.querySelectorAll(".login-container");
        const projectContainers = document.querySelectorAll(
          ".projects-container:not(.grid)"
        );
        const gridContainers = document.querySelectorAll(
          ".projects-container.grid"
        );

        loginContainers.forEach((container) => {
          container.style.display = "none";
        });

        // Populate projects
        populateProjects(projects);

        // Show project containers
        projectContainers.forEach((container) => {
          container.classList.remove("is--hidden");
        });
        gridContainers.forEach((container) => {
          container.classList.remove("is--hidden");
        });
      }
    }

    // Function to populate projects
    function populateProjects(projects) {
      // Clear existing project elements to avoid duplication
      clearExistingProjects();

      const projectContainers = document.querySelectorAll(
        ".projects-container:not(.grid)"
      );
      const gridContainers = document.querySelectorAll(
        ".projects-container.grid"
      );
      const projectsInfoContainer = document.querySelector(
        ".projects-info-container"
      );
      const projectTemplate =
        document.getElementById("project-template").content;
      const projectGridTemplate = document.getElementById(
        "project-template-grid"
      ).content;
      const projectInfoTemplate = document.getElementById(
        "project-info-template"
      ).content;

      // Set up column observer
      const columnObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.classList?.contains("list-folder-item")) {
              node.classList.remove("list-folder-item");
              node.classList.add("column-folder-item");
            }
          });
        });
      });

      const columnContainer = document.querySelector(
        ".projects-container.column"
      );
      if (columnContainer) {
        columnObserver.observe(columnContainer, {
          childList: true,
          subtree: true,
        });
      }

      projects.forEach((project, index) => {
        // Clone the project template
        const cloneProject = projectTemplate.cloneNode(true);
        const projectTitle = cloneProject.querySelector(".project-title");
        const openButton = cloneProject.querySelector(".open-button");

        const gridClone = projectGridTemplate.cloneNode(true);
        const gridProjectTitle = gridClone.querySelector(".project-title");
        const gridOpenButton = gridClone.querySelector(".open-button");

        if (!openButton || !gridOpenButton) {
          console.error(
            "Show button not found in the cloned project template!"
          );
          return; // Exit early if any of the buttons is missing
        }

        projectTitle.textContent = project.title;
        gridProjectTitle.textContent = project.title;

        // Set a unique identifier for the project info
        const projectInfoId = `project-${index}`;
        openButton.dataset.projectId = projectInfoId;
        gridOpenButton.dataset.projectId = projectInfoId;

        // Clone the project info template
        const cloneInfo = projectInfoTemplate.cloneNode(true);
        cloneInfo.querySelector(".project-info-title").textContent =
          project.title;
        cloneInfo.querySelector(".project-description").textContent =
          project.description;
        cloneInfo.querySelector(".project-link").href = project.link;

        // Populate the image
        const projectImage = cloneInfo.querySelector(".project-image");
        if (project.image) {
          projectImage.src = project.image;
          projectImage.alt = `Image of ${project.title}`;
        } else {
          projectImage.style.display = "none"; // Hide the image element if no image is provided
        }

        const projectInfo = cloneInfo.querySelector(".project-info");
        projectInfo.classList.add("is--hidden");
        projectInfo.id = projectInfoId;

        // Add steps to the project info
        const stepsList = cloneInfo.querySelector(".project-steps");
        if (project.steps && Array.isArray(project.steps)) {
          project.steps.forEach((step) => {
            const listItem = document.createElement("li");
            listItem.textContent = step;
            stepsList.appendChild(listItem);
          });
        }

        // Append the cloned project to each project container
        projectContainers.forEach((container) => {
          const clonedProject = cloneProject.cloneNode(true); // Clone for each container
          container.appendChild(clonedProject);
        });

        // Append the cloned project to each grid container
        gridContainers.forEach((container) => {
          const gridProjectClone = gridClone.cloneNode(true); // Clone for each container
          container.appendChild(gridProjectClone);
        });

        // Append the project info to the info container
        projectsInfoContainer.appendChild(cloneInfo);
      });

      setupProjectButtonListeners();

      // If itemsMirrorClick is a defined function, call it
      if (typeof itemsMirrorClick === "function") {
        itemsMirrorClick();
      }
    }

    // Function to clear existing projects to avoid duplication
    function clearExistingProjects() {
      const projectContainers = document.querySelectorAll(
        ".projects-container:not(.grid)"
      );
      const gridContainers = document.querySelectorAll(
        ".projects-container.grid"
      );
      const projectsInfoContainer = document.querySelector(
        ".projects-info-container"
      );

      // Clear non-grid containers
      projectContainers.forEach((container) => {
        // Keep only template elements and remove actual project items
        const childElements = Array.from(container.children);
        childElements.forEach((child) => {
          // Check if the element is not a template
          if (!child.id || !child.id.includes("template")) {
            container.removeChild(child);
          }
        });
      });

      // Clear grid containers
      gridContainers.forEach((container) => {
        const childElements = Array.from(container.children);
        childElements.forEach((child) => {
          if (!child.id || !child.id.includes("template")) {
            container.removeChild(child);
          }
        });
      });

      // Clear project info container
      if (projectsInfoContainer) {
        projectsInfoContainer.innerHTML = "";
      }
    }

    // Setup project button listeners
    function setupProjectButtonListeners() {
      const allContentContainers = document.querySelectorAll(
        ".content-about-me, .content-experience, .content-tools, .content-projects, .content-image, .content-spotify"
      );
      const projectsContainer = document.querySelector(".content-projects");
      const projectsBtn = document.querySelectorAll(".open-button");

      projectsBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove 'is--active' class from all content containers
          allContentContainers.forEach((container) => {
            container.classList.remove("is--active");
          });

          // Add 'is--active' class to projectsContainer
          if (projectsContainer) {
            projectsContainer.classList.add("is--active");
          }

          // Get project ID and show project info
          const projectId = btn.dataset.projectId;
          if (projectId) {
            showProjectInfo(projectId);
          }
        });
      });
    }

    // Function to show project info
    function showProjectInfo(projectId) {
      const allProjectInfos = document.querySelectorAll(
        ".projects-info-container > div"
      );
      allProjectInfos.forEach((info) => info.classList.add("is--hidden"));

      const selectedProjectInfo = document.getElementById(projectId);
      if (selectedProjectInfo) {
        selectedProjectInfo.classList.remove("is--hidden");
        const infoContainer = document.getElementById(
          "projects-info-container"
        );
        if (infoContainer) {
          infoContainer.classList.remove("is--hidden");
        }

        if (window.matchMedia("(max-width: 991px)").matches) {
          let parentContainer = $(".custom-ui-content");
          let customLayout = $(".custom-ui-layout");
          if (parentContainer && parentContainer.addClass) {
            parentContainer.addClass("is--active");
          }
          if (customLayout && customLayout.css) {
            customLayout.css("overflow", "hidden");
          }
        }
      }
    }

    // Add event listeners to login forms
    document.querySelectorAll(".login-form").forEach((form) => {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const passwordButton = form.querySelector(".password-button");
        const passwordInput = form.querySelector(".password-input");
        const errorMessage = form.querySelector(".error-message"); // Scoped to the current form

        passwordButton.classList.add("is--disabled");

        setTimeout(function () {
          passwordButton.classList.remove("is--disabled");
        }, 1000);

        if (errorMessage) {
          errorMessage.style.display = "none";
        }

        const password = passwordInput.value;

        try {
          const response = await fetch(
            "https://joe8lee-portfolio.netlify.app/.netlify/functions/passwordProtectedContent",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password }),
            }
          );

          if (response.ok) {
            const projects = await response.json();

            // Store authentication status and projects in sessionStorage
            sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("projectsData", JSON.stringify(projects));

            // Populate and display projects
            populateProjects(projects);

            // Hide login containers
            const loginContainers =
              document.querySelectorAll(".login-container");
            loginContainers.forEach((container) => {
              container.style.display = "none";
            });

            // Show project containers
            const projectContainers = document.querySelectorAll(
              ".projects-container:not(.grid)"
            );
            const gridContainers = document.querySelectorAll(
              ".projects-container.grid"
            );

            projectContainers.forEach((container) => {
              container.classList.remove("is--hidden");
            });
            gridContainers.forEach((container) => {
              container.classList.remove("is--hidden");
            });
          } else {
            if (errorMessage) {
              errorMessage.textContent =
                "Incorrect password. Please\u00A0try\u00A0again.";
              errorMessage.style.display = "block";
            }
          }
        } catch (error) {
          console.error("Error:", error);
          if (errorMessage) {
            errorMessage.textContent =
              "Something went wrong. Please\u00A0try\u00A0again\u00A0later.";
            errorMessage.style.display = "block";
          }
        }
      });
    });

    // Event delegation for handling clicks on the "Show Details" buttons
    document.querySelectorAll(".projects-container").forEach((container) => {
      container.addEventListener("click", (event) => {
        const target = event.target;

        // Check if the clicked element is a "Show Details" button
        if (target.classList.contains("open-button")) {
          const projectId = target.dataset.projectId;
          if (projectId) {
            showProjectInfo(projectId); // Show project info based on the project ID
          }
        }
      });
    });

    // Run initial check for session data
    checkSessionAndRestoreProjects();
  }

  function customInitFolderItems() {
    let customLayout = $(".custom-ui-layout");
    let parentContainer = $(".custom-ui-content");
    let contentContainers = $(
      ".content-about-me, .content-experience, .content-tools, .content-projects, .content-image, .content-spotify"
    );
    let contentAbout = $(".content-about-me");
    let contentProjects = $(".content-projects");
    let contentExperience = $(".content-experience");
    let contentTools = $(".content-tools");
    let contentImages = $(".content-image");
    let contentSpotify = $(".content-spotify");

    let aboutFile = $(
      "#grid-view-about-me, #list-view-about-me, #column-view-about-me"
    );
    let expFile = $(
      "#grid-view-experience, #list-view-experience, #column-view-experience"
    );
    let toolsFile = $("#grid-view-tools, #list-view-tools, #column-view-tools");
    let spotifyFile = $(
      "#grid-folder-spotify, #list-folder-spotify, #column-folder-spotify-file"
    );

    let contentClose = $(".content-close");

    const parentDiv1 = $(
      "#ai-images-content, #list-ai-images-folder, #column-ai-images-content"
    );
    const parentDiv2 = $(
      "#unsplash-content, #list-view-unsplash-content, #column-unsplash-images-content"
    );

    const imagesFileGrid1 = parentDiv1.find(".grid-file-large.image");
    const imagesFileList1 = parentDiv1.find(".list-folder-item.image");
    const imagesFileColumn1 = parentDiv1.find(".column-folder-item.image");

    const imagesFileGrid2 = parentDiv2.find(".grid-file-large.image");
    const imagesFileList2 = parentDiv2.find(".list-folder-item.image");
    const imagesFileColumn2 = parentDiv2.find(".column-folder-item.image");

    const imagesSet1 = parentDiv1.find(".image");
    const imagesSet2 = parentDiv2.find(".image");

    const contentImg = $(".content-img");
    const contentText = $(".content-image-wrapper .h2");

    let currentIndex = 0;

    const zoomTrigger = $(".content-image-wrapper");
    const zoomContainer = $(".zoom-container");
    const zoomImg = $(".zoom-image");
    const zoomTxt = $(".zoom-wrapper .h2");
    const zoomClose = $(".zoom-close");

    let currentImagesGrid = imagesFileGrid1;
    let currentImagesList = imagesFileList1;
    let currentImagesColumn = imagesFileColumn1;

    $(aboutFile).on("click", function () {
      contentContainers.removeClass("is--active");
      if (window.matchMedia("(min-width: 992px)").matches) {
        contentAbout.addClass("is--active");
      } else {
        parentContainer.addClass("is--active");
        contentAbout.addClass("is--active");
        customLayout.css("overflow", "hidden");
      }
    });
    $(expFile).on("click", function () {
      contentContainers.removeClass("is--active");
      if (window.matchMedia("(min-width: 992px)").matches) {
        contentExperience.addClass("is--active");
      } else {
        parentContainer.addClass("is--active");
        contentExperience.addClass("is--active");
        customLayout.css("overflow", "hidden");
      }
    });
    $(toolsFile).on("click", function () {
      contentContainers.removeClass("is--active");
      if (window.matchMedia("(min-width: 992px)").matches) {
        contentTools.addClass("is--active");
      } else {
        parentContainer.addClass("is--active");
        contentTools.addClass("is--active");
        customLayout.css("overflow", "hidden");
      }
    });

    function activateImage(index) {
      currentImagesGrid.removeClass("is--active");
      currentImagesList.removeClass("is--active");
      currentImagesColumn.removeClass("is--active");

      const currentImage = currentImagesGrid.eq(index);

      currentImagesList.eq(index).addClass("is--active");
      currentImagesColumn.eq(index).addClass("is--active");
      currentImage.addClass("is--active");

      const imgElement = currentImage.find("img");
      const txtElement = currentImage.find("p");

      if (imgElement.length && contentImg.length && zoomImg.length) {
        contentImg.attr("src", imgElement.attr("src"));
        zoomImg.attr("src", imgElement.attr("src"));
      }
      if (txtElement.length && contentText.length && zoomTxt.length) {
        contentText.text(txtElement.text());
        zoomTxt.text(txtElement.text());
      }
    }

    // Function to bind click events to the current set of images
    function bindImageClickEvents() {
      if (!currentImagesGrid.length) return; // Prevent errors if no images exist

      $(document)
        .off("click", ".grid-file-large.image")
        .on("click", ".grid-file-large.image", function () {
          currentIndex = currentImagesGrid.index(this);
          activateImage(currentIndex);
        });

      $(document)
        .off("click", ".list-folder-item.image")
        .on("click", ".list-folder-item.image", function () {
          currentIndex = currentImagesList.index(this);
          activateImage(currentIndex);
        });

      $(document)
        .off("click", ".column-folder-item.image")
        .on("click", ".column-folder-item.image", function () {
          currentIndex = currentImagesColumn.index(this);
          activateImage(currentIndex);
        });
    }

    // Initialize the default image set (imagesFile1)
    bindImageClickEvents();

    // Function to switch between image sets
    function switchImageSet(set) {
      // Remove old event listeners before changing the set
      $(document).off("click", ".grid-file-large.image");
      $(document).off("click", ".list-folder-item.image");
      $(document).off("click", ".column-folder-item.image");

      if (set === 1) {
        currentImagesGrid = imagesFileGrid1;
        currentImagesList = imagesFileList1;
        currentImagesColumn = imagesFileColumn1;
        console.log("set1");
      } else if (set === 2) {
        currentImagesGrid = imagesFileGrid2;
        currentImagesList = imagesFileList2;
        currentImagesColumn = imagesFileColumn2;
        console.log("set2");
      }

      bindImageClickEvents();
      activateImage(0);
    }

    // Handle navigation and buttons
    $(document).on("keydown", function (e) {
      if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          currentIndex = (currentIndex + 1) % currentImagesGrid.length;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          currentIndex =
            (currentIndex - 1 + currentImagesGrid.length) %
            currentImagesGrid.length;
        }
        activateImage(currentIndex);
      }
    });

    $("#prev-button").on("click", function (e) {
      e.preventDefault();
      currentIndex =
        (currentIndex - 1 + currentImagesGrid.length) %
        currentImagesGrid.length;
      activateImage(currentIndex);
    });

    $("#next-button").on("click", function (e) {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % currentImagesGrid.length;
      activateImage(currentIndex);
    });

    // Example usage: Switch to image set 2
    $(imagesSet2).on("click", function () {
      switchImageSet(2);
      contentContainers.removeClass("is--active");

      if (window.matchMedia("(min-width: 992px)").matches) {
        contentImages.addClass("is--active");
      } else {
        zoomContainer.addClass("is--active");
        parentContainer.removeClass("is--active");
      }
    });

    // Mobile image swipe
    function addSwipeSupport() {
      // Target the elements where swipe should work
      const swipeTargets = $(".content-image-wrapper, .zoom-container");

      // Variables to track touch events
      let touchStartX = 0;
      let touchEndX = 0;
      let touchStartY = 0;
      let touchEndY = 0;

      // Minimum distance (in pixels) required for a swipe
      const minSwipeDistance = 50;

      // Add touch event listeners
      swipeTargets.on("touchstart", function (e) {
        touchStartX = e.originalEvent.touches[0].clientX;
        touchStartY = e.originalEvent.touches[0].clientY;
      });

      swipeTargets.on("touchend", function (e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        touchEndY = e.originalEvent.changedTouches[0].clientY;

        // Calculate horizontal and vertical distance
        const distanceX = touchEndX - touchStartX;
        const distanceY = touchEndY - touchStartY;

        // Only trigger swipe if horizontal movement is greater than vertical
        // This prevents accidental swipes when scrolling vertically
        if (Math.abs(distanceX) > Math.abs(distanceY)) {
          // Check if the swipe is long enough
          if (Math.abs(distanceX) > minSwipeDistance) {
            if (distanceX > 0) {
              // Swipe right (previous image)
              currentIndex =
                (currentIndex - 1 + currentImagesGrid.length) %
                currentImagesGrid.length;
            } else {
              // Swipe left (next image)
              currentIndex = (currentIndex + 1) % currentImagesGrid.length;
            }
            activateImage(currentIndex);
          }
        }
      });

      // Prevent default touchmove behavior to avoid page scrolling during swipe
      swipeTargets.on("touchmove", function (e) {
        const distanceX = e.originalEvent.touches[0].clientX - touchStartX;
        const distanceY = e.originalEvent.touches[0].clientY - touchStartY;

        // If horizontal movement is greater than vertical and greater than threshold
        if (
          Math.abs(distanceX) > Math.abs(distanceY) &&
          Math.abs(distanceX) > 10
        ) {
          e.preventDefault();
        }
      });
    }

    $(imagesSet1).on("click", function () {
      switchImageSet(1);
      contentContainers.removeClass("is--active");

      if (window.matchMedia("(min-width: 992px)").matches) {
        contentImages.addClass("is--active");
      } else {
        zoomContainer.addClass("is--active");
        parentContainer.removeClass("is--active");
      }
    });

    $(zoomTrigger).on("click", function () {
      zoomContainer.addClass("is--active");
    });
    $(zoomClose).on("click", function () {
      zoomContainer.removeClass("is--active");
    });
    $(spotifyFile).on("click", function () {
      contentContainers.removeClass("is--active");
      if (window.matchMedia("(min-width: 992px)").matches) {
        contentSpotify.addClass("is--active");
      } else {
        parentContainer.addClass("is--active");
        contentSpotify.addClass("is--active");
        customLayout.css("overflow", "hidden");
      }
    });

    $(contentClose).on("click", function () {
      contentContainers.removeClass("is--active");
      parentContainer.removeClass("is--active");
      customLayout.css("overflow", "scroll");
    });

    // Call this function at the end of customInitFolderItems
    addSwipeSupport();
  }

  function updateOnlineStatus() {
    const $onlineStatusElement = $(".online-status");

    // Get the current time in Eastern Time
    const now = new Date();
    const estTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const hours = estTime.getHours();
    const dayOfWeek = estTime.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Check if it's a weekday (Monday-Friday: 1-5)
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    // Determine the status based on the time and day
    let status;
    if (isWeekday) {
      // Only apply the online/busy statuses during weekdays
      if (hours >= 9 && hours < 20) {
        status = "online"; // 9am to 8pm
      } else if ((hours >= 7 && hours < 9) || (hours >= 20 && hours < 22)) {
        status = "busy"; // 7am to 9am and 8pm to 10pm
      } else {
        status = "offline"; // 10pm to 7am
      }
    } else {
      // Weekend - always offline
      status = "offline";
    }

    // Update the attribute
    $onlineStatusElement.attr("data-online-status", status);
  }

  function updateLocalTime() {
    // Utility function untuk menampilkan timezone Indonesia (WIB)
    function getTimeZoneAbbreviation() {
      return "WIB";
    }

    function updateWidgetTime() {
      const dayElement = document.querySelector(".widget-display-current-day");
      const timeElement = document.querySelector(
        ".widget-display-current-time"
      );

      function updateTime() {
        const now = new Date();

        // Get day of the week (pakai English)
        const optionsDay = { weekday: "long", timeZone: "Asia/Jakarta" };
        const currentDay = now.toLocaleDateString("en-US", optionsDay);

        // Get time in Indonesia (WIB)
        const optionsTime = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Jakarta",
        };
        const currentTime = now.toLocaleTimeString("en-US", optionsTime);

        const timeZoneAbbr = getTimeZoneAbbreviation();

        // Update elements
        if (dayElement) dayElement.textContent = currentDay;
        if (timeElement)
          timeElement.textContent = `${currentTime} ${timeZoneAbbr}`;
      }

      // Initial update
      updateTime();

      // Update every second
      setInterval(updateTime, 1000);
    }

    function updateTimeZoneAbbreviation() {
      const timeElement = document.querySelector(
        ".profile-name .description .time-et"
      );
      const timeZoneAbbr = getTimeZoneAbbreviation();

      if (timeElement) {
        timeElement.textContent = timeZoneAbbr;
      }
    }

    // Call the update function
    updateWidgetTime();
    updateTimeZoneAbbreviation();
  }

  function submitForm() {
    const formWrapper = document.querySelector(".form-wrapper");
    const form = document.getElementById("contactForm");
    const submitButton = document.querySelector(".submit-button");
    const inputFields = document.querySelectorAll(".text-field, #message");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameInput = document.getElementById("name");
    const successMessage = document.querySelector(".success-message-div");
    const errorMessage = document.querySelector(".error-message-div");

    function disableSubmitButton() {
      submitButton.disabled = true;
      submitButton.value = "Please wait...";
    }

    function enableSubmitButton() {
      submitButton.disabled = false;
      submitButton.value = "Send message"; // Restore original text
    }

    function validateField(inputField) {
      let isValid = true;

      if (inputField.value.trim() === "") {
        inputField.classList.add("error");
        isValid = false;
      } else {
        inputField.classList.remove("error");
      }

      if (inputField.id === "email") {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          inputField.value.trim()
        );
        if (!isValidEmail) {
          inputField.classList.add("error");
          isValid = false;
        } else {
          inputField.classList.remove("error");
        }
      }

      return isValid;
    }

    inputFields.forEach((inputField) => {
      inputField.addEventListener("blur", function () {
        validateField(inputField);
      });

      inputField.addEventListener("input", function () {
        if (inputField.classList.contains("error")) {
          validateField(inputField);
        }
      });
    });

    submitButton.addEventListener("click", function (event) {
      let isValid = true;

      inputFields.forEach((inputField) => {
        if (!validateField(inputField)) {
          isValid = false;
        }
      });

      formWrapper.classList.toggle("error", !isValid);

      if (!isValid) {
        event.preventDefault();
        return;
      }
    });

    function netlifyFormSubmit() {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        disableSubmitButton();

        fetch(
          "https://joe8lee-portfolio.netlify.app/.netlify/functions/submitForm",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(() => {
            formWrapper.classList.add("success");
            form.style.display = "none";
            successMessage.style.display = "block";
            errorMessage.style.display = "none";

            setTimeout(() => {
              $(".form-popup").removeClass("is--active");
            }, 3000);
          })
          .catch(() => {
            formWrapper.classList.add("error");
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
          })
          .finally(() => {
            enableSubmitButton();
          });
      });
    }

    netlifyFormSubmit();

    $(".email-close").on("click", function () {
      $(".form-popup").removeClass("is--active");
    });

    $(".widget.message").on("click", function () {
      $(".form-popup").addClass("is--active");
    });

    function updateFormWrapperClass() {
      const isSuccessVisible =
        window.getComputedStyle(successMessage).display === "block";
      const isErrorVisible =
        window.getComputedStyle(errorMessage).display === "block";

      formWrapper.classList.toggle("success", isSuccessVisible);
      formWrapper.classList.toggle("error", isErrorVisible);
    }

    const observer = new MutationObserver(updateFormWrapperClass);
    const config = { attributes: true, attributeFilter: ["style"] };

    if (successMessage) observer.observe(successMessage, config);
    if (errorMessage) observer.observe(errorMessage, config);

    updateFormWrapperClass();
  }

  function netlifyFormSubmit() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      fetch(
        "https://joe8lee-portfolio.netlify.app/.netlify/functions/submitForm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
    });
  }

  // Run all functions
  customInitNavigation();
  setTimeout(function () {
    loginForm();
    submitForm();
  }, 50);
  customInitFolderItems();
  updateOnlineStatus();
  updateLocalTime();

  // Update the status dynamically every minute
  onlineStatusInterval = setInterval(updateOnlineStatus, 60000);

  console.log("customUiInit() function is called");
}

function customSimplifiedInit() {
  function resizeElement() {
    const popups = document.querySelectorAll("[id^='popup-window-']"); // Select all popups with id starting with 'popup-window-'

    popups.forEach((popup) => {
      const resizeHandle = popup.querySelector(".window-resize-handle");

      const updatePopupSize = () => {
        const viewportWidth = window.innerWidth; // Get the viewport width
        const currentWidthVW =
          parseFloat(popup.style.width) ||
          (popup.offsetWidth / viewportWidth) * 100;
        const currentHeightVW =
          parseFloat(popup.style.height) ||
          (popup.offsetHeight / viewportWidth) * 100;

        // Update the popup size based on the new viewport width
        popup.style.width = `${Math.max(15, currentWidthVW)}vw`; // Ensure it's at least 15vw
        popup.style.height = `${Math.max(10, currentHeightVW)}vw`; // Ensure it's at least 10vw
      };

      let isResizing = false;
      let startX, startY, startWidth, startHeight;

      function startResize(event) {
        event.stopPropagation(); // Prevent dragging interference
        isResizing = true;

        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;

        startX = clientX;
        startY = clientY;
        startWidth =
          parseFloat(popup.style.width) ||
          (popup.offsetWidth / window.innerWidth) * 100;
        startHeight =
          parseFloat(popup.style.height) ||
          (popup.offsetHeight / window.innerWidth) * 100;

        // Disable text selection
        document.body.style.userSelect = "none";
        document.body.style.pointerEvents = "none";

        resizeHandle.style.userSelect = "auto";
        resizeHandle.style.pointerEvents = "auto";

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
        document.addEventListener("touchmove", resize);
        document.addEventListener("touchend", stopResize);
      }

      function resize(event) {
        if (!isResizing) return;

        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        const viewportWidth = window.innerWidth;

        const newWidthInVW =
          startWidth + ((clientX - startX) / viewportWidth) * 100;
        const newHeightInVW =
          startHeight + ((clientY - startY) / viewportWidth) * 100;

        popup.style.width = `${Math.max(15, newWidthInVW)}vw`;
        popup.style.height = `${Math.max(10, newHeightInVW)}vw`;
      }

      function stopResize() {
        isResizing = false;

        // Re-enable selection and interaction
        document.body.style.userSelect = "";
        document.body.style.pointerEvents = "";

        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
        document.removeEventListener("touchmove", resize);
        document.removeEventListener("touchend", stopResize);
      }

      resizeHandle.addEventListener("mousedown", startResize);
      resizeHandle.addEventListener("touchstart", startResize);

      // Update popup size on window resize
      window.addEventListener("resize", updatePopupSize);
    });
  }

  function customScrollBar() {
    document
      .querySelectorAll(".popup-scroll-wrapper")
      .forEach((scrollContainer) => {
        // Elements inside each popup
        const popupContent = scrollContainer.querySelector(".popup-content");
        const scrollbarTrack = scrollContainer
          .closest(".popup-content-inner-wrapper")
          .querySelector(".scrollbar-track");
        const scrollbarThumb =
          scrollbarTrack?.querySelector(".scrollbar-thumb");
        const scrollInnerWrapper = scrollContainer.closest(
          ".popup-content-inner-wrapper"
        );

        // Ensure all required elements exist
        if (!popupContent || !scrollbarTrack || !scrollbarThumb) {
          console.warn("Missing scrollbar elements in", scrollContainer);
          return;
        }

        const updateScrollbar = () => {
          const containerHeight = scrollContainer.clientHeight;
          const contentHeight = popupContent.scrollHeight;
          const scrollTop = scrollContainer.scrollTop;
          const trackHeight = scrollbarTrack.clientHeight;

          if (contentHeight > containerHeight) {
            scrollbarTrack.style.opacity = "1"; // Show scrollbar

            //let thumbHeight = trackHeight - ((contentHeight - containerHeight) + 12);
            let thumbHeight = (containerHeight / contentHeight) * trackHeight;
            scrollbarThumb.style.height = `${thumbHeight}px`;

            const maxThumbTop = trackHeight - thumbHeight - 1;
            const maxScrollTop = contentHeight - containerHeight;
            let thumbTop = (scrollTop / maxScrollTop) * maxThumbTop;

            thumbTop = Math.max(thumbTop, 1);

            scrollbarThumb.style.height = `${thumbHeight}px`;
            scrollbarThumb.style.top = `${thumbTop}px`; // Ensure it's not 0
            scrollInnerWrapper.style.paddingRight =
              "var(--ui-elements--1280--padding-medium)";
          } else {
            scrollbarTrack.style.opacity = "0"; // Hide scrollbar if not needed
            scrollInnerWrapper.style.paddingRight =
              "var(--ui-elements--1280--padding-small-x)";
          }
        };

        // Scroll event listener
        scrollContainer.addEventListener("scroll", updateScrollbar);

        // Resize observer to detect content or container size changes
        const resizeObserver = new ResizeObserver(updateScrollbar);
        resizeObserver.observe(scrollContainer);
        resizeObserver.observe(popupContent);

        // Drag functionality
        let isDragging = false;
        let startY, startTop;

        scrollbarThumb.addEventListener("mousedown", (e) => {
          isDragging = true;
          startY = e.clientY;
          startTop = scrollbarThumb.offsetTop;
          document.body.style.userSelect = "none";
          scrollContainer.style.overflow = "hidden";
        });

        document.addEventListener("mousemove", (e) => {
          if (!isDragging) return;

          const deltaY = e.clientY - startY;
          const trackHeight = scrollbarTrack.clientHeight;
          const thumbHeight = scrollbarThumb.clientHeight;
          let newTop = startTop + deltaY;
          const maxTop = trackHeight - thumbHeight - 1;

          newTop = Math.min(Math.max(newTop, 1), maxTop);

          const maxScrollTop =
            popupContent.scrollHeight - scrollContainer.clientHeight;
          const percentageScrolled = newTop / maxTop;
          scrollContainer.scrollTop = percentageScrolled * maxScrollTop;

          scrollbarThumb.style.top = `${newTop}px`;
        });

        document.addEventListener("mouseup", () => {
          isDragging = false;
          document.body.style.userSelect = "";
          scrollContainer.style.overflow = "";
        });

        // Initialize scrollbar
        setTimeout(updateScrollbar, 10);
      });
  }

  // Re-run customScrollBar if new elements are added dynamically
  const observer = new MutationObserver(customScrollBar);
  observer.observe(document.body, { childList: true, subtree: true });

  function popupWindowSettings() {
    $('[id^="popup-window-"]').each(function () {
      let popup = this;
      let popupHandle = $(popup).find(".ui-bar-title");

      Draggable.create(popup, {
        handle: popupHandle,
        bounds: "body",
        zIndexBoost: false,
        onDragStart: function () {
          updateZIndex(popup);
        },
      });
    });

    // Check if we're on a desktop-sized screen
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;

    // Set the random range based on screen size
    let maxX, maxY;
    if (isDesktop) {
      // Desktop: wider range of positions
      maxX = 70; // 0% to 70%
      maxY = 24; // 0% to 24%
    } else {
      // Mobile/tablet: much smaller range
      maxX = 10; // 0% to 10%
      maxY = 5; // 0% to 5%
    }

    // Apply the positioning to all popup windows
    document.querySelectorAll('[id^="popup-window-"]').forEach((popup) => {
      // Generate random positions within our ranges
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      // Apply the positioning
      popup.style.inset = `${randomY}% auto auto ${randomX}%`;
    });

    // Select all popup window elements
    const popupWindows = document.querySelectorAll(".popup-window");

    // Function to update z-index
    const updateZIndex = (popup) => {
      let maxZIndex = 0;
      popupWindows.forEach((otherPopup) => {
        if (otherPopup !== popup) {
          const currentZIndex = parseInt(
            window.getComputedStyle(otherPopup).zIndex,
            10
          );
          if (!isNaN(currentZIndex)) {
            maxZIndex = Math.max(maxZIndex, currentZIndex);
          }
        }
      });
      popup.style.zIndex = maxZIndex + 1;
    };

    // Add event listeners for mouse, touch, and resize
    popupWindows.forEach((popup) => {
      popup.addEventListener("mousedown", () => updateZIndex(popup));
      popup.addEventListener("touchstart", () => updateZIndex(popup));

      // Keep ResizeObserver
      const resizeObserver = new ResizeObserver(() => updateZIndex(popup));
      resizeObserver.observe(popup);
    });

    // Add event listener to all buttons
    const buttons = document.querySelectorAll('[id^="popup-button-"]'); // Select all buttons with the pattern 'popup-button-'

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Extract the number from the button's ID (e.g., '1' from 'popup-button-1')
        const buttonId = button.id;
        const number = buttonId.split("-")[2]; // Get the last part after 'popup-button-'

        // Construct the corresponding window ID (e.g., 'popup-window-1')
        const windowId = `popup-window-${number}`;

        // Select the window and add the 'is--active' class
        const window = document.getElementById(windowId);
        if (window) {
          // Add the 'is--active' class to the window
          window.classList.add("is--active");
        }
      });
    });

    $(".ui-bar-close").on("click", function () {
      let popup = $(this).closest(".popup-window");
      popup.removeClass("is--active");

      let popupId = popup.attr("id"); // Get the popup's ID
      let buttonId = popupId.replace("popup-window", "popup-button"); // Match the button ID
      $("#" + buttonId).removeClass("is--active");
    });
  }

  function listLogic() {
    //List View Logic
    $(document).on("click", ".list-folder-small", function () {
      $(this).parent().toggleClass("is--active");
    });

    $(document).on("click", ".list-folder-item", function () {
      $(".list-folder-item").removeClass("is--active");
      $(this).addClass("is--active");
    });

    // Close popup window and remove the "is--active" class from list items
    $(".popup-window.project .ui-bar-close").on("click", function () {
      $(".projects-container .list-folder-item").removeClass("is--active");
    });
  }

  function loginForm() {
    // Check if user is already authenticated via sessionStorage
    const isAuthenticated =
      sessionStorage.getItem("isAuthenticated") === "true";
    const storedProjects = JSON.parse(
      sessionStorage.getItem("projectsData") || "[]"
    );

    // Function to render projects from data
    function renderProjects(projects) {
      const projectContainers = document.querySelectorAll(
        ".projects-container"
      );
      const projectsInfoContainer = document.querySelector(
        ".projects-info-container"
      );
      const loginContainers = document.querySelectorAll(".login-container");
      const projectTemplate =
        document.getElementById("project-template").content;
      const projectInfoTemplate = document.getElementById(
        "project-info-template"
      ).content;

      // Clear existing projects to avoid duplication
      projectContainers.forEach((container) => {
        container.innerHTML = "";
      });
      projectsInfoContainer.innerHTML = ""; // Clear project info

      projects.forEach((project, index) => {
        // Clone the project template
        const cloneProject = projectTemplate.cloneNode(true);
        const projectTitle = cloneProject.querySelector(".project-title");
        const openButton = cloneProject.querySelector(".open-button");

        if (!openButton) {
          console.error(
            "Open button not found in the cloned project template!"
          );
          return;
        }

        projectTitle.textContent = project.title;

        // Set a unique identifier for the project info
        const projectInfoId = `project-${index}`;
        openButton.dataset.projectId = projectInfoId;

        // Clone the project info template
        const cloneInfo = projectInfoTemplate.cloneNode(true);
        cloneInfo.querySelector(".project-info-title").textContent =
          project.title;
        cloneInfo.querySelector(".project-description").textContent =
          project.description;
        cloneInfo.querySelector(".project-link").href = project.link;

        // Populate the image
        const projectImage = cloneInfo.querySelector(".project-image");
        if (project.image) {
          projectImage.src = project.image;
          projectImage.alt = `Image of ${project.title}`;
        } else {
          projectImage.style.display = "none"; // Hide the image element if no image is provided
        }

        const projectInfo = cloneInfo.querySelector(".project-info");
        projectInfo.classList.add("is--hidden");
        projectInfo.id = projectInfoId;

        // Add steps to the project info
        const stepsList = cloneInfo.querySelector(".project-steps");
        if (project.steps && Array.isArray(project.steps)) {
          project.steps.forEach((step) => {
            const listItem = document.createElement("li");
            listItem.textContent = step;
            stepsList.appendChild(listItem);
          });
        }

        // Append the cloned project to each project container
        projectContainers.forEach((container) => {
          const clonedProject = cloneProject.cloneNode(true); // Clone for each container
          container.appendChild(clonedProject);
        });

        // Append the project info to the info container
        projectsInfoContainer.appendChild(cloneInfo);
      });

      // Show all project containers and hide login forms
      projectContainers.forEach((container) => {
        container.classList.remove("is--hidden");
      });

      loginContainers.forEach((container) => {
        container.style.display = "none";
      });

      // Setup event listeners for project buttons
      setupProjectButtons();
    }

    // If already authenticated, render projects from sessionStorage
    if (isAuthenticated && storedProjects.length > 0) {
      renderProjects(storedProjects);
    } else {
      // If not authenticated, show login form and hide projects
      const projectContainers = document.querySelectorAll(
        ".projects-container"
      );
      projectContainers.forEach((container) => {
        container.classList.add("is--hidden");
      });
    }

    // Login form submission handler
    document.querySelectorAll(".login-form").forEach((form) => {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const passwordButton = form.querySelector(".password-button");
        const passwordInput = form.querySelector(".password-input");
        const errorMessage = form.querySelector(".error-message"); // Scoped to the current form

        passwordButton.classList.add("is--disabled");

        setTimeout(function () {
          passwordButton.classList.remove("is--disabled");
        }, 1000);

        if (errorMessage) {
          errorMessage.style.display = "none";
        }

        // Only make the API call if not already authenticated
        if (!isAuthenticated) {
          const password = passwordInput.value;

          try {
            const response = await fetch(
              "https://joe8lee-portfolio.netlify.app/.netlify/functions/passwordProtectedContent",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
              }
            );

            if (response.ok) {
              const projects = await response.json();

              // Store authentication state and projects using the same key as paste.txt
              sessionStorage.setItem("isAuthenticated", "true");
              sessionStorage.setItem("projectsData", JSON.stringify(projects));

              // Render projects
              renderProjects(projects);
            } else {
              if (errorMessage) {
                errorMessage.textContent =
                  "Incorrect password. Please\u00A0try\u00A0again.";
                errorMessage.style.display = "block";
              }
            }
          } catch (error) {
            console.error("Error:", error);
            if (errorMessage) {
              errorMessage.textContent =
                "Something went wrong. Please\u00A0try\u00A0again\u00A0later.";
              errorMessage.style.display = "block";
            }
          }
        }
      });
    });

    // Function to setup event listeners for project buttons
    function setupProjectButtons() {
      // Setup popup window activation
      const projectsContainer = document.querySelector(".popup-window.project");
      const projectsBtn = document.querySelectorAll(".open-button");

      projectsBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Add 'is--active' class to projectsContainer
          if (projectsContainer) {
            projectsContainer.classList.add("is--active");
          }
        });
      });

      // Event delegation for handling clicks on the "Open" buttons
      document.querySelectorAll(".projects-container").forEach((container) => {
        // Remove any existing event listener first to avoid duplicates
        container.removeEventListener("click", projectButtonClickHandler);
        // Add new event listener
        container.addEventListener("click", projectButtonClickHandler);
      });
    }

    // Handler function for project button clicks
    function projectButtonClickHandler(event) {
      const target = event.target.closest(".open-button");
      if (target) {
        const projectId = target.dataset.projectId;
        showProjectInfo(projectId);

        // Get project title from the clicked button's parent list item
        const listItem = target.closest(".list-folder-item");
        const projectTitleContent = listItem
          .querySelector(".project-title")
          ?.textContent.trim();

        // Update popup title
        const popupTitle = document.querySelector(
          "#popup-window-4 .ui-bar-title .ui-text-small"
        );

        if (popupTitle) {
          popupTitle.textContent = projectTitleContent; // Set popup title
        } else {
          console.warn("Popup title element not found");
        }

        // Ensure popup window is activated
        const popupWindow = document.querySelector(".popup-window.project");
        if (popupWindow) {
          popupWindow.classList.add("is--active");
        }
      }
    }

    // Function to display project info
    function showProjectInfo(projectId) {
      const allProjectInfos = document.querySelectorAll(
        ".projects-info-container > div"
      );
      allProjectInfos.forEach((info) => info.classList.add("is--hidden"));

      const selectedProjectInfo = document.getElementById(projectId);
      if (selectedProjectInfo) {
        selectedProjectInfo.classList.remove("is--hidden");
        const container = document.getElementById("projects-info-container");
        if (container) {
          container.classList.remove("is--hidden");
        }
      }
    }

    // Setup close button for popup window
    const closeButtons = document.querySelectorAll(".close-button");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popupWindow = document.querySelector(".popup-window.project");
        if (popupWindow) {
          popupWindow.classList.remove("is--active");
        }
      });
    });
  }

  function submitForm() {
    const formWrapper = document.querySelector(".form-wrapper");
    const form = document.getElementById("contactForm");
    const submitButton = document.querySelector(".submit-button");
    const inputFields = document.querySelectorAll(".text-field, #message");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameInput = document.getElementById("name");
    const successMessage = document.querySelector(".success-message-div");
    const errorMessage = document.querySelector(".error-message-div");

    function disableSubmitButton() {
      submitButton.disabled = true;
      submitButton.value = "Please wait...";
    }

    function enableSubmitButton() {
      submitButton.disabled = false;
      submitButton.value = "Send message"; // Restore original text
    }

    function validateField(inputField) {
      let isValid = true;

      if (inputField.value.trim() === "") {
        inputField.classList.add("error");
        isValid = false;
      } else {
        inputField.classList.remove("error");
      }

      if (inputField.id === "email") {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          inputField.value.trim()
        );
        if (!isValidEmail) {
          inputField.classList.add("error");
          isValid = false;
        } else {
          inputField.classList.remove("error");
        }
      }

      return isValid;
    }

    inputFields.forEach((inputField) => {
      inputField.addEventListener("blur", function () {
        validateField(inputField);
      });

      inputField.addEventListener("input", function () {
        if (inputField.classList.contains("error")) {
          validateField(inputField);
        }
      });
    });

    submitButton.addEventListener("click", function (event) {
      let isValid = true;

      inputFields.forEach((inputField) => {
        if (!validateField(inputField)) {
          isValid = false;
        }
      });

      formWrapper.classList.toggle("error", !isValid);

      if (!isValid) {
        event.preventDefault();
        return;
      }
    });

    function netlifyFormSubmit() {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        disableSubmitButton();

        fetch(
          "https://joe8lee-portfolio.netlify.app/.netlify/functions/submitForm",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(() => {
            formWrapper.classList.add("success");
            form.style.display = "none";
            successMessage.style.display = "block";
            errorMessage.style.display = "none";

            setTimeout(() => {
              $(".form-popup").removeClass("is--active");
            }, 3000);
          })
          .catch(() => {
            formWrapper.classList.add("error");
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
          })
          .finally(() => {
            enableSubmitButton();
          });
      });
    }

    netlifyFormSubmit();

    $(".email-close").on("click", function () {
      $(".form-popup").removeClass("is--active");
    });

    $(".send-message").on("click", function () {
      $(".form-popup").addClass("is--active");
    });

    function updateFormWrapperClass() {
      const isSuccessVisible =
        window.getComputedStyle(successMessage).display === "block";
      const isErrorVisible =
        window.getComputedStyle(errorMessage).display === "block";

      formWrapper.classList.toggle("success", isSuccessVisible);
      formWrapper.classList.toggle("error", isErrorVisible);
    }

    const observer = new MutationObserver(updateFormWrapperClass);
    const config = { attributes: true, attributeFilter: ["style"] };

    if (successMessage) observer.observe(successMessage, config);
    if (errorMessage) observer.observe(errorMessage, config);

    updateFormWrapperClass();
  }

  function netlifyFormSubmit() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      fetch(
        "https://joe8lee-portfolio.netlify.app/.netlify/functions/submitForm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
    });
  }

  function updateOnlineStatus() {
    const $onlineStatusElement = $(".online-status");

    // Get the current time in Eastern Time
    const now = new Date();
    const estTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const hours = estTime.getHours();
    const dayOfWeek = estTime.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Check if it's a weekday (Monday-Friday: 1-5)
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    // Determine the status based on the time and day
    let status;
    if (isWeekday) {
      // Only apply the online/busy statuses during weekdays
      if (hours >= 9 && hours < 20) {
        status = "online"; // 9am to 8pm
      } else if ((hours >= 7 && hours < 9) || (hours >= 20 && hours < 22)) {
        status = "busy"; // 7am to 9am and 8pm to 10pm
      } else {
        status = "offline"; // 10pm to 7am
      }
    } else {
      // Weekend - always offline
      status = "offline";
    }

    // Update the attribute
    $onlineStatusElement.attr("data-online-status", status);
  }

  function updateLocalTime() {
    // Utility function untuk menampilkan timezone Indonesia (WIB)
    function getTimeZoneAbbreviation() {
      return "WIB";
    }

    function updateWidgetTime() {
      const dayElement = document.querySelector(".widget-display-current-day");
      const timeElement = document.querySelector(
        ".widget-display-current-time"
      );

      function updateTime() {
        const now = new Date();

        // Get day of the week (pakai English)
        const optionsDay = { weekday: "long", timeZone: "Asia/Jakarta" };
        const currentDay = now.toLocaleDateString("en-US", optionsDay);

        // Get time in Indonesia (WIB)
        const optionsTime = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Jakarta",
        };
        const currentTime = now.toLocaleTimeString("en-US", optionsTime);

        const timeZoneAbbr = getTimeZoneAbbreviation();

        // Update elements
        if (dayElement) dayElement.textContent = currentDay;
        if (timeElement)
          timeElement.textContent = `${currentTime} ${timeZoneAbbr}`;
      }

      // Initial update
      updateTime();

      // Update every second
      setInterval(updateTime, 1000);
    }

    function updateTimeZoneAbbreviation() {
      const timeElement = document.querySelector(
        ".profile-name .description .time-et"
      );
      const timeZoneAbbr = getTimeZoneAbbreviation();

      if (timeElement) {
        timeElement.textContent = timeZoneAbbr;
      }
    }

    // Call the update function
    updateWidgetTime();
    updateTimeZoneAbbreviation();
  }

  resizeElement();
  customScrollBar();
  popupWindowSettings();
  listLogic();
  setTimeout(function () {
    loginForm();
    submitForm();
  }, 50);
  updateOnlineStatus();
  updateLocalTime();

  console.log("customSimplifiedInit() function is called");
}

function customResume() {
  function listLogic() {
    // Delegate click event to a parent (e.g., document or a specific container)
    $(document).on("click", ".list-folder-small", function () {
      $(this).parent().toggleClass("is--active");
    });

    $(document).on("click", ".list-folder-item", function () {
      $(".list-folder-item").removeClass("is--active");
      $(this).addClass("is--active");
    });
  }

  function loginForm() {
    // Check session storage first to see if user is already authenticated
    // Use projectsData as the key to be compatible with other functions
    const isAuthenticated =
      sessionStorage.getItem("isAuthenticated") === "true";
    const projects = JSON.parse(sessionStorage.getItem("projectsData") || "[]");

    // If already authenticated and we have projects, show them immediately
    if (isAuthenticated && projects.length > 0) {
      displayProjects(projects);
    } else {
      // Otherwise, show the login form and set up the event listener
      setupLoginForm();
    }

    // Set up event delegation for project buttons regardless of authentication status
    setupProjectEventListeners();

    function setupLoginForm() {
      document.querySelectorAll(".login-form").forEach((form) => {
        form.addEventListener("submit", async function (event) {
          event.preventDefault();

          const passwordButton = form.querySelector(".password-button");
          const passwordInput = form.querySelector(".password-input");
          const errorMessage = form.querySelector(".error-message"); // Scoped to the current form

          passwordButton.classList.add("is--disabled");

          setTimeout(function () {
            passwordButton.classList.remove("is--disabled");
          }, 1000);

          if (errorMessage) {
            errorMessage.style.display = "none";
          }

          const projectContainers = document.querySelectorAll(
            ".projects-container"
          );
          projectContainers.forEach((container) => {
            container.classList.add("is--hidden");
          });

          const password = passwordInput.value;

          try {
            const response = await fetch(
              "https://joe8lee-portfolio.netlify.app/.netlify/functions/passwordProtectedContent",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
              }
            );

            if (response.ok) {
              const projects = await response.json();

              // Store authentication status and projects in session storage
              // Use projectsData as the key to match other functions
              sessionStorage.setItem("isAuthenticated", "true");
              sessionStorage.setItem("projectsData", JSON.stringify(projects));

              // Display the projects
              displayProjects(projects);
            } else {
              if (errorMessage) {
                errorMessage.textContent =
                  "Incorrect password. Please\u00A0try\u00A0again.";
                errorMessage.style.display = "block";
              }
            }
          } catch (error) {
            console.error("Error:", error);
            if (errorMessage) {
              errorMessage.textContent =
                "Something went wrong. Please\u00A0try\u00A0again\u00A0later.";
              errorMessage.style.display = "block";
            }
          }
        });
      });
    }

    function displayProjects(projects) {
      const projectTemplate =
        document.getElementById("project-template").content;
      const projectInfoTemplate = document.getElementById(
        "project-info-template"
      ).content;
      const projectContainers = document.querySelectorAll(
        ".projects-container"
      );
      const loginContainers = document.querySelectorAll(".login-container");

      // Clear existing projects first to avoid duplication
      projectContainers.forEach((container) => {
        // Keep only the template elements, remove everything else
        Array.from(container.children).forEach((child) => {
          if (!child.id || !child.id.includes("template")) {
            container.removeChild(child);
          }
        });
      });

      projects.forEach((project, index) => {
        // Clone the project template
        const cloneProject = projectTemplate.cloneNode(true);
        const projectTitle = cloneProject.querySelector(".project-title");
        const openButton = cloneProject.querySelector(".open-button");

        if (!openButton) {
          console.error(
            "Open button not found in the cloned project template!"
          );
          return; // Exit early if the button is missing
        }

        projectTitle.textContent = project.title;

        // Set a unique identifier for the project info
        const projectInfoId = `project-${index}`;
        openButton.dataset.projectId = projectInfoId;

        // Clone the project info template
        const cloneInfo = projectInfoTemplate.cloneNode(true);
        cloneInfo.querySelector(".project-info-title").textContent =
          project.title;
        cloneInfo.querySelector(".project-description").textContent =
          project.description;

        const projectLink = cloneInfo.querySelector(".project-link");
        if (projectLink && project.link) {
          projectLink.href = project.link;
        }

        // Populate the image
        const projectImage = cloneInfo.querySelector(".project-image");
        if (projectImage) {
          if (project.image) {
            projectImage.src = project.image;
            projectImage.alt = `Image of ${project.title}`;
          } else {
            projectImage.style.display = "none"; // Hide the image element if no image is provided
          }
        }

        const projectInfo = cloneInfo.querySelector(".project-info");
        if (projectInfo) {
          projectInfo.classList.add("is--hidden");
          projectInfo.id = projectInfoId;
        }

        // Add steps to the project info
        const stepsList = cloneInfo.querySelector(".project-steps");
        if (stepsList && project.steps && Array.isArray(project.steps)) {
          project.steps.forEach((step) => {
            const listItem = document.createElement("li");
            listItem.textContent = step;
            stepsList.appendChild(listItem);
          });
        }

        // Append the cloned project to each project container
        projectContainers.forEach((container) => {
          const clonedProject = cloneProject.cloneNode(true); // Clone for each container
          container.appendChild(clonedProject);
          container.appendChild(cloneInfo);
        });
      });

      // Show all project containers and hide login forms
      projectContainers.forEach((container) => {
        container.classList.remove("is--hidden");
      });

      loginContainers.forEach((container) => {
        container.style.display = "none";
      });

      // Initialize the popup window behavior
      const projectsContainer = document.querySelector(".popup-window.project");
      if (projectsContainer) {
        document.querySelectorAll(".open-button").forEach((btn) => {
          btn.addEventListener("click", () => {
            projectsContainer.classList.add("is--active");
          });
        });
      }
    }

    function setupProjectEventListeners() {
      // Event delegation for handling clicks on the "Show Details" buttons
      document.addEventListener("click", (event) => {
        const target = event.target.closest(".open-button");
        if (target) {
          const projectId = target.dataset.projectId;
          showProjectInfo(projectId);
        }

        // Handle popup close button if present
        if (event.target.closest(".close-popup")) {
          const popupWindow = event.target.closest(".popup-window");
          if (popupWindow) {
            popupWindow.classList.remove("is--active");
          }
        }
      });
    }

    // Function to display project info
    function showProjectInfo(projectId) {
      const allProjectInfos = document.querySelectorAll(".project-info");
      allProjectInfos.forEach((info) => info.classList.add("is--hidden"));

      const selectedProjectInfo = document.getElementById(projectId);
      if (selectedProjectInfo) {
        selectedProjectInfo.classList.remove("is--hidden");
      }
    }
  }

  function submitForm() {
    const formWrapper = document.querySelector(".form-wrapper");
    const form = document.getElementById("contactForm");
    const submitButton = document.querySelector(".submit-button");
    const inputFields = document.querySelectorAll(".text-field, #message");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameInput = document.getElementById("name");
    const successMessage = document.querySelector(".success-message-div");
    const errorMessage = document.querySelector(".error-message-div");

    function disableSubmitButton() {
      submitButton.disabled = true;
      submitButton.value = "Please wait...";
    }

    function enableSubmitButton() {
      submitButton.disabled = false;
      submitButton.value = "Send message"; // Restore original text
    }

    function validateField(inputField) {
      let isValid = true;

      if (inputField.value.trim() === "") {
        inputField.classList.add("error");
        isValid = false;
      } else {
        inputField.classList.remove("error");
      }

      if (inputField.id === "email") {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          inputField.value.trim()
        );
        if (!isValidEmail) {
          inputField.classList.add("error");
          isValid = false;
        } else {
          inputField.classList.remove("error");
        }
      }

      return isValid;
    }

    inputFields.forEach((inputField) => {
      inputField.addEventListener("blur", function () {
        validateField(inputField);
      });

      inputField.addEventListener("input", function () {
        if (inputField.classList.contains("error")) {
          validateField(inputField);
        }
      });
    });

    submitButton.addEventListener("click", function (event) {
      let isValid = true;

      inputFields.forEach((inputField) => {
        if (!validateField(inputField)) {
          isValid = false;
        }
      });

      formWrapper.classList.toggle("error", !isValid);

      if (!isValid) {
        event.preventDefault();
        return;
      }
    });

    function netlifyFormSubmit() {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        disableSubmitButton();

        fetch(
          "https://joe8lee-portfolio.netlify.app/.netlify/functions/submitForm",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(() => {
            formWrapper.classList.add("success");
            form.style.display = "none";
            successMessage.style.display = "block";
            errorMessage.style.display = "none";

            setTimeout(() => {
              $(".form-popup").removeClass("is--active");
            }, 3000);
          })
          .catch(() => {
            formWrapper.classList.add("error");
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
          })
          .finally(() => {
            enableSubmitButton();
          });
      });
    }

    netlifyFormSubmit();

    $(".email-close, .message-button").on("click", function () {
      $(".form-popup").removeClass("is--active");
    });

    $(".send-message, .message-button").on("click", function () {
      $(".form-popup").addClass("is--active");
    });

    function updateFormWrapperClass() {
      const isSuccessVisible =
        window.getComputedStyle(successMessage).display === "block";
      const isErrorVisible =
        window.getComputedStyle(errorMessage).display === "block";

      formWrapper.classList.toggle("success", isSuccessVisible);
      formWrapper.classList.toggle("error", isErrorVisible);
    }

    const observer = new MutationObserver(updateFormWrapperClass);
    const config = { attributes: true, attributeFilter: ["style"] };

    if (successMessage) observer.observe(successMessage, config);
    if (errorMessage) observer.observe(errorMessage, config);

    updateFormWrapperClass();
  }

  function updateOnlineStatus() {
    const $onlineStatusElement = $(".online-status");

    // Get the current time in Eastern Time
    const now = new Date();
    const estTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const hours = estTime.getHours();
    const dayOfWeek = estTime.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Check if it's a weekday (Monday-Friday: 1-5)
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    // Determine the status based on the time and day
    let status;
    if (isWeekday) {
      // Only apply the online/busy statuses during weekdays
      if (hours >= 9 && hours < 20) {
        status = "online"; // 9am to 8pm
      } else if ((hours >= 7 && hours < 9) || (hours >= 20 && hours < 22)) {
        status = "busy"; // 7am to 9am and 8pm to 10pm
      } else {
        status = "offline"; // 10pm to 7am
      }
    } else {
      // Weekend - always offline
      status = "offline";
    }

    // Update the attribute
    $onlineStatusElement.attr("data-online-status", status);
  }

  function updateLocalTime() {
    // Utility function untuk menampilkan timezone Indonesia (WIB)
    function getTimeZoneAbbreviation() {
      return "WIB";
    }

    function updateWidgetTime() {
      const dayElement = document.querySelector(".widget-display-current-day");
      const timeElement = document.querySelector(
        ".widget-display-current-time"
      );

      function updateTime() {
        const now = new Date();

        // Get day of the week (pakai English)
        const optionsDay = { weekday: "long", timeZone: "Asia/Jakarta" };
        const currentDay = now.toLocaleDateString("en-US", optionsDay);

        // Get time in Indonesia (WIB)
        const optionsTime = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Jakarta",
        };
        const currentTime = now.toLocaleTimeString("en-US", optionsTime);

        const timeZoneAbbr = getTimeZoneAbbreviation();

        // Update elements
        if (dayElement) dayElement.textContent = currentDay;
        if (timeElement)
          timeElement.textContent = `${currentTime} ${timeZoneAbbr}`;
      }

      // Initial update
      updateTime();

      // Update every second
      setInterval(updateTime, 1000);
    }

    function updateTimeZoneAbbreviation() {
      const timeElement = document.querySelector(
        ".profile-name .description .time-et"
      );
      const timeZoneAbbr = getTimeZoneAbbreviation();

      if (timeElement) {
        timeElement.textContent = timeZoneAbbr;
      }
    }

    // Call the update function
    updateWidgetTime();
    updateTimeZoneAbbreviation();
  }

  function expandPanel() {
    // Create a media query
    const tabletMediaQuery = window.matchMedia(
      "(min-width: 481px) and (max-width: 991px)"
    );

    // Function to handle the media query changeX   s
    function handleTabletChange(e) {
      if (e.matches) {
        // Target the buttons regardless of their current state
        const expandButton = $(".expand-button");
        const messageText = $(".send-message .file-link");
        const expandText = $(".expand-button-text");
        const resumeInfoPanel = $(".c-resume-info-panel-wrapper");

        messageText.text("Message");

        // Use a single click handler for the expand button
        expandButton.on("click", function () {
          // Toggle between collapsed and expanded states
          if ($(this).hasClass("is--collapsed")) {
            // Expand
            $(this).removeClass("is--collapsed");
            $(this).addClass("is--expanded");
            resumeInfoPanel.toggleClass("is--collapsed");
            messageText.text("Send message");
            expandText.text("Collapse");
          } else {
            // Collapse
            $(this).addClass("is--collapsed");
            $(this).removeClass("is--expanded");
            resumeInfoPanel.toggleClass("is--collapsed");
            messageText.text("Message");
            expandText.text("Expand");
          }
        });
      }
    }

    // Initial check
    handleTabletChange(tabletMediaQuery);

    // Add listener for changes (e.g., when user resizes the window or rotates device)
    tabletMediaQuery.addEventListener("change", handleTabletChange);
  }

  function scrollTop() {
    // Get all list-folder-item elements within projects-container.list
    const listItems = document.querySelectorAll(
      ".projects-container.list .list-folder-item"
    );

    // Add click event listener to each list item
    listItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Prevent default behavior if it's a button click
        if (e.target.closest(".open-button")) {
          return; // Let the open button handle its own click
        }

        // Get the project ID from the adjacent open button
        const openButton = this.querySelector(".open-button");
        const projectId = openButton
          ? openButton.getAttribute("data-project-id")
          : null;

        if (projectId) {
          // Toggle the project info visibility
          const projectInfo = document.getElementById(projectId);
          const isHidden = projectInfo.classList.contains("is--hidden");

          // Close all other project infos
          document.querySelectorAll(".project-info").forEach((info) => {
            info.classList.add("is--hidden");
          });

          // If it was hidden, show it and scroll to it
          if (isHidden) {
            projectInfo.classList.remove("is--hidden");

            // Scroll the item to the top with smooth behavior
            setTimeout(() => {
              this.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100); // Small delay to allow DOM to update
          }

          // Toggle active state for list items
          document.querySelectorAll(".list-folder-item").forEach((li) => {
            li.classList.remove("is--active");
          });
          this.classList.add("is--active");
        }
      });
    });

    // Handle open button clicks separately to maintain existing functionality
    const openButtons = document.querySelectorAll(".open-button");
    openButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the list item click from firing

        const projectId = this.getAttribute("data-project-id");
        if (projectId) {
          const projectInfo = document.getElementById(projectId);
          const isHidden = projectInfo.classList.contains("is--hidden");

          // Close all project infos
          document.querySelectorAll(".project-info").forEach((info) => {
            info.classList.add("is--hidden");
          });

          // Toggle the clicked one
          if (isHidden) {
            projectInfo.classList.remove("is--hidden");

            // Scroll the parent list item to the top
            const parentListItem = this.closest(".list-folder-item");
            setTimeout(() => {
              parentListItem.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }

          // Toggle active state
          document.querySelectorAll(".list-folder-item").forEach((li) => {
            li.classList.remove("is--active");
          });
          this.closest(".list-folder-item").classList.add("is--active");
        }
      });
    });
  }

  listLogic();
  setTimeout(function () {
    loginForm();
    scrollTop();
    submitForm();
  }, 50);
  updateOnlineStatus();
  updateLocalTime();
  expandPanel();

  console.log("customResume() function is called");
}

function globalFunctions() {
  function navPanel() {
    if (window.matchMedia("(min-width: 992px)").matches) {
      $(".ui-panel-link-container").on("mouseenter", function () {
        $(".ui-panel-animated-links").addClass("is--revealed");
      });

      $(".ui-panel-link-container").on("mouseleave", function () {
        $(".ui-panel-animated-links").removeClass("is--revealed");
      });
    } else {
      $(".ui-panel-link-container").on("click", function () {
        if (!$(".ui-panel-animated-links").hasClass("is--revealed")) {
          $(".ui-panel-animated-links").addClass("is--revealed");
        } else {
          $(".ui-panel-animated-links").removeClass("is--revealed");
        }
      });
    }
  }

  function inputFieldStyle() {
    const passwordInput = document.querySelector(".password-input");
    const customDisplay = document.querySelector(".custom-display");
    const passwordButton = document.querySelector(".password-button");

    // Track if the button was clicked
    let isButtonClick = false;

    // Function to update the password display
    function updatePasswordDisplay() {
      const length = passwordInput.value.length;
      customDisplay.innerHTML = ""; // Clear previous dots

      // Create custom dots/characters
      for (let i = 0; i < length; i++) {
        const dot = document.createElement("span");
        dot.className = "password-dot";
        customDisplay.appendChild(dot);
      }

      // Add custom caret if input is focused
      if (document.activeElement === passwordInput) {
        const caret = document.createElement("span");
        caret.className = "custom-caret";
        customDisplay.appendChild(caret);
      }

      // Auto-scroll to show the end (newest characters)
      customDisplay.scrollLeft = customDisplay.scrollWidth;
    }

    // Function to handle input events
    function handleInput() {
      customDisplay.style.backgroundColor = "var(--colors--background)";
      passwordInput.style.webkitTextFillColor = "transparent";
      updatePasswordDisplay();
    }

    // Function to handle blur events
    function handleBlur() {
      // Don't remove background if button was clicked
      if (isButtonClick) {
        updatePasswordDisplay();
        return;
      }

      // Use a short timeout to check if we're in a button click sequence
      setTimeout(() => {
        if (!isButtonClick) {
          customDisplay.style.backgroundColor = ""; // Remove background color
          passwordInput.style.webkitTextFillColor = "";
          updatePasswordDisplay();
        }
      }, 100);
    }

    // Handle password button interactions
    passwordButton.addEventListener("mousedown", function () {
      isButtonClick = true;
    });

    passwordButton.addEventListener("click", function () {
      customDisplay.style.backgroundColor = "var(--colors--background)";
      passwordInput.style.webkitTextFillColor = "transparent";

      // Re-focus the input if needed
      passwordInput.focus();
      setTimeout(() => {
        isButtonClick = false;
      }, 200);
    });

    // Event listeners
    passwordInput.addEventListener("input", handleInput);
    passwordInput.addEventListener("focus", handleInput);
    passwordInput.addEventListener("blur", handleBlur);
  }

  navPanel();
  // inputFieldStyle()
}

function pageNotFound() {
  function slotMachine() {
    const digit1 = document.getElementById("digit1");
    const digit2 = document.getElementById("digit2");
    const digit3 = document.getElementById("digit3");

    // Set initial position (showing 0)
    digit1.style.top = "0em";
    digit2.style.top = "0em";
    digit3.style.top = "0em";

    // Function to get the appropriate multiplier based on screen width
    function getResponsiveMultiplier() {
      const width = window.innerWidth;

      if (width >= 992) {
        return 9.35; // Desktop multiplier
      } else if (width >= 479 && width <= 991) {
        return 9.25; // Tablet multiplier
      } else {
        return 8.95; // Mobile multiplier (<= 478px)
      }
    }

    // Define height in em to match your text size
    const digitHeight = 1.35; // em
    let multiplier = getResponsiveMultiplier(); // The value that works for your specific layout

    // Calculate final position once
    const finalPosition = `-${multiplier * digitHeight}em`;

    // Apply to each digit with different timing
    setTimeout(() => {
      digit1.style.top = finalPosition;
      digit1.style.transition = "top 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
    }, 300);

    setTimeout(() => {
      digit2.style.top = finalPosition;
      digit2.style.transition = "top 3.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
    }, 150);

    setTimeout(() => {
      digit3.style.top = finalPosition;
      digit3.style.transition = "top 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
    }, 0);

    window.addEventListener("resize", () => {
      multiplier = getResponsiveMultiplier();
      const newPosition = `-${multiplier * digitHeight}em`;

      digit1.style.top = newPosition;
      digit2.style.top = newPosition;
      digit3.style.top = newPosition;
    });
  }

  function appleParallax() {
    // Select all apple icon pattern elements
    const appleIcons = document.querySelectorAll(".apple-icon-pattern");

    // Configuration
    const parallaxStrength = 80; // How strong the movement should be (pixels)

    // Initialize mouse position variables
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position when mouse moves
    document.addEventListener("mousemove", (e) => {
      // Get mouse position relative to the center of the viewport
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;

      // Apply parallax effect to each apple icon
      appleIcons.forEach((icon) => {
        // Calculate the movement based on mouse position
        // Divide by a value to make the movement subtler
        const moveX = (mouseX / window.innerWidth) * parallaxStrength;
        const moveY = (mouseY / window.innerHeight) * parallaxStrength;

        // Get current rotation or other transforms (if any)
        const currentTransform = window.getComputedStyle(icon).transform;
        const hasTransform = currentTransform !== "none";

        // Store original rotation in a data attribute if we haven't already
        if (!icon.dataset.originalTransform) {
          icon.dataset.originalTransform = hasTransform
            ? currentTransform
            : "rotate(0deg)";
        }

        // Apply the translate transform while preserving the original transform
        icon.style.transform = `translate(${moveX}px, ${moveY}px) ${icon.dataset.originalTransform}`;
      });
    });

    // Optional: Add a smooth transition for more fluid movement
    appleIcons.forEach((icon) => {
      icon.style.transition = "transform 0.2s ease-out";
    });

    // Optional: Reset position when mouse leaves the window
    document.addEventListener("mouseleave", () => {
      appleIcons.forEach((icon) => {
        icon.style.transform = icon.dataset.originalTransform || "rotate(0deg)";
      });
    });
  }

  slotMachine();
  appleParallax();
}

function cleanupFunction() {
  // Remove all event listeners
  $(document).off(); // More targeted would be better

  // Clear intervals
  clearInterval(onlineStatusInterval);

  // Disconnect observers
  if (window.observers) {
    window.observers.forEach((observer) => observer.disconnect());
    window.observers = [];
  }
}

barba.init({
  views: [
    {
      namespace: "custom-ui",
      beforeEnter(data) {
        console.clear();
        customUiInit();
        globalFunctions();
        console.log("entering custom.UI");
      },
      beforeLeave(data) {
        cleanupFunction();
        console.log("leaving custom.UI");

        // Clear intervals to prevent them from running after leaving
        clearInterval(onlineStatusInterval);
      },
    },
    {
      namespace: "custom-simplified",
      beforeEnter(data) {
        console.clear();
        customSimplifiedInit();
        globalFunctions();
        console.log("entering custom.simplified");
      },
      beforeLeave(data) {
        cleanupFunction();
        console.log("leaving custom.simplified");

        clearInterval(onlineStatusInterval);
      },
    },
    {
      namespace: "custom-resume",
      beforeEnter(data) {
        console.clear();
        globalFunctions();
        customResume();
        console.log("entering custom.resume");
      },
      beforeLeave(data) {
        cleanupFunction();
        console.log("leaving custom.resume");

        clearInterval(onlineStatusInterval);
      },
    },
    {
      namespace: "404",
      beforeEnter(data) {
        console.clear();
        pageNotFound();
        console.log("404 not found");
      },
      beforeLeave(data) {
        cleanupFunction();
        console.log("leaving 404 not found");
      },
    },
  ],
  transitions: [
    {
      name: "default-transition",
      // This is the important part for GTM:
      after() {
        // Push page view event to dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "virtualPageview",
          page: {
            path: window.location.pathname,
            title: document.title,
          },
        });
      },
    },
  ],
});
