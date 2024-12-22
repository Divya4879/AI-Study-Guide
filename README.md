# Gemini AI Based Study Helper

This project is a AI-based learning assistant that leverages the Gemini AI API to provide educational tools and resources. It includes features for generating explanations, quizzes, analyzing knowledge, and creating study plans.

## Features

*   **Explanation Generator:**
    *   Generates explanations on a given topic at a specified education level and word count.
*   **Quiz Generator:**
    *   Creates a quiz on a selected topic with a specified number of questions and sample answers.
*   **Topic Analysis:**
    *   Analyzes user-provided knowledge on a topic, providing feedback on strengths, weaknesses, and points to consider.
*   **Learning Plan Generator:**
    *   Generates learning plans based on a given topic based on the user's proficiency in it.
*   **PDF Download:**
    *   Allows users to download explanations, quizzes or feedback/analysis as PDF files.

## Technologies Used

*   **HTML:** For structuring the web page.
*   **CSS:** For styling the web page with a purple theme.
*   **JavaScript:** For the core logic, API calls, and dynamic content updates.
*   **Gemini AI API:** For generating explanations, quizzes, and performing topic analysis.
*   **jsPDF:** For generating PDF documents.

## Setup

1.  **Get an API Key:**
    *   You need a Google Gemini AI API key. If you don't have one, follow the instructions on the Google Cloud website to get access.
2.  **Replace Placeholder:**
    *   Open the `index.html` file.
    *   Locate the following line in the javascript section:
        ```javascript
        const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
        ```
    *   Replace `YOUR_API_KEY` with your actual Gemini API key.
3.  **Open in Browser:**
    *   Open the `index.html` file in any modern web browser.

## How to Use

1.  **Explanation Generator:**
    *   Enter the topic, choose the education level, and set the word count in the "Explanation Generator" form.
    *   Click "Generate Explanation." The generated explanation will be displayed in the "Explanation" section.
2.  **Quiz Generator:**
    *   Enter the topic, choose the education level, and select the number of quiz questions in the "Quiz Generator" form.
    *   Click "Generate Quiz." The generated quiz will be shown in the "Quiz" section.
3.  **Topic Analysis:**
    *   Enter the topic, context, and your knowledge in the "Topic Analysis" form.
    *   Click "Analyze Knowledge." The feedback will be provided in the "Knowledge Analysis" section.
4.  **Learning Plan Generator:**
    *   Enter a topic in the "Learning Plan Generator" form.
    *   Choose your proficiency level- Newbie/Beginner/Advanced/Master?Expert/Scientist.
    *   Click "Generate Learning Plan." The learning plan will be displayed below.
 
## PDF Downloads

*  All the above sections can be downloaded as PDF using the "Download as PDF" button that appears with the output

## Error Handling

*   The application includes basic error handling, and will display errors to the user. If there is an error with the Gemini API, it will also provide the status code and any status text that is returned.
*   For PDF generation, if there is no content, an alert will be displayed.

## Project Structure

*   `index.html`: The HTML file that contains all the project's HTML structure and JavaScript code.
*   `style.css`: This file contains all the CSS styling for this project.

## Important Notes

*   Ensure you have a stable internet connection.
*   The API usage is subject to Gemini API quota limits.
*  Rate limiting has not been added in this code, if you make requests to the API too often you might get a 429 response. If so, you can add rate limiting in your javascript code based on some of the examples from previous responses.

## Contributing

Contributions to improve this project are welcome! Feel free to submit issues or pull requests.
