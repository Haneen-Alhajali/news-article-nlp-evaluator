export function handleSubmit(event) {
    event.preventDefault();
    // Get the input value
    let formText = document.getElementById('name').value;

    // Define URL regex pattern
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    // Validate input
    if (!urlPattern.test(formText)) {
        alert("Please enter a valid URL.");
        return;
    }

    console.log("::: Form Submitted :::");

    fetch('http://localhost:8081/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: formText })  // Pass the URL input
    })
    .then(res => res.json())
    .then(function(data) {
        // Display the analysis result
        document.getElementById('results').innerHTML = `
            <p><strong>Polarity:</strong> ${data.polarity}</p>
            <p><strong>Agreement:</strong> ${data.agreement}</p>
            <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
            <p><strong>Confidence:</strong> ${data.confidence}</p>
            <p><strong>Irony:</strong> ${data.irony}</p>
        `;
    })
    .catch(error => {
        console.log('Error:', error);
    });
}
