//header
const divMiniBar = document.querySelector(".header_miniBar");
if (divMiniBar) {
  const buttonMiniBar = divMiniBar.querySelector(".mini-bar");
  const actions = document.querySelector(".header_actions");
  buttonMiniBar.addEventListener("click", () => {
    actions.classList.toggle("active");
  });
}
//slide product
$(".product-slider").slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  prevArrow:
    '<button type="button" class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
  nextArrow:
    '<button type="button" class="slick-next"><i class="fa-solid fa-angle-right"></i></button>',
  responsive: [
    {
      breakpoint: 1199.98, // dưới 1200px
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 991.98, // dưới 992px (tablet)
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 575, // dưới 768px (mobile ngang)
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
});
$(".banner-slider").slick({
  infinite: true,
  slidesToShow: 1, // ✅ chỉ 1 ảnh mỗi lần
  slidesToScroll: 1,
  prevArrow:
    '<button type="button" class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
  nextArrow:
    '<button type="button" class="slick-next"><i class="fa-solid fa-angle-right"></i></button>',
});
//preview ảnh khi upload
//preview ảnh khi upload
const uploadImage = document.querySelector(".upload-image");

if (uploadImage) {
  const uploadImageInput = document.querySelector(".upload-image-input");
  const uploadPreviewInput = document.querySelector(".upload-image-preview");

  // 🖼️ Xử lý khi người dùng chọn ảnh
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadPreviewInput.src = URL.createObjectURL(file); // hiện ảnh preview
      uploadPreviewInput.style.display = "block"; // hiện lại khi chọn ảnh
    }
  });

  // 🗑️ Xử lý khi nhấn nút xóa ảnh
  const buttonDeleteImage = uploadImage.querySelector("[button-delete-image]");
  if (buttonDeleteImage) {
    buttonDeleteImage.addEventListener("click", () => {
      uploadPreviewInput.src = "";
      uploadImageInput.value = ""; // reset input file
      uploadPreviewInput.style.display = "none"; // ẩn preview
    });
  }

  // 🚫 Ẩn preview nếu không có ảnh ban đầu
  if (
    !uploadPreviewInput.getAttribute("src") ||
    uploadPreviewInput.src.endsWith("avatar.png")
  ) {
    uploadPreviewInput.style.display = "none";
  }
}
//preview ảnh khi upload
