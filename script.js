// Nav Bar
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('change');
    });
});

// About Section
document.getElementById('image-stack').addEventListener('click', function() {
    const topImage = document.getElementById('image1');
    const bottomImage = document.getElementById('image2');

    if (topImage.classList.contains('image-top')) {
        topImage.classList.remove('image-top');
        topImage.classList.add('image-bottom');
        bottomImage.classList.remove('image-bottom');
        bottomImage.classList.add('image-top');
    } else {
        topImage.classList.remove('image-bottom');
        topImage.classList.add('image-top');
        bottomImage.classList.remove('image-top');
        bottomImage.classList.add('image-bottom');
    }
});
