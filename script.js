// ====== CONFIGURATION ======
const USERNAME = 'Sahil'; // Change to your name
const ANIMATED_TEXTS = [
  'I build native Android apps with Kotlin.',
  'Writing clean, idiomatic Kotlin code.',
  'Focused on scalable app architecture.',
  'Creating fluid, responsive UIs.',
  'Skilled in MVVM & Jetpack libraries.',
  'Debugging and optimization expert.',
  'Strong grip on DSA for real-world apps.',
  'Transforming ideas into mobile products.',
  'Performance-driven Android development.',
  'Committed to crafting intuitive UX.'
];

// ====== SPLASH ANIMATION ======
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const splashUsername = document.getElementById('splash-username');
  const appBar = document.getElementById('app-bar');
  const appBarTitle = document.getElementById('app-bar-title');
  const phoneFrame = document.getElementById('phone-frame');

  // Set username
  splashUsername.textContent = USERNAME;
  appBarTitle.textContent = USERNAME;
  document.querySelectorAll('.home-screen h2').forEach(h2 => h2.textContent = `Hi, I'm ${USERNAME}`);

  // Animate splash username upward into app bar
  setTimeout(() => {
    // Get splash username position
    const splashRect = splashUsername.getBoundingClientRect();
    const appBarRect = appBarTitle.getBoundingClientRect();
    // Create a floating clone
    const clone = splashUsername.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = splashRect.left + 'px';
    clone.style.top = splashRect.top + 'px';
    clone.style.width = splashRect.width + 'px';
    clone.style.height = splashRect.height + 'px';
    clone.style.margin = 0;
    clone.style.zIndex = 2000;
    clone.style.transition = 'all 0.7s cubic-bezier(.4,0,.2,1)';
    document.body.appendChild(clone);
    // Hide original
    splashUsername.style.visibility = 'hidden';
    // Animate to app bar
    setTimeout(() => {
      clone.style.left = appBarRect.left + 'px';
      clone.style.top = appBarRect.top + 'px';
      clone.style.width = appBarRect.width + 'px';
      clone.style.height = appBarRect.height + 'px';
      clone.style.fontSize = '1.2rem';
    }, 100);
    // Fade out splash, show app
    setTimeout(() => {
      splash.style.opacity = 0;
      phoneFrame.style.opacity = 1;
      clone.style.opacity = 0;
    }, 900);
    // Remove splash and clone
    setTimeout(() => {
      splash.style.display = 'none';
      clone.remove();
      document.getElementById('home-screen').classList.add('active');
    }, 1400);
  }, 900);
});

// ====== NAVIGATION ======
const navBtns = document.querySelectorAll('.nav-btn');
const screens = document.querySelectorAll('.screen');
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    screens.forEach(s => {
      s.classList.remove('active');
      s.hidden = true;
    });
    const target = document.getElementById(btn.dataset.screen);
    target.classList.add('active');
    target.hidden = false;
  });
});

// ====== ANIMATED TEXT (HOME) ======
const animatedText = document.querySelector('.animated-text');
let textIndex = 0;
function animateText() {
  if (!animatedText) return;
  animatedText.textContent = '';
  let chars = ANIMATED_TEXTS[textIndex].split('');
  chars.forEach((char, i) => {
    setTimeout(() => {
      animatedText.textContent += char;
    }, 30 * i);
  });
  setTimeout(() => {
    textIndex = (textIndex + 1) % ANIMATED_TEXTS.length;
    animateText();
  }, 2000 + 30 * chars.length);
}
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateText, 1800);
});

// ====== DARK/LIGHT MODE TOGGLE ======
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}
themeToggle.addEventListener('click', toggleTheme);
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  setTheme(saved || 'light');
});

