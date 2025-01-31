import { handleSubmit } from './formHandler';

describe('Testing the form submission function', () => {
  let mockFetch;
  let resultsDiv;
  
  beforeEach(() => {
    // Setup DOM elements for testing
    document.body.innerHTML = `
      <input type="text" id="name" />
      <div id="results"></div>
    `;
    resultsDiv = document.getElementById('results');
    
    // Mock the global fetch function
    mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        polarity: 'N (negative)',
        agreement: 'AGREEMENT',
        subjectivity: 'OBJECTIVE',
        confidence: '100',
        irony: 'NONIRONIC'
      })
    });
    global.fetch = mockFetch;
  });

  test("handleSubmit should validate URL and call fetch", async () => {
    const input = document.getElementById('name');
    input.value = 'https://www.reuters.com/';  // Valid URL

    // Wait for handleSubmit to complete
    await handleSubmit({ preventDefault: () => {} });

    // Wait for DOM update
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log("Results Div Content:", resultsDiv.innerHTML); // Debugging log

    // Ensure that the fetch was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8081/analyze', expect.any(Object));
    
    // Ensure that the results div contains the expected output
    // Normalize whitespace before checking
    const expectedHTML = `
        <p><strong>Polarity:</strong> N (negative)</p>
        <p><strong>Agreement:</strong> AGREEMENT</p>
        <p><strong>Subjectivity:</strong> OBJECTIVE</p>
        <p><strong>Confidence:</strong> 100</p>
        <p><strong>Irony:</strong> NONIRONIC</p>
    `.replace(/\s+/g, ' ').trim(); // Remove extra spaces

    const actualHTML = resultsDiv.innerHTML.replace(/\s+/g, ' ').trim();

    expect(actualHTML).toBe(expectedHTML); // Compare normalized HTML
});


  test("handleSubmit should alert on invalid URL", async () => {
    const input = document.getElementById('name');
    input.value = 'invalid-url';  // Invalid URL

    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {}); // Mock alert

    // Call handleSubmit and wait for the async function to complete
    await handleSubmit({ preventDefault: () => {} });

    // Ensure the alert was triggered for invalid URL
    expect(alertMock).toHaveBeenCalledWith("Please enter a valid URL.");
    
    // Ensure the results div is empty for invalid URLs
    expect(resultsDiv.innerHTML).toBe('');

    alertMock.mockRestore();  // Restore the original alert function
  });
});
