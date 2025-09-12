// Sample data for featured businesses
const businesses = [
    {
        name: "TechSolutions",
        description: "Innovative technology solutions for businesses of all sizes.",
        phone: "+593 958753737",
        image: "https://es.snhu.edu/img/article/que-es-gestion-de-tecnologias-de-informacion.webp"
    },
    {
        name: "GreenHarvest",
        description: "Organic and sustainable agricultural products straight from the farm to your table.",
        phone: "+593  456-7891",
        image: "https://scontent.fuio1-1.fna.fbcdn.net/v/t1.6435-9/98089030_101339951596319_4410774878613929984_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeFnOHXzWL_yNE5Ecg3gJX4KdjnhrziumFh2OeGvOK6YWB5ZgLnnbovdo2MGtyh8k5OBAEyuDpWGeyk6Y1dDK1yh&_nc_ohc=hFb7NG8JkTkQ7kNvwF-ppm7&_nc_oc=AdldUtVqrZscjE3rahhvmg7cwcf7appEw8vsX4iVfTamT_VBj7kX65ujQuvBQpyWR2A&_nc_zt=23&_nc_ht=scontent.fuio1-1.fna&_nc_gid=W6Rr-PeFXFAiiTqWciFDhg&oh=00_AfaCxMf4bZvxKCIutxmETZ4wAVuz3U1UTWAqpojiopm77g&oe=68EB10E7"
    },
    {
        name: "Quito Tours",
        description: "Unique tourist experiences to explore the beauty of our region.",
        phone: "+593 456-7892",
        image: "https://www.quito-turismo.gob.ec/wp-content/uploads/2021/03/vitrinas.jpeg"
    }
];

// Sample data for events
const events = [
    {
        date: "October 15, 2025",
        title: "Business Networking",
        description: "Connect with other entrepreneurs and expand your network.",
        location: "Downtown Quito Convention Center"
    },
    {
        date: "October 22, 2025",
        title: "Digital Marketing Workshop",
        description: "Learn effective strategies to promote your business online.",
        location: "Downtown City Conference Room"
    },
    {
        date: "November 5, 2025",
        title: "Job Fair 2025",
        description: "Connecting local talent with companies looking to grow.",
        location: "Central Plaza"
    }
];

// Function to load featured businesses
function loadBusinessSpotlights() {
    const container = document.getElementById('business-spotlights');
    
    businesses.forEach(business => {
        const businessCard = document.createElement('div');
        businessCard.className = 'business-card';
        businessCard.innerHTML = `
            <img src="${business.image}" alt="${business.name}">
            <div class="business-info">
                <h3>${business.name}</h3>
                <p>${business.description}</p>
                <p><i class="fas fa-phone"></i> ${business.phone}</p>
            </div>
        `;
        container.appendChild(businessCard);
    });
}

// Function to load events
function loadEvents() {
    const container = document.getElementById('events-list');
    
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <span class="event-date">${event.date}</span>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
        `;
        container.appendChild(eventItem);
    });
}

// Function to update weather
function updateWeather() {
    const date = new Date();
    const hours = date.getHours();
    
    // Change icon depending on the time of day
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDesc = document.getElementById('weather-desc');
    
    if (hours >= 6 && hours < 18) {
        weatherIcon.className = 'fas fa-sun';
        weatherDesc.textContent = 'Sunny';
    } else {
        weatherIcon.className = 'fas fa-moon';
        weatherDesc.textContent = 'Clear';
    }
    
    // Simulated weather data (in a real implementation, this would come from an API)
    document.getElementById('wind-speed').textContent = Math.floor(Math.random() * 10) + 5;
    document.getElementById('humidity').textContent = Math.floor(Math.random() * 30) + 40;
}

// Function for hamburger menu
function setupMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav').querySelector('ul');
    
    hamburgerBtn.addEventListener('click', function() {
        mainNav.classList.toggle('show');
    });
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    loadBusinessSpotlights();
    loadEvents();
    updateWeather();
    setupMobileMenu();
    
    // Update weather every hour
    setInterval(updateWeather, 3600000);
});