// ====== DYNAMIC CONTENT (Projects, Skills, Contact) ======
window.addEventListener('DOMContentLoaded', () => {
  // Projects
  const projects = [
    {
      title: 'ChargeNG',
      tech: ['Kotlin', 'Firebase', 'Retrofit' ,'Google Map SDK','Room','Open Wheather API', 'IOT Integrated'],
      desc: 'A app that let find the nearby EV and CNG Station with the real time availability',
      github: 'https://github.com/yourname/weatherly',
      play: 'https://play.google.com/store/apps/details?id=weatherly.app',
      video: 'videos/chargeNG.mp4',
      images: ['chargeNG/WhatsApp Image 2025-05-04 at 23.44.10_4d724c76.jpg', 'chargeNG/WhatsApp Image 2025-05-04 at 23.44.10_2128dab0.jpg', 'chargeNG/WhatsApp Image 2025-05-04 at 23.44.11_4c0fb036.jpg','chargeNG/WhatsApp Image 2025-05-04 at 23.44.12_32c30c59.jpg','chargeNG/WhatsApp Image 2025-05-04 at 23.44.12_e155b19a.jpg']
    },
    {
      title: 'Revisly',
      tech: ['Kotlin', 'Room', 'Retrofit','Render', 'FastApi', 'Python'],
      desc: 'A app that let organize the saved/bookmark content from other-platforms into a single app',
      github: 'https://github.com/yourname/taskzen',
      play: '',
      video: 'videos/revisly.mp4',
      images: ['revisly/1.jpg', 'revisly/2.jpg', 'revisly/3.jpg','revisly/4.jpg', 'revisly/5.jpg', 'revisly/6.jpg']
    }
  ];
  
  const projectsList = document.querySelector('.projects-list');
  projects.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
  
      <div class="project-content">
      <div class="project-title">${p.title}</div>
      <div class="project-tech">${p.tech.map(t => `<span class='skill-chip'>${t}</span>`).join('')}</div>
      <div>${p.desc}</div>
      <div class="project-links">
          <button class="gallery-btn" onclick="event.stopPropagation()">View Gallery</button>
        </div>
      </div>
    `;
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    projectsList.appendChild(card);
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 200 * index);

    // Handle video modal on card click
    card.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-content">
          <span class="close">&times;</span>
          <video class="fullscreen-video" controls autoplay>
            <source src="${p.video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;
      document.body.appendChild(modal);
      modal.style.display = 'flex';

      // Handle close button
      modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
      });

      // Close on click outside video
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });

    // Handle gallery button click
    const galleryBtn = card.querySelector('.gallery-btn');
    galleryBtn.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="modal-images">
            ${p.images.map(img => `<img src="${img}" alt="Project Image" class="modal-img">`).join('')}
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.style.display = 'flex';
      modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
      });
    });
  });

  // Skills
  const skills = {
    languages: {
      title: 'Languages',
      items: ['C', 'C++', 'Java', 'Python', 'Kotlin']
    },
    tools: {
      title: 'Developer Tools',
      items: ['VS Code', 'Android Studio', 'GitHub']
    },
    softSkills: {
      title: 'Soft Skills',
      items: ['Collaborative', 'Problem-solving', 'Curious Learner']
    },
    specialized: {
      title: 'Specialized Knowledge',
      items: ['DSA', 'Android Development', 'Firebase']
    }
  };

  const skillsGrid = document.querySelector('.skills-grid');
  Object.values(skills).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';
    categoryDiv.innerHTML = `
      <h3 class="skill-category-title">${category.title}</h3>
      <div class="skill-category-items">
        ${category.items.map(skill => `
          <div class="skill-chip">
            <span class="skill-icon">${getSkillIcon(skill)}</span>
            ${skill}
          </div>
        `).join('')}
      </div>
    `;
    skillsGrid.appendChild(categoryDiv);
  });

  // Helper function to get icons for skills
  function getSkillIcon(skill) {
    const icons = {
      'C': '⚡',
      'C++': '⚡',
      'Java': '☕',
      'Python': '🐍',
      'Kotlin': '📱',
      'VS Code': '💻',
      'Android Studio': '📱',
      'GitHub': '🐙',
      'Collaborative': '🤝',
      'Problem-solving': '🎯',
      'Curious Learner': '🔍',
      'DSA': '📊',
      'Android Development': '📱',
      'Firebase': '🔥'
    };
    return icons[skill] || '•';
  }

  // Contact
  const contactIcons = document.querySelector('.contact-icons');
  contactIcons.innerHTML = `
    <div class="contact-container">
      <div class="contact-header">
        <h3>Let's Connect</h3>
        <p>Feel free to reach out for collaborations or just a friendly hello</p>
      </div>
      
      <div class="contact-methods">
        <div class="contact-method">
          <div class="contact-icon-wrapper">
            <a class="contact-icon" href="https://github.com/Sleepy-07" target="_blank" title="GitHub">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
            </a>
          </div>
          <div class="contact-info">
            <h4>GitHub</h4>
            <a href="https://github.com/Sleepy-07" target="_blank">@Sleepy-07</a>
          </div>
        </div>

        <div class="contact-method">
          <div class="contact-icon-wrapper">
            <a class="contact-icon" href="https://www.linkedin.com/in/sahil-9abb97327" target="_blank" title="LinkedIn">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.72z"/></svg>
            </a>
          </div>
          <div class="contact-info">
            <h4>LinkedIn</h4>
            <a href="https://www.linkedin.com/in/sahil-9abb97327" target="_blank">Sahil</a>
          </div>
        </div>

        <div class="contact-method">
          <div class="contact-icon-wrapper">
            <a class="contact-icon" href="https://www.instagram.com/sahilv_7/" target="_blank" title="Instagram">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
          <div class="contact-info">
            <h4>Instagram</h4>
            <a href="https://www.instagram.com/sahilv_7/" target="_blank">@sahilv_7</a>
          </div>
        </div>

        <div class="contact-method">
          <div class="contact-icon-wrapper">
            <a class="contact-icon" href="mailto:sahilvrmjji@gmial.com" title="Email">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>
          <div class="contact-info">
            <h4>Email</h4>
            <a href="mailto:sahilvrmjji@gmial.com">sahilvrmjji@gmial.com</a>
          </div>
        </div>
      </div>

      <div class="contact-cta">
        <button class="email-btn" onclick="window.location='mailto:sahilvrmjji@gmial.com'">
          <span>Send Message</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
});

