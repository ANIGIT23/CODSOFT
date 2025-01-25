document.getElementById('theme-toggle-btn').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelector(`#${targetId}`).scrollIntoView({
            behavior: 'smooth'
        });
        if (targetId === 'achievements') {
            startStatsAnimation();
        }
    });
});


const stats = [
    { id: 'projects-completed', target: 100 },
    { id: 'projects-in-progress', target: 30 },
    { id: 'customer-satisfaction', target: 95 }
];

function startStatsAnimation() {
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        let current = 0;
        const interval = setInterval(() => {
            if (current >= stat.target) {
                clearInterval(interval);
            } else {
                current++;
                element.textContent = current;
            }
        }, 50);
    });
}


const gifs = document.querySelectorAll('.session .visual img');
const statsSection = document.querySelector('#achievements');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.tagName === 'IMG') {
                entry.target.classList.add('animate');
            } else if (entry.target.id === 'achievements') {
                startStatsAnimation();
            }
        } else {
            if (entry.target.tagName === 'IMG') {
                entry.target.classList.remove('animate');
            }
        }
    });
}, observerOptions);

gifs.forEach(gif => {
    observer.observe(gif);
});

observer.observe(statsSection);


document.getElementById('clear-email-btn').addEventListener('click', function() {
    document.getElementById('email-input').value = '';
});
