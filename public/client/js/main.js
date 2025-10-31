//header
const divMiniBar = document.querySelector(".header_miniBar");
if(divMiniBar){
    const buttonMiniBar = divMiniBar.querySelector(".mini-bar");
    const actions = document.querySelector(".header_actions");
    buttonMiniBar.addEventListener("click",() =>{
        actions.classList.toggle("active");
    })
}
//slide product
$('.product-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-angle-right"></i></button>',
    responsive: [
        {
            breakpoint: 1199.98, // dưới 1200px
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 991.98, // dưới 992px (tablet)
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 575, // dưới 768px (mobile ngang)
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
    ]
});
$('.banner-slider').slick({
    infinite: true,
    slidesToShow: 1,       // ✅ chỉ 1 ảnh mỗi lần
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-angle-right"></i></button>',
});