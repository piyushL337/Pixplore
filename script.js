// Generate image cards dynamically
const categories = ['nature', 'travel', 'food', 'architecture', 'animals'];
const gallery = document.querySelector('.gallery');

function generateImageCards() {
  let content = '';
  for (let i = 1; i <= 20; i++) {
    const category = categories[i % categories.length];
    const imageUrl = `https://source.unsplash.com/400x400/?${category}&sig=${i}`;
    content += `
      <div class="gallery-item card" data-category="${category}">
        <img src="${imageUrl}" alt="${category} Image">
      </div>
    `;
  }
  return content;
}

gallery.innerHTML = generateImageCards();

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    galleryItems.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Image Modal Functionality
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentImageIndex = 0;
let imageNodes = [];

function openModal(index) {
  currentImageIndex = index;
  const imageSrc = imageNodes[currentImageIndex].querySelector('img').src;
  modalImg.src = imageSrc;
  modal.style.display = 'block';
}

function closeModalHandler() {
  modal.style.display = 'none';
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % imageNodes.length;
  openModal(currentImageIndex);
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + imageNodes.length) % imageNodes.length;
  openModal(currentImageIndex);
}

document.addEventListener('DOMContentLoaded', () => {
  imageNodes = document.querySelectorAll('.gallery-item');

  imageNodes.forEach((node, index) => {
    node.addEventListener('click', () => openModal(index));
  });

  closeModal.addEventListener('click', closeModalHandler);
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModalHandler();
  }
});
