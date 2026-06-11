// ================================================
// EduBot - Main JavaScript (null-safe for all pages)
// ================================================

// ── Theme Toggle ──────────────────────────────────
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

if (localStorage.getItem('theme') === 'dark') {
    enableDarkTheme();
} else {
    enableLightTheme();
}

if (lightThemeBtn) lightThemeBtn.addEventListener('click', enableLightTheme);
if (darkThemeBtn) darkThemeBtn.addEventListener('click', enableDarkTheme);
if (mobileLightThemeBtn) mobileLightThemeBtn.addEventListener('click', enableLightTheme);
if (mobileDarkThemeBtn) mobileDarkThemeBtn.addEventListener('click', enableDarkTheme);

// ── Mobile Menu Toggle ────────────────────────────
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded',
            String(!mobileMenu.classList.contains('hidden')));
    });
}

// ── User Dropdown Toggle ──────────────────────────
const dropdownBtn = document.getElementById('user-dropdown-btn');
const dropdownMenu = document.getElementById('user-dropdown-menu');
const dropdownChevron = document.getElementById('dropdown-chevron');

if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdownMenu.classList.contains('hidden');
        dropdownMenu.classList.toggle('hidden');
        dropdownBtn.setAttribute('aria-expanded', String(isHidden));
        if (dropdownChevron) {
            dropdownChevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
            dropdownChevron.style.transition = 'transform 0.2s ease';
        }
    });
    document.addEventListener('click', () => {
        if (!dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.add('hidden');
            dropdownBtn.setAttribute('aria-expanded', 'false');
            if (dropdownChevron) dropdownChevron.style.transform = 'rotate(0deg)';
        }
    });
}

// ── FAQ Accordion ─────────────────────────────────
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        if (answer) answer.classList.toggle('hidden');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    });
});

