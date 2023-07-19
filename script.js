const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchQuery = input.value.trim();
    if (searchQuery === '') {
        resultsContainer.innerHTML = '<p>Please enter a repository name.</p>';
        return;
    }

    const apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = '';

            if (data.items.length === 0) {
                resultsContainer.innerHTML = '<p>No repositories found.</p>';
                return;
            }

            data.items.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.classList.add('repo-item');
                repoItem.innerHTML = `
                    <h2><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></h2>
                    <p class="description">${repo.description}</p>
                    <p>🌟 ${repo.stargazers_count}</p>
                `;
                resultsContainer.appendChild(repoItem);
            });
        })
        .catch(error => {
            console.log('Error:', error);
            resultsContainer.innerHTML = '<p>An error occurred while fetching repositories.</p>';
        });
});
