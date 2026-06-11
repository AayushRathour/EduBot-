
        // Theme Toggle
        const lightThemeBtn = document.getElementById('light-theme');
        const darkThemeBtn = document.getElementById('dark-theme');
        const mobileLightThemeBtn = document.getElementById('mobile-light-theme');
        const mobileDarkThemeBtn = document.getElementById('mobile-dark-theme');
        const body = document.body;
        
        function enableLightTheme() {
            body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        
        function enableDarkTheme() {
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            enableDarkTheme();
        } else {
            enableLightTheme();
        }
        
        lightThemeBtn.addEventListener('click', enableLightTheme);
        darkThemeBtn.addEventListener('click', enableDarkTheme);
        mobileLightThemeBtn.addEventListener('click', enableLightTheme);
        mobileDarkThemeBtn.addEventListener('click', enableDarkTheme);
        
        // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
        });
        
        // Login Modal
        // const loginBtn = document.getElementById('login-btn');
        // const mobileLoginBtn = document.getElementById('mobile-login-btn');
        
        // loginBtn.addEventListener('click', () => {
        //     alert('Login functionality would be implemented in a production version');
        // });
        
        // mobileLoginBtn.addEventListener('click', () => {
        //     alert('Login functionality would be implemented in a production version');
        // });
        
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                answer.classList.toggle('hidden');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        });
        
        // Chatbot Functionality
        const aiChatbotToggle = document.getElementById('ai-chatbot-toggle');
        const aiChatbot = document.getElementById('ai-chatbot');
        const closeAiChatbot = document.getElementById('close-ai-chatbot');
        const aiChatMessages = document.getElementById('ai-chat-messages');
        const aiChatInput = document.getElementById('ai-chat-input');
        const aiChatSend = document.getElementById('ai-chat-send');
        
        const liveChatToggle = document.getElementById('live-chat-toggle');
        const liveChatbot = document.getElementById('live-chatbot');
        const closeLiveChatbot = document.getElementById('close-live-chatbot');
        const liveChatMessages = document.getElementById('live-chat-messages');
        const liveChatInput = document.getElementById('live-chat-input');
        const liveChatSend = document.getElementById('live-chat-send');
        
        // Toggle AI chatbot
        aiChatbotToggle.addEventListener('click', () => {
            aiChatbot.classList.toggle('hidden');
            liveChatbot.classList.add('hidden');
        });
        
        closeAiChatbot.addEventListener('click', () => {
            aiChatbot.classList.add('hidden');
        });
        
        // Toggle Live chatbot
        liveChatToggle.addEventListener('click', () => {
            liveChatbot.classList.toggle('hidden');
            aiChatbot.classList.add('hidden');
        });
        
        closeLiveChatbot.addEventListener('click', () => {
            liveChatbot.classList.add('hidden');
        });
        
        // Add message to chat
        function addMessage(container, message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            messageDiv.innerHTML = `<p>${message}</p>`;
            container.appendChild(messageDiv);
            container.scrollTop = container.scrollHeight;
        }
        
        // AI Chatbot Responses
        const aiResponses = {
            "physics": "Newton's laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it. Would you like me to explain each law in detail?",
            "math": "Quadratic equations can be solved using several methods: factoring, completing the square, or using the quadratic formula. The formula is x = [-b ± √(b²-4ac)] / (2a). Can I help with a specific problem?",
            "programming": "Object-oriented programming (OOP) is a programming paradigm based on the concept of objects, which can contain data and code. The four main principles are encapsulation, abstraction, inheritance, and polymorphism. Would you like examples?",
            "default": "I'm here to help with your academic questions! You can ask me about technical concepts, course materials, or learning resources. How can I assist you today?"
        };
        
        // Live Chat Responses
        const liveResponses = {
            "assignment": "I'd be happy to help with your assignment. Please share the details or specific questions you're working on, and I'll guide you through the concepts.",
            "calculus": "Calculus can be challenging! Let me know which concepts you're struggling with - derivatives, integrals, limits, or something else? I can explain with examples.",
            "syllabus": "I can help with course syllabus questions. Please tell me which course you're inquiring about, and I'll provide the relevant syllabus information.",
            "default": "I'm here to provide personalized academic support. Please share what you're working on, and I'll do my best to assist you!"
        };
        
        // Handle AI chat send
        aiChatSend.addEventListener('click', () => {
            const message = aiChatInput.value.trim();
            if (message) {
                addMessage(aiChatMessages, message, true);
                aiChatInput.value = '';
                
                // Simulate typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.classList.add('typing-indicator', 'bot-message');
                typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                aiChatMessages.appendChild(typingIndicator);
                aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
                
                // Simulate AI response after delay
                setTimeout(() => {
                    aiChatMessages.removeChild(typingIndicator);
                    
                    let response = aiResponses.default;
                    if (message.toLowerCase().includes('physics') || message.toLowerCase().includes('newton')) {
                        response = aiResponses.physics;
                    } else if (message.toLowerCase().includes('math') || message.toLowerCase().includes('equation') || message.toLowerCase().includes('solve')) {
                        response = aiResponses.math;
                    } else if (message.toLowerCase().includes('programming') || message.toLowerCase().includes('oop')) {
                        response = aiResponses.programming;
                    }
                    
                    addMessage(aiChatMessages, response);
                }, 1500);
            }
        });
        
        // Handle Enter key in AI chat
        aiChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                aiChatSend.click();
            }
        });
        
        // Handle Live chat send
        liveChatSend.addEventListener('click', () => {
            const message = liveChatInput.value.trim();
            if (message) {
                addMessage(liveChatMessages, message, true);
                liveChatInput.value = '';
                
                // Simulate typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.classList.add('typing-indicator', 'bot-message');
                typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                liveChatMessages.appendChild(typingIndicator);
                liveChatMessages.scrollTop = liveChatMessages.scrollHeight;
                
                // Simulate response after delay
                setTimeout(() => {
                    liveChatMessages.removeChild(typingIndicator);
                    
                    let response = liveResponses.default;
                    if (message.toLowerCase().includes('assignment') || message.toLowerCase().includes('homework')) {
                        response = liveResponses.assignment;
                    } else if (message.toLowerCase().includes('calculus')) {
                        response = liveResponses.calculus;
                    } else if (message.toLowerCase().includes('syllabus') || message.toLowerCase().includes('course')) {
                        response = liveResponses.syllabus;
                    }
                    
                    addMessage(liveChatMessages, response);
                }, 2000);
            }
        });
        
        // Handle Enter key in Live chat
        liveChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                liveChatSend.click();
            }
        });
        
        // Quick reply buttons
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', () => {
                const message = button.getAttribute('data-message') || button.textContent;
                if (button.closest('.ai-chatbot')) {
                    addMessage(aiChatMessages, message, true);
                    
                    // Simulate typing indicator
                    const typingIndicator = document.createElement('div');
                    typingIndicator.classList.add('typing-indicator', 'bot-message');
                    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                    aiChatMessages.appendChild(typingIndicator);
                    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
                    
                    // Simulate AI response after delay
                    setTimeout(() => {
                        aiChatMessages.removeChild(typingIndicator);
                        
                        let response = aiResponses.default;
                        if (message.includes('Newton')) {
                            response = aiResponses.physics;
                        } else if (message.includes('equation')) {
                            response = aiResponses.math;
                        } else if (message.includes('programming')) {
                            response = aiResponses.programming;
                        }
                        
                        addMessage(aiChatMessages, response);
                    }, 1500);
                } else if (button.closest('.live-chat')) {
                    addMessage(liveChatMessages, message, true);
                    
                    // Simulate typing indicator
                    const typingIndicator = document.createElement('div');
                    typingIndicator.classList.add('typing-indicator', 'bot-message');
                    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                    liveChatMessages.appendChild(typingIndicator);
                    liveChatMessages.scrollTop = liveChatMessages.scrollHeight;
                    
                    // Simulate response after delay
                    setTimeout(() => {
                        liveChatMessages.removeChild(typingIndicator);
                        
                        let response = liveResponses.default;
                        if (message.includes('assignment')) {
                            response = liveResponses.assignment;
                        } else if (message.includes('calculus')) {
                            response = liveResponses.calculus;
                        } else if (message.includes('syllabus')) {
                            response = liveResponses.syllabus;
                        }
                        
                        addMessage(liveChatMessages, response);
                    }, 2000);
                }
            });
        });
        
        // Demo chatbot functionality
        const demoChatContainer = document.getElementById('demo-chat-container');
        const demoChatInput = document.getElementById('demo-chat-input');
        const demoChatSend = document.getElementById('demo-chat-send');
        const demoQuestionInput = document.getElementById('demo-question');
        const demoSubmitButton = document.getElementById('demo-submit');
        
        demoChatSend.addEventListener('click', () => {
            const message = demoChatInput.value.trim();
            if (message) {
                addMessage(demoChatContainer, message, true);
                demoChatInput.value = '';
                
                // Simulate typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.classList.add('typing-indicator', 'bot-message');
                typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                demoChatContainer.appendChild(typingIndicator);
                demoChatContainer.scrollTop = demoChatContainer.scrollHeight;
                
                // Simulate AI response after delay
                setTimeout(() => {
                    demoChatContainer.removeChild(typingIndicator);
                    addMessage(demoChatContainer, "Thanks for your question! In the full version, I'd provide a detailed answer to this. Would you like to try the live demo?");
                }, 1500);
            }
        });
        
        // Demo quick replies
        document.querySelectorAll('.quick-reply-demo').forEach(button => {
            button.addEventListener('click', () => {
                const message = button.textContent.replace('Explain ', '');
                addMessage(demoChatContainer, button.textContent, true);
                
                // Simulate typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.classList.add('typing-indicator', 'bot-message');
                typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                demoChatContainer.appendChild(typingIndicator);
                demoChatContainer.scrollTop = demoChatContainer.scrollHeight;
                
                // Simulate AI response after delay
                setTimeout(() => {
                    demoChatContainer.removeChild(typingIndicator);
                    addMessage(demoChatContainer, `I'd be happy to explain ${message}. In the full version, I'd provide a detailed explanation with examples. Would you like to try the live demo?`);
                }, 1500);
            });
        });
        
        // Demo submit button
        demoSubmitButton.addEventListener('click', () => {
            const question = demoQuestionInput.value.trim();
            if (question) {
                aiChatInput.value = question;
                aiChatbot.classList.remove('hidden');
                aiChatSend.click();
                demoQuestionInput.value = '';
            }
        });

        demoChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                demoChatSend.click();
            }
        });

        demoQuestionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                demoSubmitButton.click();
            }
        });
        
        // Hero buttons
        document.getElementById('try-ai-chat').addEventListener('click', () => {
            aiChatbot.classList.remove('hidden');
        });
        
        document.getElementById('try-live-chat').addEventListener('click', () => {
            liveChatbot.classList.remove('hidden');
        });
        
        // Form submission handlers
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('contact-form-status');
            status.textContent = 'Thank you for your message. We will get back to you soon.';
            e.target.reset();
        });

        document.getElementById('newsletter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('newsletter-status');
            status.textContent = 'Thanks for subscribing. Product updates will land here first.';
            e.target.reset();
        });
        
        // Initialize animations
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.slide-up');
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.classList.add('slide-up');
                }, 100);
            });
            
            // Auto-open AI chat after 5 seconds
            setTimeout(() => {
                aiChatbot.classList.remove('hidden');
            }, 5000);
        });
   
