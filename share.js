// Replace with your Twitter API credentials
const apiKey = 'YOUR_API_KEY';
const apiSecretKey = 'YOUR_API_SECRET_KEY';
const accessToken = 'YOUR_ACCESS_TOKEN';
const accessTokenSecret = 'YOUR_ACCESS_TOKEN_SECRET';

// File input element in your HTML
const fileInput = document.getElementById('fileInput');

// Add an event listener to the file input
fileInput.addEventListener('change', handleFileUpload);

// Function to handle file upload
function handleFileUpload() {
  const file = fileInput.files[0];

  if (file) {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('media', file);

    // Make a POST request to the Twitter API to upload the file
    fetch('https://upload.twitter.com/1.1/media/upload.json', {
      method: 'POST',
      headers: {
        Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_nonce="${generateNonce()}", oauth_signature="${generateSignature()}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${generateTimestamp()}", oauth_token="${accessToken}", oauth_version="1.0"`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // The uploaded media ID
        const mediaId = data.media_id_string;

        // Now you can compose a tweet with the media ID and share it
        const tweetText = 'Check out this file!';
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText
        )}&media_ids=${mediaId}`;

        // Open the Twitter share URL in a new window
        window.open(tweetUrl);
      })
      .catch(error => {
        console.error('Error uploading media:', error);
      });
  }
}

// Function to generate a random nonce
function generateNonce() {
  return Math.random().toString(36).substring(2);
}

// Function to generate a timestamp
function generateTimestamp() {
  return Math.floor(Date.now() / 1000);
}

// Function to generate an OAuth signature (You'll need to implement this)
function generateSignature() {
  // Implement your OAuth signature generation logic here
}

