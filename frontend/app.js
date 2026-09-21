const DB_KEY = 'healthy-foods-chatbot-db';
const goals = [
    { id: 'weight-loss', label: 'ลดน้ำหนัก', icon: '◒', description: 'เบาสบาย อิ่มนาน' },
    { id: 'muscle', label: 'เพิ่มกล้ามเนื้อ', icon: '✦', description: 'โปรตีนถึง ฟื้นตัวดี' },
    { id: 'maintain', label: 'ควบคุมน้ำหนัก', icon: '◌', description: 'สมดุลในทุกมื้อ' },
    { id: 'healthy', label: 'อาหารเพื่อสุขภาพ', icon: '⌁', description: 'ครบถ้วน สดใหม่' }
];
const foods = [
    { id: 'chicken-salad', goal: 'weight-loss', name: 'สลัดอกไก่ย่าง', calories: 320, protein: 35, fat: 10, carbs: 18, category: 'สลัด', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85', note: 'ผักหลากสีและอกไก่ย่าง โปรตีนสูง อิ่มนาน แคลอรี่พอดีสำหรับมื้อเบา ๆ' },
    { id: 'tuna-lettuce', goal: 'weight-loss', name: 'ยำทูน่าอะโวคาโด', calories: 285, protein: 28, fat: 13, carbs: 12, category: 'ยำเพื่อสุขภาพ', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85', note: 'ทูน่าในน้ำแร่กับอะโวคาโดและผักสด ปรุงรสเบา ๆ ไม่เติมน้ำตาล' },
    { id: 'salmon-veggie', goal: 'weight-loss', name: 'แซลมอนผักย่าง', calories: 410, protein: 31, fat: 22, carbs: 17, category: 'ปลาและผัก', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=85', note: 'แซลมอนให้ไขมันดี ทานคู่ผักย่างช่วยเพิ่มไฟเบอร์และความอิ่ม' },
    { id: 'chicken-rice', goal: 'muscle', name: 'ข้าวอกไก่เทอริยากิ', calories: 560, protein: 46, fat: 14, carbs: 62, category: 'โปรตีนสูง', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=85', note: 'อกไก่เนื้อนุ่มกับข้าวกล้อง ให้โปรตีนและคาร์บสำหรับการสร้างกล้ามเนื้อ' },
    { id: 'beef-bowl', goal: 'muscle', name: 'โบวล์เนื้อย่างไข่ดาว', calories: 630, protein: 43, fat: 25, carbs: 54, category: 'โปรตีนสูง', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85', note: 'เนื้อไม่ติดมันและไข่ช่วยเติมโปรตีน ทานคู่ข้าวและผักให้ครบมื้อ' },
    { id: 'tofu-bowl', goal: 'muscle', name: 'เต้าหู้ย่างควินัว', calories: 490, protein: 27, fat: 18, carbs: 51, category: 'โปรตีนจากพืช', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85', note: 'โปรตีนจากเต้าหู้และควินัว เหมาะสำหรับวันที่อยากสลับโปรตีนจากพืช' },
    { id: 'brown-rice-bowl', goal: 'maintain', name: 'ข้าวกล้องกะเพราไก่', calories: 475, protein: 32, fat: 15, carbs: 48, category: 'จานสมดุล', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85', note: 'แบ่งสัดส่วนคาร์บ โปรตีน และผักอย่างพอดี เป็นมื้อประจำที่ทำตามง่าย' },
    { id: 'poke-bowl', goal: 'maintain', name: 'แซลมอนโปเกโบวล์', calories: 510, protein: 30, fat: 20, carbs: 45, category: 'จานสมดุล', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85', note: 'แซลมอน ข้าว และผักสดครบในชามเดียว เลือกซอสแยกเพื่อคุมปริมาณ' },
    { id: 'egg-toast', goal: 'maintain', name: 'โทสต์ไข่อะโวคาโด', calories: 390, protein: 19, fat: 21, carbs: 34, category: 'มื้อเช้า', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=85', note: 'มื้อเช้าเร็ว ๆ ที่มีไขมันดีและโปรตีน ช่วยให้อิ่มถึงมื้อกลางวัน' },
    { id: 'rainbow-bowl', goal: 'healthy', name: 'เรนโบว์ธัญพืชโบวล์', calories: 440, protein: 18, fat: 16, carbs: 57, category: 'ผักและธัญพืช', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85', note: 'ผักหลากสี ธัญพืช และถั่ว รวมไฟเบอร์กับสารอาหารไว้ในมื้อเดียว' },
    { id: 'thai-herb-fish', goal: 'healthy', name: 'ปลากะพงสมุนไพร', calories: 360, protein: 34, fat: 11, carbs: 23, category: 'อาหารไทยสุขภาพ', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=85', note: 'ปลากะพงนึ่งสมุนไพร รสชาติสดชื่นและเป็นแหล่งโปรตีนไขมันต่ำ' },
    { id: 'yogurt-fruit', goal: 'healthy', name: 'โยเกิร์ตผลไม้และกราโนล่า', calories: 330, protein: 17, fat: 9, carbs: 45, category: 'ของว่าง', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85', note: 'ของว่างที่ได้โปรตีนจากโยเกิร์ตและไฟเบอร์จากผลไม้ เลือกกราโนล่าน้ำตาลน้อย' }
];

const state = { profile: JSON.parse(localStorage.getItem(DB_KEY) || 'null'), goal: null, allergies: [], meal: null, budget: null };
const messages = document.querySelector('#chatMessages');
const composer = document.querySelector('#composer');
const profileSummary = document.querySelector('#profileSummary');

function saveDb() { localStorage.setItem(DB_KEY, JSON.stringify(state.profile)); }
const foodAllergens = {
    'tuna-lettuce': ['อาหารทะเล'],
    'salmon-veggie': ['อาหารทะเล'],
    'beef-bowl': ['ไข่'],
    'poke-bowl': ['อาหารทะเล'],
    'egg-toast': ['ไข่', 'กลูเตน'],
    'rainbow-bowl': ['ถั่ว'],
    'thai-herb-fish': ['อาหารทะเล'],
    'yogurt-fruit': ['นมวัว', 'กลูเตน']
};
const foodPreferences = {
    'chicken-salad': { meals: ['เช้า', 'กลางวัน', 'เย็น'], price: 120 },
    'tuna-lettuce': { meals: ['กลางวัน', 'เย็น'], price: 150 },
    'salmon-veggie': { meals: ['กลางวัน', 'เย็น'], price: 220 },
    'chicken-rice': { meals: ['เช้า', 'กลางวัน'], price: 90 },
    'beef-bowl': { meals: ['กลางวัน', 'เย็น'], price: 160 },
    'tofu-bowl': { meals: ['กลางวัน', 'เย็น'], price: 100 },
    'brown-rice-bowl': { meals: ['กลางวัน'], price: 80 },
    'poke-bowl': { meals: ['กลางวัน', 'เย็น'], price: 180 },
    'egg-toast': { meals: ['เช้า'], price: 70 },
    'rainbow-bowl': { meals: ['เช้า', 'กลางวัน', 'เย็น'], price: 110 },
    'thai-herb-fish': { meals: ['กลางวัน', 'เย็น'], price: 140 },
    'yogurt-fruit': { meals: ['เช้า', 'ของว่าง'], price: 60 }
};
function isFoodSafe(food) {
    const allergens = foodAllergens[food.id] || [];
    return !state.allergies.some(allergy => allergens.includes(allergy));
}
function isFoodMatch(food) {
    const preference = foodPreferences[food.id];
    const mealMatches = !state.meal || preference.meals.includes(state.meal);
    const budgetMatches = !state.budget || preference.price <= state.budget;
    return food.goal === (state.goal && state.goal.id) && isFoodSafe(food) && mealMatches && budgetMatches;
}
function addMessage(text, type = 'bot', extra = '') {
    const message = document.createElement('div'); message.className = `message ${type}`;
    message.innerHTML = `<span class="tiny-avatar">${type === 'bot' ? '✦' : 'คุณ'}</span><div class="message-bubble">${text}${extra}</div>`;
    messages.appendChild(message); messages.scrollTop = messages.scrollHeight;
    return message;
}
function updateProfileSummary() {
    profileSummary.innerHTML = state.profile ? `<p class="eyebrow">YOUR PROFILE</p><div class="profile-filled"><span class="avatar">${state.profile.name.charAt(0)}</span><div><b>${state.profile.name}</b><small>${state.profile.age} ปี · ${state.profile.gender}</small></div></div>` : `<p class="eyebrow">YOUR PROFILE</p><div class="profile-empty"><span class="avatar">+</span><span>ยังไม่มีข้อมูลโปรไฟล์</span></div>`;
}
function setComposer(html) { composer.innerHTML = html; }
function start() {
    updateProfileSummary(); messages.innerHTML = '';
    if (!state.profile) askMode(); else { addMessage(`สวัสดีคุณ ${state.profile.name} วันนี้อยากทานอาหารแบบไหน?`); askGoal(); }
}
function askMode() {
    addMessage('สวัสดีค่ะ วันนี้ต้องการให้ช่วยแบบไหนคะ?');
    setComposer(`<div class="choice-grid mode-grid"><button class="choice" data-mode="recommend"><span class="choice-icon">✦</span><b>แนะนำอาหารเพื่อสุขภาพ</b><small>รับคำแนะนำที่เหมาะกับคุณ</small></button><button class="choice" data-mode="browse"><span class="choice-icon">▦</span><b>ดูเมนูอาหาร</b><small>เลือกดูเมนูสุขภาพที่มี</small></button></div>`);
    document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
        addMessage(button.dataset.mode === 'browse' ? 'ดูเมนูอาหาร' : 'แนะนำอาหารเพื่อสุขภาพ', 'user');
        if (button.dataset.mode === 'browse') showAllFoods(); else askProfile();
    }));
}
const browseMealSuggestions = {
    'เช้า': ['egg-toast', 'rainbow-bowl', 'yogurt-fruit'],
    'กลางวัน': ['chicken-salad', 'chicken-rice', 'tofu-bowl', 'tuna-lettuce', 'beef-bowl', 'thai-herb-fish'],
    'เย็น': ['salmon-veggie', 'poke-bowl', 'beef-bowl', 'tofu-bowl', 'thai-herb-fish', 'rainbow-bowl']
};
function getBrowseMealFoods(selectedMeal = null) {
    if (!selectedMeal) return foods;
    const usedMealIds = new Set();
    ['เช้า', 'กลางวัน', 'เย็น'].forEach(meal => {
        if (meal !== selectedMeal) {
            (browseMealSuggestions[meal] || []).forEach(id => usedMealIds.add(id));
        }
    });
    return (browseMealSuggestions[selectedMeal] || []).map(id => foods.find(food => food.id === id)).filter(Boolean).filter(food => !usedMealIds.has(food.id));
}
function showAllFoods(selectedMeal = null) {
    const browseMeals = ['เช้า', 'กลางวัน', 'เย็น'];
    const visibleFoods = getBrowseMealFoods(selectedMeal);
    const title = selectedMeal ? `เมนูอาหารสำหรับมื้อ${selectedMeal}` : 'รวมเมนูอาหารเพื่อสุขภาพ';
    const cards = visibleFoods.map(food => `<div class="food-card-wrap">${foodCardMarkup(food)}${ingredientButtonMarkup(food)}</div>`).join('');
    addMessage(`${title} เลือกเมนูที่สนใจเพื่อดูรายละเอียดหรือวัตถุดิบได้เลยค่ะ`, 'bot', `<div class="food-grid menu-grid">${cards}</div>`);
    setComposer(`<p class="form-label">เลือกมื้ออาหาร</p><div class="preference-grid">${browseMeals.map(meal => `<button class="preference${meal === selectedMeal ? ' selected' : ''}" data-browse-meal="${meal}">${meal}</button>`).join('')}</div><div class="composer-placeholder">เลือกเมนูเพื่อดูรายละเอียดและวัตถุดิบ หรือพิมพ์ถามต่อได้เลย</div><form class="chat-form" id="chatForm"><input id="chatInput" name="message" autocomplete="off" placeholder="พิมพ์ถามเรื่องอาหารได้เลย..." required><button type="submit" aria-label="ส่งข้อความ">ส่ง</button></form>`);
    document.querySelectorAll('[data-food]').forEach(card => card.addEventListener('click', () => openFoodModal(foods.find(food => food.id === card.dataset.food))));
    document.querySelectorAll('[data-browse-meal]').forEach(button => button.addEventListener('click', () => {
        const selectedMeal = button.dataset.browseMeal;
        addMessage(`มื้อ${selectedMeal}`, 'user');
        showAllFoods(selectedMeal);
    }));
    bindIngredientButtons();
    bindChatComposer();
}
function askProfile() {
    addMessage('สวัสดีค่า 👋 ก่อนเริ่ม ขอรู้จักคุณสักนิดนะค่ะ จะได้แนะนำอาหารได้ตรงใจ');
    setComposer(`<form class="profile-form" id="profileForm"><div class="form-row"><label>ชื่อ<input name="name" required placeholder="เช่น มิน"></label><label>อายุ<input name="age" type="number" min="1" max="120" required placeholder="25"></label></div><label>เพศ<select name="gender"><option>ไม่ระบุ</option><option>หญิง</option><option>ชาย</option><option>อื่น ๆ</option></select></label><button class="continue-btn" type="submit">เริ่มคุยกับ Healthy Foods Bot →</button></form>`);
    document.querySelector('#profileForm').addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); state.profile = data; saveDb(); updateProfileSummary(); addMessage(`ฉันชื่อ ${data.name} อายุ ${data.age} ปี`, 'user'); addMessage(`ยินดีที่ได้รู้จักครับคุณ ${data.name} วันนี้อยากทานอาหารแบบไหน?`); askGoal(); });
}
function askGoal() {
    const choices = goals.map(goal => `<button class="choice" data-goal="${goal.id}"><span class="choice-icon">${goal.icon}</span><b>${goal.label}</b><small>${goal.description}</small></button>`).join('');
    setComposer(`<div class="choice-grid">${choices}</div>`);
    document.querySelectorAll('[data-goal]').forEach(button => button.addEventListener('click', () => { state.goal = goals.find(goal => goal.id === button.dataset.goal); state.profile.goal = state.goal.id; saveDb(); addMessage(state.goal.label, 'user'); addMessage(`เลือกได้ดีมากครับ เป้าหมาย <b>${state.goal.label}</b> จะช่วยให้เราเลือกสัดส่วนอาหารได้เหมาะขึ้น<br><br>มีอาหารที่แพ้หรือไม่ทานไหมครับ? เลือกได้มากกว่าหนึ่งข้อ`); askAllergies(); }));
}
function askAllergies() {
    const items = ['ไม่มี', 'นมวัว', 'ไข่', 'ถั่ว', 'อาหารทะเล', 'กลูเตน'];
    setComposer(`<div class="allergy-grid">${items.map(item => `<button class="allergy" data-allergy="${item}">${item}</button>`).join('')}</div><button class="continue-btn" id="allergyContinueButton">ถัดไป →</button>`);
    document.querySelectorAll('[data-allergy]').forEach(button => button.addEventListener('click', () => { if (button.dataset.allergy === 'ไม่มี') { state.allergies = []; document.querySelectorAll('.allergy').forEach(item => item.classList.remove('selected')); } else { document.querySelector('[data-allergy="ไม่มี"]').classList.remove('selected'); state.allergies = state.allergies.includes(button.dataset.allergy) ? state.allergies.filter(item => item !== button.dataset.allergy) : [...state.allergies, button.dataset.allergy]; } button.classList.toggle('selected', state.allergies.includes(button.dataset.allergy) || (button.dataset.allergy === 'ไม่มี' && state.allergies.length === 0)); }));
    document.querySelector('#allergyContinueButton').addEventListener('click', askMeal);
}
function askMeal() {
    addMessage(state.allergies.length ? `ฉันแพ้ ${state.allergies.join(', ')}` : 'ฉันไม่มีอาหารที่แพ้', 'user');
    const meals = ['เช้า', 'กลางวัน', 'เย็น', 'ของว่าง'];
    addMessage('ต้องการอาหารมื้อไหนคะ?');
    setComposer(`<p class="form-label">เลือกมื้ออาหาร</p><div class="preference-grid">${meals.map(meal => `<button class="preference" data-meal="${meal}">${meal}</button>`).join('')}</div>`);
    document.querySelectorAll('[data-meal]').forEach(button => button.addEventListener('click', () => { state.meal = button.dataset.meal; addMessage(`มื้อ${state.meal}`, 'user'); askBudget(); }));
}
function askBudget() {
    const budgets = [{ label: 'ไม่เกิน 100 บาท', value: 100 }, { label: '101-150 บาท', value: 150 }, { label: 'มากกว่า 150 บาท', value: 9999 }];
    addMessage('มีงบประมาณต่อมื้อเท่าไหร่คะ?');
    renderBudgetOptions(budgets);
}
function renderBudgetOptions(budgets) {
    setComposer(`<p class="form-label">เลือกงบประมาณต่อมื้อ</p><div class="preference-grid">${budgets.map(budget => `<button class="preference" data-budget="${budget.value}">${budget.label}</button>`).join('')}</div>`);
    document.querySelectorAll('[data-budget]').forEach(button => button.addEventListener('click', () => { state.budget = Number(button.dataset.budget); addMessage(button.textContent, 'user'); setComposer(`<div class="composer-placeholder">เลือกงบประมาณแล้ว พร้อมรับเมนูที่เหมาะกับคุณ</div><button class="continue-btn" id="recommendButton">ดูเมนูที่เหมาะกับฉัน →</button>`); document.querySelector('#recommendButton').addEventListener('click', showRecommendations); }));
}
function showRecommendations() {
    if (!state.meal || !state.budget) return addMessage('กรุณาเลือกมื้ออาหารและงบประมาณก่อนนะคะ');
    addMessage(`มื้อ${state.meal} งบ${state.budget === 9999 ? 'มากกว่า 150' : `ไม่เกิน ${state.budget}`} บาท`, 'user');
    const picks = foods.filter(isFoodMatch).slice(0, 3);
    if (!picks.length) {
        addMessage('ยังไม่พบเมนูที่ตรงกับเงื่อนไขทั้งหมด ลองเลือกงบประมาณใหม่ได้นะคะ');
        renderBudgetOptions([{ label: 'ไม่เกิน 100 บาท', value: 100 }, { label: '101-150 บาท', value: 150 }, { label: 'มากกว่า 150 บาท', value: 9999 }]);
        return;
    }
    const cards = picks.map(food => `<div class="food-card-wrap">${foodCardMarkup(food)}${ingredientButtonMarkup(food)}</div>`).join('');
    addMessage(`นี่คือ  เมนูที่คัดมาให้สำหรับเป้าหมาย <b>${state.goal.label}</b> ครับ เลือกเมนูที่สนใจเพื่อดูรายละเอียดได้เลย`, 'bot', `<div class="food-grid">${cards}</div>`);
    setComposer(`<div class="composer-placeholder">เลือกเมนูด้านบนเพื่อดูสารอาหารและรายละเอียด</div>${chatComposer()}`);
    document.querySelectorAll('[data-food]').forEach(card => card.addEventListener('click', () => openFoodModal(foods.find(food => food.id === card.dataset.food))));
    bindIngredientButtons();
    bindChatComposer();
}
function chatComposer() {
    return `<div class="quick-prompts"><button type="button" data-prompt="เช้า">เช้า</button><button type="button" data-prompt="กลางวัน">กลางวัน</button><button type="button" data-prompt="เย็น">เย็น</button></div><form class="chat-form" id="chatForm"><input id="chatInput" name="message" autocomplete="off" placeholder="พิมพ์ถามเรื่องอาหารได้เลย..." required><button type="submit" aria-label="ส่งข้อความ">ส่ง</button></form>`;
}
function bindChatComposer() {
    document.querySelector('#chatForm').addEventListener('submit', event => { event.preventDefault(); const input = document.querySelector('#chatInput'); sendChatMessage(input.value); input.value = ''; input.focus(); });
    document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => sendChatMessage(button.dataset.prompt)));
}
function sendChatMessage(text) {
    const question = text.trim();
    if (!question) return;
    addMessage(question, 'user');
    const suggestedFood = getSuggestedFood(question);
    const replyMessage = addMessage(getChatReply(question), 'bot', suggestedFood ? `<div class="food-grid single-food-grid"><div class="food-card-wrap">${foodCardMarkup(suggestedFood)}${ingredientButtonMarkup(suggestedFood)}</div></div>` : '');
    if (suggestedFood) replyMessage.querySelector('[data-food]').addEventListener('click', () => openFoodModal(suggestedFood));
    bindIngredientButtons(replyMessage);
}
function foodCardMarkup(food) {
    return `<button class="food-card" data-food="${food.id}"><img src="${food.image}" alt="${food.name}"><span class="food-card-body"><h3>${food.name}</h3><p>${food.calories} kcal · โปรตีน ${food.protein}g</p><span class="view-detail">ดูรายละเอียด →</span></span></button>`;
}
function ingredientButtonMarkup(food) {
    return `<button class="ingredient-button" type="button" data-ingredients="${food.id}">ดูวัตถุดิบ</button>`;
}
function bindIngredientButtons(container = document) {
    container.querySelectorAll('[data-ingredients]').forEach(button => button.addEventListener('click', event => {
        event.stopPropagation();
        const food = foods.find(item => item.id === button.dataset.ingredients);
        const ingredients = (foodIngredients[food.id] || []).map(ingredient => `<li>${ingredient}</li>`).join('');
        addMessage(`วัตถุดิบของเมนู <b>${food.name}</b> ได้แก่<ul class="chat-ingredients">${ingredients}</ul>`, 'bot');
    }));
}
function getSuggestedFood(question) {
    const text = question.toLowerCase();
    const matchingFoods = foods.filter(isFoodMatch);
    if (text.includes('เช้า')) return foods.find(food => food.category === 'มื้อเช้า' && isFoodMatch(food)) || matchingFoods[0];
    if (text.includes('โปรตีน')) return [...matchingFoods].sort((a, b) => b.protein - a.protein)[0];
    if (text.includes('แคล') || text.includes('เบา') || text.includes('ลด')) return [...matchingFoods].sort((a, b) => a.calories - b.calories)[0];
    if (text.includes('วางแผน') || text.includes('ทั้งวัน')) return matchingFoods[0];
    return null;
}
function getChatReply(question) {
    const text = question.toLowerCase();
    const goalLabel = state.goal ? state.goal.label : 'เป้าหมายสุขภาพ';
    const matchingFoods = foods.filter(food => food.goal === (state.goal && state.goal.id) && isFoodSafe(food));
    const suggestedFood = getSuggestedFood(question);
    if (text.includes('เช้า')) return `มื้อเช้าที่เหมาะกับคุณคือ <b>${suggestedFood?.name || 'เมนูที่ไม่มีวัตถุดิบที่แพ้'}</b> ค่ะ เลือกสูตรน้ำตาลน้อยและเพิ่มโปรตีนเพื่อให้อิ่มนาน`;
    if (text.includes('โปรตีน')) return `ถ้าโฟกัสโปรตีน แนะนำ <b>${suggestedFood?.name || 'เมนูที่ไม่มีวัตถุดิบที่แพ้'}</b> ค่ะ ตอนนี้เป้าหมายของคุณคือ <b>${goalLabel}</b> และควรมีโปรตีนในทุกมื้อ`;
    if (text.includes('แคล') || text.includes('เบา') || text.includes('ลด')) return `เมนูแคลอรีเบาที่สุดในรายการนี้คือ <b>${suggestedFood?.name || 'เมนูที่ไม่มีวัตถุดิบที่แพ้'}</b> ให้พลังงานประมาณ ${suggestedFood?.calories || '-'} kcal ค่ะ`;
    if (text.includes('วางแผน') || text.includes('ทั้งวัน')) return `ลองแบ่งเป็น 3 มื้อหลักและของว่าง 1 มื้อค่ะ โดยเริ่มจาก <b>${suggestedFood?.name || 'เมนูที่ไม่มีวัตถุดิบที่แพ้'}</b> เป็นหนึ่งมื้อ แล้วให้ครบข้าว-โปรตีน-ผัก ดื่มน้ำระหว่างวันด้วยนะคะ`;
    if (text.includes('แพ้') || text.includes('ไม่กิน')) return state.allergies.length ? `รับทราบค่ะ ผมจะหลีกเลี่ยง ${state.allergies.join(', ')} ให้ คุณสามารถเริ่มใหม่เพื่อเปลี่ยนข้อมูลได้จากปุ่ม ↻` : 'ตอนนี้ยังไม่มีรายการแพ้อาหารที่บันทึกไว้ค่ะ แต่ควรอ่านฉลากทุกครั้งหากมีอาการแพ้';
    if (text.includes('สวัสดี') || text.includes('หวัดดี')) return `สวัสดีครับคุณ ${state.profile?.name || ''} วันนี้อยากให้ช่วยหาเมนูหรือวางแผนมื้อไหนค่ะ`;
    return `ฉันช่วยแนะนำเมนูตามเป้าหมาย <b>${goalLabel}</b> ได้ครับ ลองถามเรื่องมื้อเช้า โปรตีน แคลอรี หรือพิมพ์ว่า “ช่วยวางแผนอาหารวันนี้” ได้เลย`;
}
const foodIngredients = {
    'chicken-salad': ['อกไก่ย่าง', 'ผักสลัดรวม', 'มะเขือเทศเชอร์รี', 'แตงกวา', 'น้ำสลัดโยเกิร์ต'],
    'tuna-lettuce': ['ทูน่าในน้ำแร่', 'อะโวคาโด', 'ผักสลัด', 'หอมแดง', 'มะนาว'],
    'salmon-veggie': ['แซลมอน', 'บรอกโคลี', 'แครอต', 'พริกหวาน', 'น้ำมันมะกอก'],
    'chicken-rice': ['อกไก่', 'ข้าวกล้อง', 'ซอสเทอริยากิ', 'บรอกโคลี', 'งาขาว'],
    'beef-bowl': ['เนื้อไม่ติดมัน', 'ไข่ดาว', 'ข้าวกล้อง', 'ผักสลัด', 'ซอสพริกไทยดำ'],
    'tofu-bowl': ['เต้าหู้', 'ควินัว', 'ผักย่างรวม', 'อะโวคาโด', 'น้ำสลัดงา'],
    'brown-rice-bowl': ['ข้าวกล้อง', 'เนื้อไก่', 'ใบกะเพรา', 'พริก', 'ถั่วฝักยาว'],
    'poke-bowl': ['แซลมอน', 'ข้าวญี่ปุ่น', 'อะโวคาโด', 'แตงกวา', 'ซอสโชยุ'],
    'egg-toast': ['ขนมปังโฮลวีต', 'ไข่ไก่', 'อะโวคาโด', 'มะเขือเทศ', 'พริกไทยดำ'],
    'rainbow-bowl': ['ข้าวโพด', 'ถั่วลูกไก่', 'ควินัว', 'ผักหลากสี', 'อะโวคาโด'],
    'thai-herb-fish': ['ปลากะพง', 'ตะไคร้', 'ใบมะกรูด', 'ขิง', 'มะนาว'],
    'yogurt-fruit': ['โยเกิร์ตรสธรรมชาติ', 'ผลไม้สด', 'กราโนล่าน้ำตาลน้อย', 'เมล็ดเจีย']
};
function openFoodModal(food) {
    const ingredients = (foodIngredients[food.id] || []).map(ingredient => `<li>${ingredient}</li>`).join('');
    document.querySelector('#modalContent').innerHTML = `<button class="close-modal" id="closeModal">×</button><img class="modal-image" src="${food.image}" alt="${food.name}"><div class="modal-body"><p class="eyebrow">${food.category.toUpperCase()}</p><h2>${food.name}</h2><p class="modal-sub">ข้อมูลโภชนาการโดยประมาณต่อ 1 เสิร์ฟ</p><div class="macro-grid"><div class="macro"><b>${food.calories}</b><span>kcal</span></div><div class="macro"><b>${food.protein}g</b><span>โปรตีน</span></div><div class="macro"><b>${food.fat}g</b><span>ไขมัน</span></div><div class="macro"><b>${food.carbs}g</b><span>คาร์บ</span></div></div><div class="ingredients"><b>วัตถุดิบ</b><ul>${ingredients}</ul></div><div class="modal-note">✦ ${food.note}</div></div>`;
    document.querySelector('#foodModal').classList.remove('hidden');
    document.querySelector('#closeModal').addEventListener('click', closeModal);
}
function closeModal() { document.querySelector('#foodModal').classList.add('hidden'); }
document.querySelector('#foodModal').addEventListener('click', event => { if (event.target.id === 'foodModal') closeModal(); });
document.querySelector('#resetButton').addEventListener('click', () => { localStorage.removeItem(DB_KEY); state.profile = null; state.goal = null; state.allergies = []; state.meal = null; state.budget = null; start(); });
start();
