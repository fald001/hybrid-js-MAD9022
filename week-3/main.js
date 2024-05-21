function fetchRandomImage() {
    return fetch('https://picsum.photos/v2/list')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        return response.blob();
    })
    .catch(error => {
        console.error('Error fetching image:', error);
    });
}

// Store response in cache
function cacheImage(imageUrl, imageBlob) {
    caches.open('image-cache').then(cache => {
        cache.put(imageUrl, new Response(imageBlob));
    });
} 

// Retrive image from cache 
function getImageFromCache(imageUrl) {
    return caches.open('image-cache').then(cache => {
        return cache.match(imageUrl).then(response => {
            if (response) {
                return response.blob();
            }
            return null;
        });
    });
}

// Error handling 
document.getElementById('fetch-button').addEventListener('click', () => {
    retrieveImageFromCache();
    handlecacheexpiration();
  });

 

  
  