// ── Chat Helpers ──────────────────────────────────
function addMessage(container, message, isUser = false) {
    if (!container) return;
    const div = document.createElement('div');
    div.classList.add(isUser ? 'user-message' : 'bot-message');
    div.innerHTML = `<p>${message}</p>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTyping(container) {
    if (!container) return null;
    const div = document.createElement('div');
    div.classList.add('typing-indicator', 'bot-message');
    div.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

// ── AI Chatbot Responses ──────────────────────────
const aiResponses = {
    physics: "Newton's laws of motion are the foundation of classical mechanics.\n\n1️⃣ An object at rest stays at rest unless acted upon by a force.\n2️⃣ F = ma (Force = mass × acceleration).\n3️⃣ For every action there is an equal and opposite reaction.\n\nWould you like me to go deeper on any law?",
    math: "Quadratic equations (ax² + bx + c = 0) can be solved with:\n\n📐 Formula: x = [-b ± √(b²-4ac)] / (2a)\n🔢 Factoring\n✏️ Completing the square\n\nShare your specific equation and I'll solve it step by step!",
    programming: "Object-Oriented Programming (OOP) has 4 pillars:\n\n🔒 Encapsulation — hide data inside classes\n🎭 Abstraction — show only essentials\n👨‍👩‍👧 Inheritance — child classes from parent\n🔄 Polymorphism — same name, different behavior\n\nWant a code example in Python or Java?",
    chemistry: "Chemistry covers atomic structure, chemical bonds, reactions, and thermodynamics. What specific topic are you studying? I can help with organic, inorganic, or physical chemistry!",
    default: "I'm here to help! 📚 You can ask me about Physics, Math, Programming, Chemistry, and more. What subject do you need help with?"
};

const liveResponses = {
    assignment: "I'd be happy to help with your assignment! Please share the specific questions or topics you're working on, and I'll guide you through the concepts step by step.",
    calculus: "Calculus can be challenging! Tell me which area you're struggling with:\n• Limits & continuity\n• Derivatives\n• Integrals\n• Series\n\nI'll explain with clear examples.",
    syllabus: "I can help with course syllabus questions. Which course are you inquiring about? I'll provide the relevant information.",
    exam: "Great that you're preparing for exams! Share which subject or topic areas you want to focus on, and I'll help you create a study plan.",
    default: "Thanks for reaching out! 👋 Sarah here — I'm your dedicated academic support specialist. Please describe what you're working on and I'll assist you personally."
};

function getAIResponse(message) {
    const m = message.toLowerCase();
    if (m.includes('physics') || m.includes('newton') || m.includes('force')) return aiResponses.physics;
    if (m.includes('math') || m.includes('equation') || m.includes('solve') || m.includes('quadratic')) return aiResponses.math;
    if (m.includes('program') || m.includes('oop') || m.includes('code') || m.includes('python') || m.includes('java')) return aiResponses.programming;
    if (m.includes('chem') || m.includes('atom') || m.includes('molecule')) return aiResponses.chemistry;
    return aiResponses.default;
}

function getLiveResponse(message) {
    const m = message.toLowerCase();
    if (m.includes('assignment') || m.includes('homework')) return liveResponses.assignment;
    if (m.includes('calculus') || m.includes('integral') || m.includes('derivative')) return liveResponses.calculus;
    if (m.includes('syllabus') || m.includes('course')) return liveResponses.syllabus;
    if (m.includes('exam') || m.includes('test') || m.includes('study')) return liveResponses.exam;
    return liveResponses.default;
}

// ── AI Chatbot ────────────────────────────────────
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

if (aiChatbotToggle && aiChatbot) {
    aiChatbotToggle.addEventListener('click', () => {
        aiChatbot.classList.toggle('hidden');
        if (liveChatbot) liveChatbot.classList.add('hidden');
        // Remove notification badge on first open
        const badge = aiChatbotToggle.querySelector('.notification-badge');
        if (badge) badge.style.display = 'none';
    });
}
if (closeAiChatbot && aiChatbot) {
    closeAiChatbot.addEventListener('click', () => aiChatbot.classList.add('hidden'));
}

function sendAIMessage() {
    if (!aiChatInput || !aiChatMessages) return;
    const message = aiChatInput.value.trim();
    if (!message) return;
    addMessage(aiChatMessages, message, true);
    aiChatInput.value = '';
    const typing = showTyping(aiChatMessages);
    setTimeout(() => {
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        addMessage(aiChatMessages, getAIResponse(message));
    }, 1200);
}

if (aiChatSend) aiChatSend.addEventListener('click', sendAIMessage);
if (aiChatInput) aiChatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendAIMessage(); });

// ── Live Support Chatbot ──────────────────────────
let liveConnected = false;

function connectLiveChat() {
    // Simulate connecting animation
    setTimeout(() => {
        const statusEl = document.getElementById('live-chat-status');
        if (statusEl) statusEl.textContent = '🟢 Sarah is online';

        // Clear loading message, add real greeting
        if (liveChatMessages) {
            liveChatMessages.innerHTML = '';
            addMessage(liveChatMessages, "Hi there! 👋 I'm Sarah, your academic support specialist. How can I assist you today?\n\nI can help with:");
            // Add quick replies
            const div = document.createElement('div');
            div.classList.add('bot-message');
            div.innerHTML = `<div class="mt-2">
                <span class="quick-reply" data-message="I need help with my assignment">📝 Assignment help</span>
                <span class="quick-reply" data-message="Can you explain calculus concepts?">📐 Calculus</span>
                <span class="quick-reply" data-message="I have questions about the course syllabus">📋 Syllabus</span>
                <span class="quick-reply" data-message="I need exam preparation tips">📚 Exam prep</span>
            </div>`;
            liveChatMessages.appendChild(div);
        }

        // Enable input
        if (liveChatInput) {
            liveChatInput.disabled = false;
            liveChatInput.placeholder = 'Type your message...';
        }
        if (liveChatSend) liveChatSend.disabled = false;

        // Rebind quick replies after dynamic content
        bindQuickReplies();
        liveConnected = true;
    }, 2000);
}

if (liveChatToggle && liveChatbot) {
    liveChatToggle.addEventListener('click', () => {
        liveChatbot.classList.toggle('hidden');
        if (aiChatbot) aiChatbot.classList.add('hidden');
        if (!liveConnected) connectLiveChat();
    });
}
if (closeLiveChatbot && liveChatbot) {
    closeLiveChatbot.addEventListener('click', () => liveChatbot.classList.add('hidden'));
}

function sendLiveMessage() {
    if (!liveChatInput || !liveChatMessages || !liveConnected) return;
    const message = liveChatInput.value.trim();
    if (!message) return;
    addMessage(liveChatMessages, message, true);
    liveChatInput.value = '';
    const typing = showTyping(liveChatMessages);
    setTimeout(() => {
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        addMessage(liveChatMessages, getLiveResponse(message));
    }, 1800);
}

if (liveChatSend) liveChatSend.addEventListener('click', sendLiveMessage);
if (liveChatInput) liveChatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendLiveMessage(); });

// ── Quick Replies (rebindable) ────────────────────
function bindQuickReplies() {
    document.querySelectorAll('.quick-reply').forEach(btn => {
        // Prevent duplicate listeners by cloning
        const fresh = btn.cloneNode(true);
        btn.parentNode.replaceChild(fresh, btn);
        fresh.addEventListener('click', () => {
            const message = fresh.getAttribute('data-message') || fresh.textContent.trim();
            if (fresh.closest('.ai-chatbot')) {
                addMessage(aiChatMessages, message, true);
                const typing = showTyping(aiChatMessages);
                setTimeout(() => {
                    if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
                    addMessage(aiChatMessages, getAIResponse(message));
                }, 1200);
            } else if (fresh.closest('.live-chat')) {
                addMessage(liveChatMessages, message, true);
                const typing = showTyping(liveChatMessages);
                setTimeout(() => {
                    if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
                    addMessage(liveChatMessages, getLiveResponse(message));
                }, 1800);
            }
        });
    });
}
bindQuickReplies();

// ── Hero Buttons ──────────────────────────────────
const tryAiBtn = document.getElementById('try-ai-chat');
const tryLiveBtn = document.getElementById('try-live-chat');

if (tryAiBtn && aiChatbot) {
    tryAiBtn.addEventListener('click', () => {
        aiChatbot.classList.remove('hidden');
        if (liveChatbot) liveChatbot.classList.add('hidden');
    });
}
if (tryLiveBtn && liveChatbot) {
    tryLiveBtn.addEventListener('click', () => {
        liveChatbot.classList.remove('hidden');
        if (aiChatbot) aiChatbot.classList.add('hidden');
        if (!liveConnected) connectLiveChat();
    });
}

// ── Demo Section ──────────────────────────────────
const demoChatContainer = document.getElementById('demo-chat-container');
const demoChatInput = document.getElementById('demo-chat-input');
const demoChatSend = document.getElementById('demo-chat-send');
const demoQuestionInput = document.getElementById('demo-question');
const demoSubmitButton = document.getElementById('demo-submit');

function sendDemoMessage() {
    if (!demoChatInput || !demoChatContainer) return;
    const message = demoChatInput.value.trim();
    if (!message) return;
    addMessage(demoChatContainer, message, true);
    demoChatInput.value = '';
    const typing = showTyping(demoChatContainer);
    setTimeout(() => {
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        addMessage(demoChatContainer, getAIResponse(message));
    }, 1200);
}

if (demoChatSend) demoChatSend.addEventListener('click', sendDemoMessage);
if (demoChatInput) demoChatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendDemoMessage(); });

document.querySelectorAll('.quick-reply-demo').forEach(btn => {
    btn.addEventListener('click', () => {
        const message = btn.getAttribute('data-message') || btn.textContent.trim();
        if (!demoChatContainer) return;
        addMessage(demoChatContainer, message, true);
        const typing = showTyping(demoChatContainer);
        setTimeout(() => {
            if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
            addMessage(demoChatContainer, getAIResponse(message));
        }, 1200);
    });
});

if (demoSubmitButton && demoQuestionInput) {
    demoSubmitButton.addEventListener('click', () => {
        const question = demoQuestionInput.value.trim();
        if (question && demoChatInput) {
            demoChatInput.value = question;
            sendDemoMessage();
            demoQuestionInput.value = '';
        }
    });
    demoQuestionInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') demoSubmitButton.click(); });
}

// ── Contact & Newsletter Forms ────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('contact-form-status');
        if (status) {
            status.textContent = '✅ Thank you! We will get back to you within 24 hours.';
            status.className = 'mt-3 text-sm text-emerald-600';
        }
        contactForm.reset();
    });
}

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('newsletter-status');
        if (status) {
            status.textContent = '✅ Subscribed! Updates will land in your inbox.';
        }
        newsletterForm.reset();
    });
}

// ── Scroll Animations ─────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
