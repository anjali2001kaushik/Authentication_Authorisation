window.addEventListener("load", () => {
  const tabElements = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabElements.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabContents.forEach((tabContent) => {
        tabContent.style.display = "none";
      });
      tabContents[index].style.display = "block";
      tabElements.forEach((tabElement) => {
        tabElement.classList.remove("active");
      });
      tab.classList.add("active");
    });
  });

  //   const logoutButton = document.getElementById("logoutButton");

  //   logoutButton.addEventListener("click", async () => {
  //     try {
  //       const response = await fetch("/logout", {
  //         method: "POST",
  //         // Add any necessary headers or credentials here
  //       });

  //       if (response.ok) {
  //         // Logout successful
  //         // Redirect the user to the login page or perform any other actions
  //       } else {
  //         // Logout failed
  //         // Handle the error or display an error message
  //       }
  //     } catch (error) {
  //       // Handle network errors or exceptions
  //       console.error(error);
  //     }
  //   });
  const registerButton = document.getElementById("createUser");
  registerButton.addEventListener("click", () => {
    document.getElementById("popupForm").style.display = "block";
    document.getElementById("overlay").classList.add("overlay-visible");
  });

  const editButton = document.getElementById("editUser");
  editButton.addEventListener("click", () => {
    document.getElementById("popupForm").style.display = "block";
    document.getElementById("overlay").classList.add("overlay-visible");
  });

  const close_button = document.getElementById("close_button");
  close_button.addEventListener("click", () => {
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("overlay").classList.remove("overlay-visible");
  });

  document.querySelector('.User-avtar').addEventListener('click', function() {
    let dropdown = document.querySelector('.User-Dropdown');
    if (dropdown.classList.contains('U-open')) {
      dropdown.classList.remove('U-open');
    } else {
      dropdown.classList.add('U-open');
    }
  });
  
});