// ====== INITIAL STATE ======
document.getElementById('phone-frame').style.opacity = 0;

// ====== COOL FEATURE: Shake Animation on Profile Picture Hover ======
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
  profilePic.addEventListener('mouseover', () => {
    profilePic.style.animation = 'shake 0.5s';
  });
  profilePic.addEventListener('animationend', () => {
    profilePic.style.animation = 'pulse 2s infinite';
  });
}

// Add shake keyframes
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
`;
document.head.appendChild(style);

// ====== COOL FEATURE: Floating Android Bot ======
if (window.innerWidth > 768) { // Only show on tablets/desktops
  const androidBot = document.createElement('img');
  androidBot.src = 'andorid bot/android bot haappy.png';
  androidBot.alt = 'Android Bot';
  androidBot.style.position = 'fixed';
  androidBot.style.bottom = '20px';
  androidBot.style.right = '20px';
  androidBot.style.width = '100px';
  androidBot.style.height = 'auto';
  androidBot.style.zIndex = 1000;
  androidBot.style.animation = 'float 3s ease-in-out infinite';
  androidBot.style.pointerEvents = 'auto';
  androidBot.style.cursor = 'pointer';

  androidBot.addEventListener('click', () => {
      alert('Android Bot clicked!');
  });

  document.body.appendChild(androidBot);
}

// Add floating keyframes
const floatStyle = document.createElement('style');
floatStyle.textContent = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
`;
document.head.appendChild(floatStyle); 