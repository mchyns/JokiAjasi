// Lightbox functionality
const lightboxContainer = document.getElementById('lightbox-container');
const lightboxImage = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

// Add click event to all gallery images
document.querySelectorAll('.lightbox').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const imgSrc = this.getAttribute('href');
        const imgAlt = this.querySelector('img').getAttribute('alt');
        
        lightboxImage.src = imgSrc;
        lightboxCaption.textContent = imgAlt;
        lightboxContainer.style.display = 'block';
    });
});

// Close lightbox when clicking X
closeLightbox.addEventListener('click', function() {
    lightboxContainer.style.display = 'none';
});

// Close lightbox when clicking outside the image
lightboxContainer.addEventListener('click', function(e) {
    if (e.target === lightboxContainer) {
        lightboxContainer.style.display = 'none';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightboxContainer.style.display === 'block') {
        lightboxContainer.style.display = 'none';
    }
}); 