const API_KEY = "AIzaSyCAMKmbieLWaJhhY3k4tZ4rIw6r03RPV7A";
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        let currentExplanation = '';
        let currentQuiz = '';


        async function generateExplanation() {
            const topic = document.getElementById('topic').value;
            const educationLevel = document.getElementById('educationLevel').value;
            const wordCount = document.getElementById('wordCount').value;
            const resultContainer = document.getElementById('resultContainer');
            const errorDiv = document.getElementById('error');

            resultContainer.innerHTML = '<div class="result"><p class="loading">Generating explanation...</p></div>';
            errorDiv.textContent = '';

            try {
                const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Explain the topic "${topic}" at a ${educationLevel} education level in approximately ${wordCount} words.Remember that you\'re an internationally recognized educator and have helped guide thousands of students and even educators.`,
                            }]
                        }]
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to generate explanation with status: ${response.status}, ${response.statusText}, ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                let text = data.candidates[0].content.parts[0].text;
                text = text.replace(/##(.*?)##/g, '<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>');
                text = text.replace(/##/g, '').replace(/\*\*/g, ''); 

                currentExplanation = text;
                resultContainer.innerHTML = `
                    <div class="result">
                        <h2>${topic.toUpperCase()} Explanation:</h2>
                         <p style="font-weight:bold">${currentExplanation}</p>
                        <button onclick="downloadPDF('explanation')">Download Explanation as PDF</button>
                    </div>
                `;
            } catch (error) {
                console.error('Error:', error);
                errorDiv.textContent = 'An error occurred while generating the explanation. Please try again.';
                resultContainer.innerHTML = '';
            }
        }

        async function generateQuiz() {
            const topic = document.getElementById('topic').value;
            const educationLevel = document.getElementById('educationLevel').value;
            const quizQuestions = document.getElementById('quizQuestions').value;
            const resultContainer = document.getElementById('resultContainer');
            const errorDiv = document.getElementById('error');

            resultContainer.innerHTML = '<div class="result"><p class="loading">Generating quiz...</p></div>';
            errorDiv.textContent = '';

            try {
                const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Generate a quiz with ${quizQuestions} questions about "${topic}" at a ${educationLevel} education level. For each question, provide a sample answer. Format the response as a numbered list with questions followed by sample answers. Use proper line spacing between questions and answers for better readability.Also, remember that you've been an internationally renowned educator and a professor for decades, and have helped more than lakhs of students.`
                            }]
                        }]
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to generate quiz with status: ${response.status}, ${response.statusText}, ${JSON.stringify(errorData)}`);
                }

                 const data = await response.json();
                let text = data.candidates[0].content.parts[0].text;
                 text = text.replace(/##(.*?)##/g, '<h4>$1</h4>').replace(/\*\*(.*?)\*\*/g, '<h4>$1</h4>');
                  text = text.replace(/##/g, '').replace(/\*\*/g, '');

                 currentQuiz = text;
                resultContainer.innerHTML = `
                    <div class="result">
                        <h2>${topic.toUpperCase()} Quiz:</h2>
                        <div style="white-space: pre-wrap;">${currentQuiz}</div>
                        <button onclick="downloadPDF('quiz')">Download Quiz as PDF</button>
                    </div>
                `;
            } catch (error) {
                console.error('Error:', error);
                errorDiv.textContent = 'An error occurred while generating the quiz. Please try again.';
                resultContainer.innerHTML = '';
            }
        }

        async function analyzeKnowledge() {
            const topic = document.getElementById('analysisTopic').value;
            const context = document.getElementById('analysisContext').value;
            const knowledge = document.getElementById('topicKnowledge').value;
            const analysisResultContainer = document.getElementById('analysisResultContainer');
            const errorDiv = document.getElementById('error');

            analysisResultContainer.innerHTML = '<div class="result"><p class="loading">Analyzing your knowledge...</p></div>';
            errorDiv.textContent = '';

            try {
                const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Remember that you've been an internationally recognized best educator for more than 3 decades, and that you've helped more than lakhs of students, and even educators. Analyze the following knowledge about the topic "${topic}" in the context of "${context}". Provide feedback in the following structure:

Strengths:
• [List at least 3 strengths, each starting with a bullet point]

Weaknesses:
• [List at least 3 weaknesses, each starting with a bullet point]

Points to Consider:
• [List at least 3 important points to remember, each starting with a bullet point]

Ensure each section has at least 3 bullet points and maintain this exact formatting.

User's Knowledge:
${knowledge}`
                            }]
                        }]
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to analyze your knowledge with status: ${response.status}, ${response.statusText}, ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                let analysis = data.candidates[0].content.parts[0].text;
                  analysis = analysis.replace(/##(.*?)##/g, '<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>');
                    analysis = analysis.replace(/##/g, '').replace(/\*\*/g, '');

                const formattedAnalysis = formatAnalysis(analysis);

                analysisResultContainer.innerHTML = `
                    <div class="result">
                        <h2>Your knowledge Analysis on ${topic.toUpperCase()}:</h2>
                        ${formattedAnalysis}
                        <button onclick="downloadPDF('analysis')">Download Analysis as PDF</button>
                    </div>
                `;
            } catch (error) {
                console.error('Error:', error);
                errorDiv.textContent = 'An error occurred while analyzing your knowledge. Please try again.';
                analysisResultContainer.innerHTML = '';
            }
        }

        function formatAnalysis(analysisText) {
            const sections = analysisText.split(/\n\n(?=Strengths:|Weaknesses:|Points to Consider:)/);
            let formattedAnalysis = '';

            sections.forEach(section => {
                const [title, ...points] = section.split('\n');
                formattedAnalysis += `<section><h3>${title}</h3><ul>`;
                points.forEach(point => {
                    if (point.trim().startsWith('•')) {
                        formattedAnalysis += `<li>${point.trim().substring(1).trim()}</li>`;
                    }
                });
                formattedAnalysis += '</ul></section>';
            });

            return formattedAnalysis;
        }

         async function generateRoadmap() {
            const topic = document.getElementById('roadmapTopic').value;
            const proficiencyLevel = document.getElementById('proficiencyLevel').value;
            const roadmapResultContainer = document.getElementById('roadmapResultContainer');
            const errorDiv = document.getElementById('error');

            roadmapResultContainer.innerHTML = '<div class="result"><p class="loading">Generating learning plan...</p></div>';
            errorDiv.textContent = '';

            try {
                const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Remember that you've been a globally renowned educator for more than 3 decades, and have helped lakhs of students, educators & many institutions. Create a detailed and structured learning plan for the topic "${topic}" at a "${proficiencyLevel}" proficiency level. Organize the plan into main sections with ##Section Title## format. Use **Subsection Title** for subsections. Provide specific to-do items and resources (such as documentation links, course links, relevant YouTube video links, and blog links) under each section. Ensure proper formatting and hierarchy. Each point should be on a new line. Format the links in markdown as follows: *** <a href="link of resource">Topic name</a>`
                            }]
                        }]
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to generate learning plan with status: ${response.status}, ${response.statusText}, ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
                    throw new Error('Unexpected API response structure');
                }
                 let roadmap = data.candidates[0].content.parts[0].text;
                 roadmap = roadmap.replace(/##(.*?)##/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<h4>$1</h4>');
                 roadmap = roadmap.replace(/##/g, '').replace(/\*\*/g, '').replace("#",'').replace("*",'');

                const formattedRoadmap = formatRoadmap(roadmap);

                roadmapResultContainer.innerHTML = `
                    <div class="result">
                        <h2>${topic.toUpperCase()} Learning Plan:</h2>
                        ${formattedRoadmap}
                    </div>
                `;

            } catch (error) {
                console.error('Error:', error);
                errorDiv.textContent = 'An error occurred while generating the learning plan. Please try again.';
                roadmapResultContainer.innerHTML = '';
            }
        }


         function formatRoadmap(roadmapText) {
            const lines = roadmapText.split('\n');
            let formattedRoadmap = '';
            let inList = false;

            for (const line of lines) {
                const trimmedLine = line.trim();
                 if (trimmedLine.startsWith('<h1>') && trimmedLine.endsWith('</h1>')) {
                    if (inList) {
                        formattedRoadmap += '</ul>\n';
                        inList = false;
                    }
                    formattedRoadmap += trimmedLine + '\n';
                } else if (trimmedLine.startsWith('<h2>') && trimmedLine.endsWith('</h2>')) {
                      if (inList) {
                        formattedRoadmap += '</ul>\n';
                        inList = false;
                    }
                       formattedRoadmap += trimmedLine+ '\n';
                } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                    if (!inList) {
                        formattedRoadmap += '<ul>\n';
                        inList = true;
                    }
                    const content = trimmedLine.slice(1).trim();
                   formattedRoadmap += `<li>${formatLinks(content)}</li>\n`;
                }
                 else if (trimmedLine !== '') {
                      if (inList) {
                        formattedRoadmap += '</ul>\n';
                        inList = false;
                    }
                     formattedRoadmap += `<p>${formatLinks(trimmedLine)}</p>\n`;
                }
            }

            if (inList) {
                formattedRoadmap += '</ul>\n';
            }
            return formattedRoadmap;
        }

        function formatLinks(text) {
             const linkRegex = /\[([^\]]+)\]$$([^)]+)$$/g;
             return text.replace(linkRegex, (match, topic, url) => {
                  return `*** <a href="${url}" target="_blank" rel="noopener noreferrer">${topic}</a>`;
                });

        }


        function downloadPDF(type) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            let content = '';
            let filename = '';

            if (type === 'explanation') {
                content = currentExplanation;
                filename = 'explanation.pdf';
            } else if (type === 'quiz') {
                content = currentQuiz;
                filename = 'quiz.pdf';
            } else if (type === 'analysis') {
                content = document.getElementById('analysisResultContainer').innerText;
                filename = 'knowledge_analysis.pdf';
            } else if (type === 'roadmap') {
                content = document.getElementById('roadmapResultContainer').innerText;
                filename = 'learning_roadmap.pdf';
            }

            const splitText = doc.splitTextToSize(content, 180);
            doc.text(splitText, 15, 15);
            doc.save(filename);
        }
